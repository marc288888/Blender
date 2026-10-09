/* ------------------------------------------------------------------------
   Blending Builder — app logic.

   Screens:  home → letter menu → Story / Find / Make / Match / Word / Picture / Sound / Memory

   Everything is driven by four directions plus one button, so the whole
   program works from the joystick in Arrow Key Mode. In Mouse Mode the same
   targets are large click areas, with optional dwell-to-click.
   ------------------------------------------------------------------------ */

const DEFAULT_SETTINGS = {
  extras: 2,
  findSize: 6,
  letterCase: "lower",
  labels: true,
  dwell: false,
  dwellTime: 1200,
  voice: false,
  voiceName: "",

  rate: 0.8,
  hunt: false,         // letter hunt on the story pages
  picStyle: "3d"       // "3d" cartoon pictures or "flat" drawings
};

const state = {
  settings: { ...DEFAULT_SETTINGS },
  screen: "home",
  homeTab: "letters",   // "letters" (Part 1) or "blends" (Part 2)
  letterKey: null,
  stars: 0,
  done: {},

  story: { page: 0, left: 0, total: 0 },
  find: { items: [], left: 0, busy: false },
  make: { queue: [], target: null, tiles: [], carrying: null, busy: false },
  match: { pairs: [], chosen: null, left: 0, busy: false },
  quiz: { mode: "word", rounds: [], i: 0, busy: false },
  mem: { cards: [], open: [], left: 0, busy: false }
};

const el = id => document.getElementById(id);

const dom = {
  screens: {
    home: el("screen-home"),
    guide: el("screen-guide"),
    letter: el("screen-letter"),
    story: el("screen-story"),
    find: el("screen-find"),
    make: el("screen-make"),
    match: el("screen-match"),
    quiz: el("screen-quiz"),
    memory: el("screen-memory")
  },
  backBtn: el("backBtn"),
  exitBtn: el("exitBtn"),
  exitModal: el("exitModal"),
  guideBtn: el("guideBtn"),
  guideDeck: el("guideDeck"),
  guideDots: el("guideDots"),
  guidePrev: el("guidePrev"),
  guideNext: el("guideNext"),
  brand: el("brandLabel"),
  stars: el("stars"),
  hint: el("hint"),
  confetti: el("confetti"),
  teacherBtn: el("teacherBtn"),
  teacherModal: el("teacherModal"),

  letterGrid: el("letterGrid"),
  homeTitle: el("homeTitle"),
  tabLetters: el("tabLetters"),
  tabBlends: el("tabBlends"),
  letterPic: el("letterPic"),
  letterBig: el("letterBig"),
  letterKeyword: el("letterKeyword"),

  storyPic: el("storyPic"),
  storyTitle: el("storyTitle"),
  storyLine: el("storyLine"),
  storyDots: el("storyDots"),
  storyPrev: el("storyPrev"),
  storyNext: el("storyNext"),
  huntBtn: el("huntBtn"),
  readBtn: el("readBtn"),
  huntBar: el("huntBar"),
  huntTarget: el("huntTarget"),
  huntText: el("huntText"),
  huntLeft: el("huntLeft"),
  storyNote: el("storyNote"),

  findTarget: el("findTarget"),
  findPrompt: el("findPrompt"),
  findCount: el("findCount"),
  findGrid: el("findGrid"),

  matchTarget: el("matchTarget"),
  matchCount: el("matchCount"),
  matchBoard: el("matchBoard"),
  matchLines: el("matchLines"),
  matchPics: el("matchPics"),
  matchWords: el("matchWords"),
  matchEnd: el("matchEnd"),

  quizTarget: el("quizTarget"),
  quizPrompt: el("quizPrompt"),
  quizCount: el("quizCount"),
  quizQuestion: el("quizQuestion"),
  quizOptions: el("quizOptions"),
  quizEnd: el("quizEnd"),
  memTarget: el("memTarget"),
  memCount: el("memCount"),
  memGrid: el("memGrid"),
  memEnd: el("memEnd"),

  wordSlots: el("wordSlots"),
  letterTray: el("letterTray"),
  banner: el("banner"),
  pictureCard: el("pictureCard"),
  pictureEmoji: el("pictureEmoji")
};

const HINTS = {
  home: "Joystick: move to a letter • button: open it • the two big buttons at the top switch between Letters and Blending sounds",
  guide: "Joystick: left / right turns the page",
  letter: "Joystick: left / right • button: choose",
  story: "Teacher reads aloud • joystick left / right turns the page • 🔍 Letter hunt: drive to each letter and press the button",
  find: "Joystick: move to a picture • button: pick it",
  match: "Press the button on a picture, then on its word • or a word first, then its picture",
  quiz: "Joystick: move to an answer • button: pick it",
  memory: "Joystick: move to a card • button: turn it over",
  make: "Drag a letter into a box • or: move to a letter, press the button to pick it up, then press again over a box"
};

/* ===================================================================== utils */

const wait = ms => new Promise(r => setTimeout(r, ms));

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cased(text) {
  return state.settings.letterCase === "upper" ? text.toUpperCase() : text;
}

/* "Aa", "Qu qu" — capital and small form shown on the letter menu. */
function letterPair(key) {
  const entry = ALPHABET[key];
  if (entry.kind === "blend") return cased(entry.label);
  const g = entry.letter;
  const caps = g.charAt(0).toUpperCase() + g.slice(1);
  return g.length > 1 ? `${caps} ${g}` : caps + g;
}

/* What a unit is called on screen: "a", "qu", "ag", "ed eg". */
function unitLabel(key) {
  const entry = ALPHABET[key];
  return cased(entry.label || entry.letter);
}

function confettiBurst() {
  const colours = ["#ffc233", "#38c172", "#ff7a7a", "#6ec6ff", "#c792ea"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colours[Math.floor(Math.random() * colours.length)];
    c.style.animationDuration = 1.6 + Math.random() * 1.4 + "s";
    c.style.animationDelay = Math.random() * 0.4 + "s";
    dom.confetti.append(c);
    setTimeout(() => c.remove(), 3600);
  }
}

/* ===================================================================== storage */

function loadSaved() {
  try {
    state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem("bb.settings") || "{}") };
  } catch {
    state.settings = { ...DEFAULT_SETTINGS };
  }
  try {
    state.done = JSON.parse(localStorage.getItem("bb.done") || "{}");
  } catch {
    state.done = {};
  }
  state.stars = parseInt(localStorage.getItem("bb.stars") || "0", 10) || 0;
  state.homeTab = localStorage.getItem("bb.tab") === "blends" ? "blends" : "letters";

  if (typeof setPictureStyle === "function") setPictureStyle(state.settings.picStyle);
  Speech.setEnabled(state.settings.voice);
  Speech.setRate(state.settings.rate);
  if (state.settings.voiceName) Speech.setVoiceByName(state.settings.voiceName);
}

const saveSettings = () => localStorage.setItem("bb.settings", JSON.stringify(state.settings));
const saveStars = () => localStorage.setItem("bb.stars", String(state.stars));
const saveDone = () => localStorage.setItem("bb.done", JSON.stringify(state.done));

function renderStars() {
  const shown = Math.min(state.stars, 8);
  dom.stars.textContent = "⭐".repeat(shown) + (state.stars > 8 ? ` ×${state.stars}` : "");
}

/* ===================================================================== focus nav

   One spatial focus model for every screen: the joystick moves the orange ring
   to whichever focusable target lies in that direction, and the button clicks it.
   No screen needs its own navigation code.                                     */

const nav = {
  current: null,

  targets() {
    /* While the quit confirm is up it is the only thing you can steer to. */
    if (!dom.exitModal.hidden) {
      return [...dom.exitModal.querySelectorAll(".focusable")]
        .filter(n => n.offsetParent !== null && !n.disabled);
    }
    const screen = dom.screens[state.screen];
    const list = [...screen.querySelectorAll(".focusable")];
    if (!dom.backBtn.hidden) list.push(dom.backBtn);
    if (!dom.guideBtn.hidden) list.push(dom.guideBtn);
    if (!dom.exitBtn.hidden) list.push(dom.exitBtn);
    return list.filter(n => n.offsetParent !== null && !n.disabled);
  },

  set(node, quiet) {
    const all = document.querySelectorAll(".key-focus");
    all.forEach(n => n.classList.remove("key-focus"));
    nav.current = node || null;
    if (node) {
      node.classList.add("key-focus");
      if (typeof noteFocus === "function") noteFocus(node);
      if (!quiet) Sfx.move();
    }
  },

  first() {
    const t = nav.targets();
    nav.set(t[0] || null, true);
  },

  /* Picks the nearest target in the given direction, measuring from the
     centre of the current one. Falls back to wrapping round the screen. */
  move(dx, dy) {
    const targets = nav.targets();
    if (!targets.length) return;
    if (!nav.current || !targets.includes(nav.current)) {
      nav.set(targets[0]);
      return;
    }

    const box = n => {
      const r = n.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const from = box(nav.current);

    let best = null;
    let bestScore = Infinity;
    for (const t of targets) {
      if (t === nav.current) continue;
      const p = box(t);
      const ax = p.x - from.x;
      const ay = p.y - from.y;
      const along = dx ? ax * dx : ay * dy;
      if (along <= 4) continue;
      const across = dx ? Math.abs(ay) : Math.abs(ax);
      const score = along + across * 2.5;
      if (score < bestScore) {
        bestScore = score;
        best = t;
      }
    }

    if (!best) {
      // Nothing that way: wrap to the far side so the child is never stuck.
      const sorted = targets.slice().sort((a, b) => {
        const pa = box(a), pb = box(b);
        return dx ? (pa.x - pb.x) * dx : (pa.y - pb.y) * dy;
      });
      best = sorted[0];
    }
    if (best && best !== nav.current) nav.set(best);
  },

  click() {
    if (nav.current) nav.current.click();
  }
};

/* Mouse and joystick stay in sync: hovering a target also moves the ring. */
document.addEventListener("mouseover", e => {
  const t = e.target.closest(".focusable");
  // Letter-hunt letters do not light up when the mouse passes over them —
  // the child picks a letter by clicking it. (The joystick in Arrow Key
  // Mode still moves the ring from letter to letter.)
  if (t && t.classList.contains("hl")) return;
  if (t && t !== nav.current && nav.targets().includes(t)) nav.set(t, true);
});

/* ===================================================================== router */

function show(screen, opts = {}) {
  if (typeof reader !== "undefined" && screen !== "story") stopReading();
  Speech.cancel();
  cancelDwell();
  state.screen = screen;

  Object.entries(dom.screens).forEach(([name, node]) => {
    node.hidden = name !== screen;
  });

  dom.backBtn.hidden = screen === "home";
  dom.exitBtn.hidden = screen !== "home";
  dom.guideBtn.hidden = screen !== "home";
  dom.hint.textContent = HINTS[screen] || "";

  const letter = state.letterKey ? ALPHABET[state.letterKey] : null;
  dom.brand.textContent = screen === "guide"
    ? "How to use this program"
    : letter && screen !== "home"
      ? `${unitLabel(state.letterKey)} — ${letter.keyword}`
      : "Blending Builder";

  if (!opts.keepFocus) nav.first();
}

/* Puts a picture into an element: the hand-drawn one from art.js when we
   have it, otherwise the plain emoji so nothing ever goes blank. */
function setPicture(el, emoji) {
  const svg = typeof artSvg === "function" ? artSvg(emoji) : null;
  if (svg) {
    el.classList.add("drawn-pic");
    el.innerHTML = svg;
  } else {
    el.classList.remove("drawn-pic");
    el.textContent = emoji;
  }
}

function goHome() {
  /* Come back to the same part of the book the child was working in. */
  if (state.letterKey && ALPHABET[state.letterKey]) {
    state.homeTab = ALPHABET[state.letterKey].kind === "blend" ? "blends" : "letters";
    try { localStorage.setItem("bb.tab", state.homeTab); } catch (_) {}
  }
  state.letterKey = null;
  renderLetterGrid();
  show("home");
  focusFirstTile();
}

/* On the home screen the joystick starts on the first tile, not on the tab
   buttons, so a quick press opens a letter rather than switching parts. */
function focusFirstTile() {
  const t = dom.letterGrid.querySelector(".letter-tile");
  if (t) nav.set(t, true);
}

function openLetter(key) {
  state.letterKey = key;
  const entry = ALPHABET[key];
  dom.letterPic.className = "letter-pic";
  setPicture(dom.letterPic, entry.emoji);
  dom.letterBig.textContent = letterPair(key);
  dom.letterKeyword.textContent = entry.keyword;
  show("letter");
}

dom.backBtn.addEventListener("click", () => {
  if (state.screen === "guide") goHome();
  else if (state.screen === "letter") goHome();
  else if (state.letterKey) openLetter(state.letterKey);
  else goHome();
});

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => {
    const go = btn.dataset.go;
    if (go === "story") startStory();
    else if (go === "find") startFind();
    else if (go === "make") startMake();
    else if (go === "match") startMatch();
    else if (go === "word" || go === "picture" || go === "sound") startQuiz(go);
    else if (go === "memory") startMemory();
  });
});

/* ===================================================================== home */

function renderLetterGrid() {
  const blends = state.homeTab === "blends";
  dom.letterGrid.innerHTML = "";
  dom.letterGrid.classList.toggle("blend-grid", blends);
  dom.tabLetters.classList.toggle("on", !blends);
  dom.tabBlends.classList.toggle("on", blends);
  dom.homeTitle.textContent = blends
    ? "Blending sounds — choose a sound"
    : "Letters a–z — choose a letter";

  (blends ? BLEND_ORDER : LETTER_ORDER).forEach(key => {
    const entry = ALPHABET[key];
    const tile = document.createElement("button");
    tile.className = "letter-tile focusable dwell" + (entry.kind === "blend" ? " blend" : "");
    if (state.done[key]) tile.classList.add("done");
    tile.dataset.key = key;

    const emoji = document.createElement("span");
    emoji.className = "tile-emoji";
    setPicture(emoji, entry.emoji);

    const label = document.createElement("span");
    label.className = "tile-letter";
    label.textContent = unitLabel(key);
    if (label.textContent.length > 3) label.classList.add("two");

    tile.append(emoji, label);
    tile.addEventListener("click", () => openLetter(key));
    dom.letterGrid.append(tile);
  });
}

function setHomeTab(tab) {
  if (state.homeTab === tab) return;
  state.homeTab = tab;
  try { localStorage.setItem("bb.tab", tab); } catch (_) {}
  Sfx.tick();
  const clicked = tab === "blends" ? dom.tabBlends : dom.tabLetters;
  renderLetterGrid();
  nav.set(clicked, true);
}

dom.tabLetters.addEventListener("click", () => setHomeTab("letters"));
dom.tabBlends.addEventListener("click", () => setHomeTab("blends"));

/* ===================================================================== guide

   The built-in user guide. The pages themselves live in index.html so the
   wording can be edited without touching any code; this just turns them. */

const guide = { page: 0, pages: [] };

function startGuide() {
  guide.pages = [...dom.guideDeck.querySelectorAll(".guide-page")];
  guide.page = 0;
  renderGuide();
  show("guide");
}

function renderGuide() {
  const last = guide.pages.length - 1;
  guide.pages.forEach((p, i) => { p.hidden = i !== guide.page; });

  dom.guideDots.innerHTML = "";
  guide.pages.forEach((_, i) => {
    const dot = document.createElement("i");
    if (i === guide.page) dot.className = "on";
    dom.guideDots.append(dot);
  });

  dom.guidePrev.disabled = guide.page === 0;
  dom.guideNext.textContent = guide.page === last ? "Done ▶" : "▶";

  if (dom.guidePrev.disabled && nav.current === dom.guidePrev) {
    nav.set(dom.guideNext, true);
  }
}

dom.guideBtn.addEventListener("click", startGuide);

dom.guidePrev.addEventListener("click", () => {
  if (guide.page === 0) return;
  guide.page--;
  Sfx.tick();
  renderGuide();
});

dom.guideNext.addEventListener("click", () => {
  if (guide.page < guide.pages.length - 1) {
    guide.page++;
    Sfx.tick();
    renderGuide();
  } else {
    goHome();
  }
});

/* ===================================================================== story */
function startStory() {
  state.story.page = 0;
  syncHuntButton();
  renderStory();
  show("story");
  fitStoryText();
  nav.set(dom.storyNext, true);
}

/* Words the teacher should stress are written *like this* in alphabet.js. */
function renderStoryLine(raw) {
  dom.storyLine.innerHTML = "";
  dom.storyLine.classList.toggle("hunting", state.settings.hunt);
  dom.storyLine.classList.toggle("long", raw.replace(/\*/g, "").length > 62);
  const inner = document.createElement("span");
  inner.className = "line-inner";
  dom.storyLine.append(inner);

  if (state.settings.hunt) {
    renderHuntLine(raw.replace(/\*/g, ""), inner);
    return;
  }
  dom.huntBar.hidden = true;

  /* Every word gets its own box, marked with where it starts in the spoken
     text (the line without the *stars*, with the line break as a space), so
     Read to me can light up each word as it is said. */
  let pos = 0;
  const addWords = (text, into) => {
    text.split(/(\s+)/).forEach(tok => {
      if (!tok) return;
      if (/^\s+$/.test(tok) || !/[a-z0-9]/i.test(tok)) {
        into.append(document.createTextNode(tok));
      } else {
        const w = document.createElement("span");
        w.className = "w";
        w.dataset.i = String(pos);
        w.textContent = tok;
        into.append(w);
      }
      pos += tok.length;
    });
  };
  raw.split(/(\*[^*]+\*)/).forEach(chunk => {
    if (!chunk) return;
    if (chunk.startsWith("*") && chunk.endsWith("*")) {
      const b = document.createElement("span");
      b.className = "hit";
      addWords(chunk.slice(1, -1), b);
      inner.append(b);
    } else {
      addWords(chunk, inner);
    }
  });
}

/* Lights up the word that starts at (or just before) this point in the text. */
function markWord(charIndex) {
  let best = null;
  dom.storyLine.querySelectorAll(".w").forEach(w => {
    if (Number(w.dataset.i) <= charIndex) best = w;
  });
  dom.storyLine.querySelectorAll(".w.now").forEach(w => w.classList.remove("now"));
  if (best) best.classList.add("now");
}
function clearWords() {
  dom.storyLine.querySelectorAll(".w.now").forEach(w => w.classList.remove("now"));
}

/* ------------------------------------------------------------ letter hunt

   The page shows how many of the unit's letter (c, sh, ag ...) are in the
   sentence. Every letter of the sentence is a joystick target; the children
   drive to each one and press the button. Right ones turn green, wrong ones
   just shake. For two-letter targets (sh, ag, ed/eg) pressing either letter
   finds the pair.                                                           */

function huntPatterns(entry) {
  return (entry.match || [entry.letter]).map(p => p.toLowerCase());
}

function renderHuntLine(text, inner) {
  const entry = ALPHABET[state.letterKey];
  const pats = huntPatterns(entry).slice().sort((x, y) => y.length - x.length);
  const lower = text.toLowerCase();

  // Which character belongs to which match (non-overlapping, left to right).
  const group = new Array(text.length).fill(-1);
  let groups = 0;
  for (let i = 0; i < text.length;) {
    const p = pats.find(q => lower.startsWith(q, i));
    if (p) {
      for (let k = 0; k < p.length; k++) group[i + k] = groups;
      groups++;
      i += p.length;
    } else i++;
  }

  // Build the sentence word by word so lines never break inside a word.
  text.split(/(\s+)/).forEach((part, pi, arr) => {
    const start = arr.slice(0, pi).join("").length;
    if (/^\s+$/.test(part)) {
      inner.append(part.includes("\n") ? document.createElement("br") : document.createTextNode(" "));
      return;
    }
    const word = document.createElement("span");
    word.style.whiteSpace = "nowrap";
    [...part].forEach((ch, k) => {
      const idx = start + k;
      if (/[a-z]/i.test(ch)) {
        const s = document.createElement("span");
        // No "dwell": in the letter hunt a letter is only picked by a real click.
        s.className = "hl focusable";
        s.textContent = ch;
        s.dataset.g = String(group[idx]);
        s.addEventListener("click", () => pickHunt(s));
        word.append(s);
      } else {
        word.append(document.createTextNode(ch));
      }
    });
    inner.append(word);
  });

  state.story.total = groups;
  state.story.left = groups;
  dom.huntBar.hidden = false;
  dom.huntBar.classList.remove("all-found");
  dom.huntTarget.textContent = unitLabel(state.letterKey).replace(" ", " / ");
  updateHuntBar();
}

function updateHuntBar() {
  const { total, left } = state.story;
  const name = unitLabel(state.letterKey).replace(" ", " or ");
  if (total === 0) {
    dom.huntText.textContent = `There is no ${name} on this page!`;
    dom.huntLeft.textContent = "";
  } else if (left === 0) {
    dom.huntText.textContent = `You found all ${total}!`;
    dom.huntLeft.textContent = "⭐";
    dom.huntBar.classList.add("all-found");
  } else {
    dom.huntText.textContent = `Find ${total} on this page`;
    dom.huntLeft.textContent = `${left} to go`;
  }
}

function pickHunt(span) {
  if (span.classList.contains("got")) return;
  const g = Number(span.dataset.g);
  if (g < 0) {
    Sfx.retry();
    span.classList.add("nope");
    setTimeout(() => span.classList.remove("nope"), 450);
    return;
  }
  dom.storyLine.querySelectorAll(`.hl[data-g="${g}"]`).forEach(n => n.classList.add("got"));
  state.story.left--;
  Sfx.lock();
  // Say the whole word the letter is in ("playful" for the p in playful).
  const word = (span.parentElement ? span.parentElement.textContent : "")
    .replace(/[^A-Za-z'-]/g, "").replace(/^['-]+|['-]+$/g, "");
  if (word) Speech.say(word, { rate: Math.max(0.6, state.settings.rate) });
  updateHuntBar();
  if (state.story.left === 0) {
    Sfx.win();
    confettiBurst();
    setTimeout(() => { if (state.screen === "story") nav.set(dom.storyNext, true); }, 600);
  }
}

/* 🔊 Read to me — only shown when the computer voice is switched on. */
/* 🔊 Read to me — reads the whole story aloud, turning the pages by itself,
   and stops after the last page. Press it again (⏹ Stop), or press ◀ / ▶ or
   Back, to stop. Only shown when the computer voice is switched on. */
const reader = { on: false, run: 0 };

function setReadButton() {
  dom.readBtn.textContent = reader.on ? "⏹ Stop" : "🔊 Read to me";
  dom.readBtn.classList.toggle("speaking", reader.on);
}

function stopReading() {
  if (!reader.on) return;
  reader.on = false;
  reader.run++;
  Speech.cancel();
  clearWords();
  setReadButton();
}

async function readStory() {
  const run = ++reader.run;
  reader.on = true;
  setReadButton();
  // Words can only light up in the normal reading view, not in Letter hunt.
  if (state.settings.hunt) {
    state.settings.hunt = false;
    saveSettings();
    syncHuntButton();
    renderStory();
  }
  const lines = ALPHABET[state.letterKey].story.lines;
  while (reader.on && run === reader.run && state.screen === "story") {
    const text = lines[state.story.page].replace(/\*/g, "").replace(/\n/g, " ");
    const rate = Math.max(0.6, state.settings.rate);

    /* The blue box moves by itself at reading speed, starting straight away,
       so it never depends on the voice sending any signals. If the voice does
       say which word it is on, the box follows the voice exactly instead. */
    const words = [...dom.storyLine.querySelectorAll(".w")].map(w => ({
      i: Number(w.dataset.i), text: w.textContent
    }));
    const cps = 13 * rate;                       // letters spoken per second
    let t = 0;
    const times = words.map(w => {
      const at = t;
      t += (w.text.replace(/[^a-z]/gi, "").length + 1.5) / cps;
      if (/[,—;:]$/.test(w.text)) t += 0.25;
      if (/[.!?]["”']?$/.test(w.text)) t += 0.45;
      return at;
    });
    let heard = false;
    let startedAt = performance.now() + 250;     // most voices start within ¼ s
    markWord(0);
    const timer = setInterval(() => {
      if (heard || run !== reader.run) return;
      const s = (performance.now() - startedAt) / 1000;
      let k = 0;
      while (k + 1 < times.length && times[k + 1] <= s) k++;
      if (words[k]) markWord(words[k].i);
    }, 60);

    const r = await Speech.say(text, {
      rate,
      onStart: () => { startedAt = performance.now(); },
      onWord: i => { heard = true; markWord(i); }
    });
    clearInterval(timer);
    clearWords();
    if (run !== reader.run || state.screen !== "story") return;     // stopped meanwhile
    if (!r.ok && r.why !== "interrupted" && r.why !== "canceled") break; // voice not working

    if (state.story.page >= lines.length - 1) break;                  // end of the story
    await wait(900);                                                  // a little pause
    if (run !== reader.run || state.screen !== "story") return;
    state.story.page++;
    Sfx.tick();
    renderStory();
  }
  if (run === reader.run) {
    reader.on = false;
    setReadButton();
    if (state.screen === "story") nav.set(dom.storyNext, true);  // ready for "Find ▶"
  }
}

dom.readBtn.addEventListener("click", () => {
  if (reader.on) stopReading();
  else readStory();
});

function syncHuntButton() {
  dom.readBtn.hidden = !state.settings.voice;
  dom.huntBtn.classList.toggle("on", state.settings.hunt);
  dom.huntBtn.textContent = state.settings.hunt ? "📖 Read" : "🔍 Letter hunt";
  dom.storyNote.innerHTML = state.settings.hunt
    ? "Letter hunt: drive the joystick to each letter and press the button."
    : "Read this aloud. The <b>highlighted</b> words have the letter sound in them.";
}

dom.huntBtn.addEventListener("click", () => {
  state.settings.hunt = !state.settings.hunt;
  saveSettings();
  Sfx.tick();
  syncHuntButton();
  renderStory();
  const first = state.settings.hunt && dom.storyLine.querySelector(".hl");
  nav.set(first || dom.huntBtn, true);
});

/* Each page of the story gets its own picture, built from the emoji in
   story.scenes. If a story has no scenes, the letter picture is used so
   nothing breaks. */
function renderScene(entry, page) {
  const scene = entry.story.scenes && entry.story.scenes[page];
  const parts = scene && scene.length ? scene : [entry.emoji];

  dom.storyPic.innerHTML = "";

  /* One whole illustrated picture for the page. */
  const full = typeof storyScene === "function" ? storyScene(parts) : null;
  if (full) {
    dom.storyPic.className = "story-pic framed";
    const frame = document.createElement("div");
    frame.className = "scene-frame";
    frame.innerHTML = full;
    dom.storyPic.append(frame);
    return;
  }

  /* Fallback: the old row of separate pictures. */
  dom.storyPic.className = "story-pic";
  dom.storyPic.classList.toggle("crowded", parts.length > 2);
  parts.forEach((e, i) => {
    const span = document.createElement("span");
    span.className = "scene-bit";
    const svg = typeof artSvg === "function" ? artSvg(e) : null;
    if (svg) {
      span.classList.add("drawn");
      span.innerHTML = svg;
    } else {
      span.textContent = e;
    }
    span.style.animationDelay = (i * 110) + "ms";
    dom.storyPic.append(span);
  });
}

function renderStory() {
  if (!reader.on) Speech.cancel();   // stop any speaking when the page is turned by hand
  const entry = ALPHABET[state.letterKey];
  const lines = entry.story.lines;
  const page = state.story.page;

  renderScene(entry, page);
  dom.storyTitle.textContent = entry.story.title;
  renderStoryLine(lines[page]);

  dom.storyDots.innerHTML = "";
  lines.forEach((_, i) => {
    const dot = document.createElement("i");
    if (i === page) dot.className = "on";
    dom.storyDots.append(dot);
  });

  dom.storyPrev.disabled = page === 0;
  dom.storyNext.textContent = page === lines.length - 1 ? "Find ▶" : "▶";

  if (dom.storyPrev.disabled && nav.current === dom.storyPrev) nav.set(dom.storyNext, true);
  fitStoryText();
}

/* A long rhyme shrinks a little at a time until the whole page fits on the
   screen, so nothing is ever cut off, whatever the screen size. */
function fitStoryText() {
  const line = dom.storyLine;
  line.style.fontSize = "";
  const card = line.closest(".story-card");
  if (!card || state.screen !== "story" && dom.screens.story.hidden) return;
  const navBox = document.querySelector(".story-nav");
  const tooBig = () =>
    card.scrollHeight > card.clientHeight + 2 ||
    navBox.getBoundingClientRect().bottom > window.innerHeight - 28;
  let size = parseFloat(getComputedStyle(line).fontSize);
  const min = window.innerHeight * 0.032;
  while (tooBig() && size > min) {
    size -= 2;
    line.style.fontSize = size + "px";
  }
}
window.addEventListener("resize", () => { if (state.screen === "story") fitStoryText(); });

dom.storyPrev.addEventListener("click", () => {
  stopReading();
  if (state.story.page === 0) return;
  state.story.page--;
  Sfx.tick();
  renderStory();
});

dom.storyNext.addEventListener("click", () => {
  stopReading();
  const lines = ALPHABET[state.letterKey].story.lines;
  if (state.story.page < lines.length - 1) {
    state.story.page++;
    Sfx.tick();
    renderStory();
  } else {
    startFind();
  }
});

/* ===================================================================== find */

function startFind() {
  const entry = ALPHABET[state.letterKey];
  const size = Number(state.settings.findSize);

  const correct = shuffle(entry.pics).slice(0, Math.min(3, Math.max(2, size - 2)));
  const usedWords = new Set(entry.pics.map(p => p.w));
  const usedPics = new Set(entry.pics.map(p => p.e));

  /* A wrong picture must really be wrong: not one of this unit's own words,
     not the same drawing, and with no trace of the sound in it. Blending
     units prefer wrong pictures from the other blending units. */
  const seenWords = new Set();
  const wrongOk = p => p.from !== state.letterKey && !usedWords.has(p.w) &&
    !usedPics.has(p.e) && !hasUnitSound(p.w, state.letterKey) &&
    !seenWords.has(p.w) && seenWords.add(p.w);
  const sameSection = key => (ALPHABET[key].kind === "blend") === (entry.kind === "blend");
  const need = size - correct.length;
  const near = shuffle(ALL_PICS.filter(p => sameSection(p.from))).filter(wrongOk);
  const far = shuffle(ALL_PICS.filter(p => !sameSection(p.from))).filter(wrongOk);
  const usedE = new Set();
  const distractors = [...near, ...far]
    .filter(p => !usedE.has(p.e) && usedE.add(p.e))
    .slice(0, need);

  state.find.items = shuffle([
    ...correct.map(p => ({ ...p, yes: true })),
    ...distractors.map(p => ({ ...p, yes: false }))
  ]);
  state.find.left = correct.length;
  state.find.busy = false;

  dom.findTarget.textContent = unitLabel(state.letterKey);
  dom.findTarget.classList.toggle("long", dom.findTarget.textContent.length > 3);
  dom.findPrompt.textContent = entry.findPrompt
    ? entry.findPrompt
    : entry.kind === "blend"
      ? `Find the pictures with ${entry.match.map(cased).join(" or ")} in them`
      : VOWELS.has(entry.letter)
        ? `Find the pictures with the ${entry.letter} sound in them`
        : `Find the pictures that start with ${cased(entry.letter)}`;
  dom.findCount.textContent = String(state.find.left);

  dom.findGrid.innerHTML = "";
  state.find.items.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.className = "find-item focusable dwell";
    btn.dataset.index = String(i);

    const e = document.createElement("span");
    e.className = "fi-emoji";
    setPicture(e, item.e);
    btn.append(e);

    if (state.settings.labels) {
      const w = document.createElement("span");
      w.className = "fi-word";
      w.textContent = item.w;
      btn.append(w);
    }

    btn.addEventListener("click", () => pickFind(i, btn));
    dom.findGrid.append(btn);
  });

  show("find");
}

async function pickFind(i, btn) {
  if (state.find.busy) return;
  const item = state.find.items[i];
  if (item.picked) return;

  if (item.yes) {
    item.picked = true;
    btn.classList.add("found", "done");
    state.find.left--;
    dom.findCount.textContent = String(state.find.left);
    Sfx.lock();
    Speech.say(item.w);

    if (state.find.left === 0) {
      state.find.busy = true;
      confettiBurst();
      Sfx.win();
      await Speech.say("Well done!", { silentDelay: 900 });
      await wait(700);
      startMake();
    }
  } else {
    Sfx.retry();
    btn.classList.add("nope");
    setTimeout(() => btn.classList.remove("nope"), 450);
  }
}

/* ===================================================================== match

   Four pictures from this page of the book across the top, their words
   jumbled underneath. Pick a picture then its word (or a word then its
   picture). A right pair is joined with a line and the word is read out;
   a wrong one just wobbles. The words are NOT read out before they are
   matched, so the child has to read them.                                  */

const MATCH_PAIRS = 4;

function matchPool(key) {
  const entry = ALPHABET[key];
  const seenW = new Set(), seenE = new Set();
  const out = [];
  const add = (w, e) => {
    const k = w.toLowerCase();
    if (!w || !e || seenW.has(k) || seenE.has(e)) return;
    seenW.add(k); seenE.add(e);
    out.push({ w, e });
  };
  entry.words.forEach(x => add(x.word, x.emoji));
  entry.pics.forEach(x => add(x.w, x.e));
  return out;
}

function startMatch() {
  const m = state.match;
  const pool = matchPool(state.letterKey);
  const pairs = shuffle(pool).slice(0, Math.min(MATCH_PAIRS, pool.length));
  m.pairs = pairs.map((p, i) => ({ ...p, id: i, done: false }));
  m.chosen = null;
  m.left = m.pairs.length;
  m.busy = false;

  dom.matchTarget.textContent = unitLabel(state.letterKey);
  dom.matchTarget.classList.toggle("long", dom.matchTarget.textContent.length > 3);
  dom.matchCount.textContent = String(m.left);
  dom.matchEnd.hidden = true;
  dom.matchLines.innerHTML = "";

  dom.matchPics.innerHTML = "";
  m.pairs.forEach(p => {
    const b = document.createElement("button");
    b.className = "match-pic focusable dwell";
    b.dataset.id = String(p.id);
    b.setAttribute("aria-label", "picture");
    const e = document.createElement("span");
    e.className = "mp-emoji";
    setPicture(e, p.e);
    b.append(e);
    b.addEventListener("click", () => pickMatch(b, "pic"));
    p.picNode = b;
    dom.matchPics.append(b);
  });

  /* Jumble the words so no word sits straight under its own picture. */
  let order = shuffle(m.pairs);
  for (let tries = 0; tries < 30 && m.pairs.length > 1 &&
       order.some((p, i) => p.id === m.pairs[i].id); tries++) order = shuffle(m.pairs);

  dom.matchWords.innerHTML = "";
  order.forEach(p => {
    const b = document.createElement("button");
    b.className = "match-word focusable dwell";
    if (p.w.length > 6) b.classList.add("small");
    b.dataset.id = String(p.id);
    b.textContent = cased(p.w);
    b.addEventListener("click", () => pickMatch(b, "word"));
    p.wordNode = b;
    dom.matchWords.append(b);
  });

  show("match", { keepFocus: true });
  nav.set(m.pairs[0].picNode, true);
}

function matchCentre(node, edge) {
  const b = dom.matchBoard.getBoundingClientRect();
  const r = node.getBoundingClientRect();
  return {
    x: r.left + r.width / 2 - b.left,
    y: (edge === "bottom" ? r.bottom : r.top) - b.top
  };
}

function drawMatchLines() {
  const svg = dom.matchLines;
  svg.innerHTML = "";
  state.match.pairs.filter(p => p.done).forEach(p => {
    const a = matchCentre(p.picNode, "bottom");
    const z = matchCentre(p.wordNode, "top");
    const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
    ln.setAttribute("x1", a.x); ln.setAttribute("y1", a.y);
    ln.setAttribute("x2", z.x); ln.setAttribute("y2", z.y);
    svg.append(ln);
  });
}

window.addEventListener("resize", () => {
  if (state.screen === "match") drawMatchLines();
});

async function pickMatch(node, side) {
  const m = state.match;
  if (m.busy) return;
  const pair = m.pairs[Number(node.dataset.id)];
  if (pair.done) return;

  /* Nothing chosen yet, or another one on the same side: choose this one. */
  if (!m.chosen || m.chosen.side === side) {
    if (m.chosen) m.chosen.node.classList.remove("chosen");
    if (m.chosen && m.chosen.node === node) { m.chosen = null; return; }
    m.chosen = { node, side, id: pair.id };
    node.classList.add("chosen");
    Sfx.tick();
    /* Jump the ring to the other row so the joystick child is ready. */
    const otherRow = side === "pic" ? dom.matchWords : dom.matchPics;
    const next = otherRow.querySelector(".focusable");
    if (next) nav.set(next, true);
    return;
  }

  const first = m.chosen;
  if (first.id === pair.id) {
    m.chosen = null;
    pair.done = true;
    [pair.picNode, pair.wordNode].forEach(n => {
      n.classList.remove("chosen", "focusable", "key-focus");
      n.classList.add("matched");
    });
    drawMatchLines();
    m.left--;
    dom.matchCount.textContent = String(m.left);
    Sfx.lock();

    if (m.left === 0) {
      m.busy = true;
      await Speech.say(pair.w, { rate: Math.max(0.6, state.settings.rate) });
      confettiBurst();
      Sfx.win();
      state.stars += 1;
      saveStars();
      renderStars();
      await Speech.say("Well done!", { silentDelay: 900 });
      dom.matchEnd.hidden = false;
      drawMatchLines();
      nav.set(el("matchAgain"), true);
      m.busy = false;
      return;
    }
    Speech.say(pair.w, { rate: Math.max(0.6, state.settings.rate) });
    const nextPic = dom.matchPics.querySelector(".focusable");
    if (nextPic) nav.set(nextPic, true);
  } else {
    Sfx.retry();
    node.classList.add("nope");
    setTimeout(() => node.classList.remove("nope"), 450);
  }
}

el("matchAgain").addEventListener("click", startMatch);
el("matchDone").addEventListener("click", () => backToMenu("match"));

/* ===================================================================== quiz

   Three short games on one screen, five questions each:
     word    — one big picture, pick its word from three.
     picture — one big word, pick its picture from three.
     sound   — three pictures, pick the one with the sound.
   Wrong answers just wobble. Each finished game earns a star.            */

const QUIZ_ROUNDS = 5;

function soundQuestion(entry) {
  if (entry.findPrompt) {
    return entry.findPrompt
      .replace("Find the pictures that start with", "Which picture starts with")
      .replace("Find the pictures with", "Which picture has")
      .replace(" in them", " in it") + "?";
  }
  if (entry.kind === "blend") return `Which picture has ${entry.match.map(cased).join(" or ")} in it?`;
  if (VOWELS.has(entry.letter)) return `Which picture has the ${entry.letter} sound?`;
  return `Which picture starts with ${cased(entry.letter)}?`;
}

/* Wrong pictures for the Sound game: same rules as the Find game — not this
   unit's words or drawings and with no trace of the sound. */
function wrongPics(key, need, avoid) {
  const entry = ALPHABET[key];
  const usedWords = new Set(entry.pics.map(p => p.w));
  const usedPics = new Set(entry.pics.map(p => p.e));
  const seenW = new Set(), seenE = new Set(avoid || []);
  const ok = p => p.from !== key && !usedWords.has(p.w) && !usedPics.has(p.e) &&
    !hasUnitSound(p.w, key) && !seenW.has(p.w) && !seenE.has(p.e) &&
    seenW.add(p.w) && seenE.add(p.e);
  const same = k => (ALPHABET[k].kind === "blend") === (entry.kind === "blend");
  const near = shuffle(ALL_PICS.filter(p => same(p.from))).filter(ok);
  const far = shuffle(ALL_PICS.filter(p => !same(p.from))).filter(ok);
  return [...near, ...far].slice(0, need);
}

function startQuiz(mode) {
  const q = state.quiz;
  const entry = ALPHABET[state.letterKey];
  q.mode = mode;
  q.i = 0;
  q.busy = false;

  if (mode === "sound") {
    const right = shuffle(entry.pics).slice(0, Math.min(QUIZ_ROUNDS, entry.pics.length));
    const used = [];
    q.rounds = right.map(r => {
      const wrong = wrongPics(state.letterKey, 2, used);
      wrong.forEach(w => used.push(w.e));
      return { answer: { w: r.w, e: r.e }, options: shuffle([{ w: r.w, e: r.e, yes: true }, ...wrong.map(w => ({ w: w.w, e: w.e }))]) };
    });
  } else {
    const pool = matchPool(state.letterKey);
    const right = shuffle(pool).slice(0, Math.min(QUIZ_ROUNDS, pool.length));
    q.rounds = right.map(r => {
      const wrong = shuffle(pool.filter(p => p.w !== r.w)).slice(0, 2);
      return { answer: r, options: shuffle([{ ...r, yes: true }, ...wrong]) };
    });
  }

  dom.quizTarget.textContent = unitLabel(state.letterKey);
  dom.quizTarget.classList.toggle("long", dom.quizTarget.textContent.length > 3);
  dom.screens.quiz.classList.toggle("big-pics", mode === "sound");
  dom.quizEnd.hidden = true;
  show("quiz", { keepFocus: true });
  renderQuiz();
}

function quizPrompt() {
  const q = state.quiz;
  if (q.mode === "word") return "Which word goes with the picture?";
  if (q.mode === "picture") return "Read the word. Which picture is it?";
  return soundQuestion(ALPHABET[state.letterKey]);
}

function renderQuiz() {
  const q = state.quiz;
  const round = q.rounds[q.i];
  dom.quizPrompt.textContent = quizPrompt();
  dom.quizCount.textContent = String(q.rounds.length - q.i);
  dom.quizEnd.hidden = true;

  /* The question: a big picture (word game), a big word (picture game),
     or just the 🔊 button that reads the question out (sound game). */
  const qa = dom.quizQuestion;
  qa.innerHTML = "";
  qa.hidden = false;
  if (q.mode === "word") {
    const box = document.createElement("div");
    box.className = "quiz-pic";
    const e = document.createElement("span");
    e.className = "qp-emoji";
    setPicture(e, round.answer.e);
    box.append(e);
    qa.append(box);
  } else if (q.mode === "picture") {
    const w = document.createElement("div");
    w.className = "quiz-word" + (round.answer.w.length > 6 ? " small" : "");
    w.textContent = cased(round.answer.w);
    qa.append(w);
  }
  if (q.mode !== "word" && state.settings.voice) {
    const say = document.createElement("button");
    say.className = "say-btn focusable dwell";
    say.setAttribute("aria-label", "Say it");
    setPicture(say, "🔊");
    say.addEventListener("click", () => {
      const r = state.quiz.rounds[state.quiz.i];
      if (!r) return;
      Speech.say(state.quiz.mode === "picture" ? r.answer.w : quizPrompt(),
        { rate: Math.max(0.6, state.settings.rate) });
    });
    qa.append(say);
  }

  dom.quizOptions.innerHTML = "";
  round.options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "quiz-opt focusable dwell";
    if (q.mode === "word") {
      b.classList.add("word");
      if (opt.w.length > 6) b.classList.add("small");
      b.textContent = cased(opt.w);
    } else {
      b.classList.add("pic");
      const e = document.createElement("span");
      e.className = "qo-emoji";
      setPicture(e, opt.e);
      b.append(e);
    }
    b.addEventListener("click", () => pickQuiz(b, opt));
    dom.quizOptions.append(b);
  });
  nav.set(dom.quizOptions.querySelector(".quiz-opt"), true);
}

async function pickQuiz(btn, opt) {
  const q = state.quiz;
  if (q.busy) return;
  if (!opt.yes) {
    Sfx.retry();
    btn.classList.add("nope");
    setTimeout(() => btn.classList.remove("nope"), 450);
    return;
  }
  q.busy = true;
  btn.classList.add("right");
  Sfx.lock();
  await Speech.say(opt.w, { rate: Math.max(0.6, state.settings.rate), silentDelay: 700 });
  await wait(350);
  q.i++;
  if (q.i < q.rounds.length) {
    q.busy = false;
    renderQuiz();
    return;
  }
  dom.quizCount.textContent = "0";
  confettiBurst();
  Sfx.win();
  state.stars += 1;
  saveStars();
  renderStars();
  await Speech.say("Well done!", { silentDelay: 900 });
  dom.quizEnd.hidden = false;
  nav.set(el("quizAgain"), true);
  q.busy = false;
}

el("quizAgain").addEventListener("click", () => startQuiz(state.quiz.mode));
el("quizDone").addEventListener("click", () => backToMenu(state.quiz.mode));

/* Back to the letter's activity screen, with the ring on the game just played. */
function backToMenu(go) {
  if (state.letterKey) openLetter(state.letterKey);
  const card = document.querySelector(`[data-go="${go}"]`);
  if (card) nav.set(card, true);
}

/* ===================================================================== memory

   Eight cards face down: four pictures and their four words. Turn two at a
   time; a picture and its own word stay up, anything else turns back.     */

const MEM_PAIRS = 4;

function startMemory() {
  const m = state.mem;
  const pool = shuffle(matchPool(state.letterKey)).slice(0, MEM_PAIRS);
  m.cards = shuffle(pool.flatMap((p, id) => [
    { id, kind: "pic", w: p.w, e: p.e },
    { id, kind: "word", w: p.w, e: p.e }
  ]));
  m.open = [];
  m.left = pool.length;
  m.busy = false;

  dom.memTarget.textContent = unitLabel(state.letterKey);
  dom.memTarget.classList.toggle("long", dom.memTarget.textContent.length > 3);
  dom.memCount.textContent = String(m.left);
  dom.memEnd.hidden = true;
  dom.memGrid.innerHTML = "";
  m.cards.forEach(c => {
    const b = document.createElement("button");
    b.className = "mem-card focusable dwell";
    b.textContent = "?";
    b.addEventListener("click", () => flipMem(c, b));
    c.node = b;
    dom.memGrid.append(b);
  });
  show("memory", { keepFocus: true });
  nav.set(m.cards[0].node, true);
}

function faceUp(c) {
  const b = c.node;
  b.classList.add("up");
  b.classList.remove("miss");
  b.innerHTML = "";
  if (c.kind === "pic") {
    const e = document.createElement("span");
    e.className = "mc-emoji";
    setPicture(e, c.e);
    b.append(e);
  } else {
    b.classList.add("word-card");
    if (c.w.length > 6) b.classList.add("small");
    b.textContent = cased(c.w);
  }
}

function faceDown(c) {
  const b = c.node;
  b.classList.remove("up", "word-card", "small");
  b.textContent = "?";
}

async function flipMem(c, b) {
  const m = state.mem;
  if (m.busy || c.got || m.open.includes(c)) return;
  faceUp(c);
  Sfx.tick();
  m.open.push(c);
  if (m.open.length < 2) return;

  const [a, z] = m.open;
  m.busy = true;
  if (a.id === z.id) {
    m.open = [];
    [a, z].forEach(x => {
      x.got = true;
      x.node.classList.add("got");
      x.node.classList.remove("focusable", "key-focus");
    });
    m.left--;
    dom.memCount.textContent = String(m.left);
    Sfx.lock();
    await Speech.say(a.w, { rate: Math.max(0.6, state.settings.rate), silentDelay: 700 });
    if (m.left === 0) {
      confettiBurst();
      Sfx.win();
      state.stars += 1;
      saveStars();
      renderStars();
      await Speech.say("Well done!", { silentDelay: 900 });
      dom.memEnd.hidden = false;
      nav.set(el("memAgain"), true);
    } else {
      const next = dom.memGrid.querySelector(".focusable");
      if (next && !next.isSameNode(nav.current) && !nav.current?.classList.contains("focusable")) nav.set(next, true);
    }
    m.busy = false;
  } else {
    await wait(1400);   // long enough to look at both
    [a, z].forEach(x => { faceDown(x); x.node.classList.add("miss"); });
    setTimeout(() => [a, z].forEach(x => x.node.classList.remove("miss")), 400);
    m.open = [];
    m.busy = false;
  }
}

el("memAgain").addEventListener("click", startMemory);
el("memDone").addEventListener("click", () => backToMenu("memory"));

/* ===================================================================== make

   The child drags letter tiles from the tray into the empty boxes.

   Two ways to do it, both ending in the same drop() call:
     • Mouse / touch — press and drag a tile, release it over a box.
     • Pick up and drop — press the button on a tile to lift it, move to a
       box, press again to drop. This is the joystick path: no holding, no
       aiming while pressing, and it works in Arrow Key Mode.                 */

/* Distractor letters that look plausible next to the real ones. */
const DISTRACTOR_POOL = [
  "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n",
  "p", "r", "s", "t", "v", "w", "y", "z",
  "a", "e", "i", "o", "u",
  "sh", "ch", "th", "ck"
];

function startMake() {
  state.make.queue = shuffle(ALPHABET[state.letterKey].words);
  show("make", { keepFocus: true });
  nextWord();
}

function nextWord() {
  const make = state.make;
  if (!make.queue.length) {
    finishLetter();
    return;
  }

  const pick = make.queue.shift();
  make.target = pick;
  make.carrying = null;
  make.busy = false;

  // One tile per letter of the word, plus a few extras to choose between.
  const used = new Set(pick.parts);
  const n = Number(state.settings.extras);
  let extras;
  if (ALPHABET[state.letterKey].kind === "blend") {
    /* Blending: the spare tiles are other word endings (and a start letter),
       so the child has to listen for the right ending — "b" + ag, not at. */
    const rimes = shuffle(RIME_POOL.filter(g => !used.has(g)));
    const starts = shuffle(DISTRACTOR_POOL.filter(g => g.length === 1 && !VOWELS.has(g) && !used.has(g)));
    extras = [];
    for (let i = 0; i < n; i++) extras.push(i % 2 === 0 ? rimes[i >> 1] : starts[i >> 1]);
    extras = extras.filter(Boolean);
  } else {
    extras = shuffle(DISTRACTOR_POOL.filter(g => !used.has(g))).slice(0, n);
  }

  let id = 0;
  make.tiles = shuffle([...pick.parts, ...extras]).map(g => ({
    id: id++,
    g,
    at: "tray"          // "tray", or the index of the box it sits in
  }));

  setPicture(dom.pictureEmoji, pick.emoji);
  setBanner("Drag the letters into the boxes!");
  renderBoard();
  nav.set(dom.letterTray.querySelector(".ltile"), true);
}

function setBanner(text, kind = "") {
  dom.banner.textContent = text;
  dom.banner.className = "banner" + (kind ? " " + kind : "");
}

function tileNode(tile, inSlot) {
  const node = document.createElement("button");
  // A tile sitting in a box is not separately focusable — the box is the
  // target, so the joystick never has two rings stacked in one place.
  node.className = "ltile" + (inSlot ? " in-slot" : " focusable dwell");
  node.dataset.id = String(tile.id);
  node.textContent = cased(tile.g);
  if (state.make.carrying === tile.id) node.classList.add("lifted");
  return node;
}

function renderBoard() {
  const make = state.make;

  dom.wordSlots.innerHTML = "";
  make.target.parts.forEach((_, i) => {
    const slot = document.createElement("div");
    slot.className = "wslot focusable dwell";
    slot.dataset.slot = String(i);

    const tile = make.tiles.find(t => t.at === i);
    if (tile) {
      slot.classList.add("filled");
      slot.append(tileNode(tile, true));
    }
    dom.wordSlots.append(slot);
  });

  dom.letterTray.innerHTML = "";
  make.tiles.filter(t => t.at === "tray").forEach(t => dom.letterTray.append(tileNode(t, false)));

  restoreFocus();
}

/* The board is rebuilt from scratch on every change, so the focus ring has to
   be put back on whatever the child was pointing at. */
let lastFocusHint = null;

function restoreFocus() {
  if (!lastFocusHint) return;
  const find = sel => dom.wordSlots.querySelector(sel) || dom.letterTray.querySelector(sel);
  const node = (lastFocusHint.kind === "slot"
    ? find(`.wslot[data-slot="${lastFocusHint.value}"]`)
    : find(`.ltile[data-id="${lastFocusHint.value}"]`))
    || dom.letterTray.querySelector(".ltile")
    || dom.wordSlots.querySelector(".wslot");
  if (node) nav.set(node, true);
}

function noteFocus(node) {
  if (!node || state.screen !== "make") return;
  if (node.dataset.slot != null) lastFocusHint = { kind: "slot", value: node.dataset.slot };
  else if (node.dataset.id != null) lastFocusHint = { kind: "tile", value: node.dataset.id };
}

/* ------------------------------------------------- picking up and dropping */

function liftTile(id) {
  const make = state.make;
  if (make.busy) return;
  make.carrying = id;
  Sfx.tick();
  const tile = make.tiles.find(t => t.id === id);
  setBanner(`Carrying ${cased(tile.g)} — now choose a box.`);
  renderBoard();
}

function dropCarried() {
  state.make.carrying = null;
  Sfx.unlock();
  setBanner("Drag the letters into the boxes!");
  renderBoard();
}

/* Puts a tile into a box. Whatever was already there swaps out to wherever
   the incoming tile came from, so nothing is ever lost. */
function placeTile(id, slotIndex) {
  const make = state.make;
  const tile = make.tiles.find(t => t.id === id);
  if (!tile || make.busy) return;

  const occupant = make.tiles.find(t => t.at === slotIndex && t.id !== id);
  const from = tile.at;
  tile.at = slotIndex;
  if (occupant) occupant.at = from === slotIndex ? "tray" : from;

  make.carrying = null;
  Sfx.lock();
  lastFocusHint = { kind: "slot", value: String(slotIndex) };

  const filled = make.target.parts.every((_, i) => make.tiles.some(t => t.at === i));
  if (filled) {
    setBanner("Let's see...");
    renderBoard();
    setTimeout(checkWord, 450);
  } else {
    setBanner("Keep going!");
    renderBoard();
  }
}

/* Takes a tile back out of a box and returns it to the tray. */
function returnTile(id) {
  const make = state.make;
  const tile = make.tiles.find(t => t.id === id);
  if (!tile || make.busy) return;
  tile.at = "tray";
  make.carrying = null;
  Sfx.unlock();
  lastFocusHint = { kind: "tile", value: String(id) };
  setBanner("Drag the letters into the boxes!");
  renderBoard();
}

/* ------------------------------------------------- click / button handling */

dom.wordSlots.addEventListener("click", e => {
  const make = state.make;
  if (make.busy || dragging.active || dragging.justDragged) return;

  const slotNode = e.target.closest(".wslot");
  if (!slotNode) return;
  const slotIndex = Number(slotNode.dataset.slot);
  noteFocus(slotNode);

  if (make.carrying != null) {
    placeTile(make.carrying, slotIndex);
    return;
  }

  // Nothing in hand: pressing a filled box takes that letter back out.
  const occupant = make.tiles.find(t => t.at === slotIndex);
  if (occupant) returnTile(occupant.id);
});

dom.letterTray.addEventListener("click", e => {
  const make = state.make;
  if (make.busy || dragging.active || dragging.justDragged) return;

  const tileNode = e.target.closest(".ltile");
  if (!tileNode) return;
  const id = Number(tileNode.dataset.id);
  noteFocus(tileNode);

  if (make.carrying === id) dropCarried();
  else liftTile(id);
});

/* ------------------------------------------------- mouse and touch dragging */

const dragging = { active: false, id: null, node: null, ghost: null, moved: false, justDragged: false };

function startDrag(id, node, ev) {
  const rect = node.getBoundingClientRect();
  const ghost = node.cloneNode(true);
  ghost.classList.remove("focusable", "dwell", "key-focus", "lifted");
  ghost.classList.add("drag-ghost");
  ghost.style.width = rect.width + "px";
  ghost.style.height = rect.height + "px";
  ghost.style.display = "none";   // only shown once the pointer actually moves
  document.body.append(ghost);

  dragging.active = true;
  dragging.id = id;
  dragging.ghost = ghost;
  dragging.moved = false;
  dragging.startX = ev.clientX;
  dragging.startY = ev.clientY;
  dragging.offsetX = rect.width / 2;
  dragging.offsetY = rect.height / 2;
  moveGhost(ev.clientX, ev.clientY);
  dragging.node = node;
}

function moveGhost(x, y) {
  if (!dragging.ghost) return;
  dragging.ghost.style.left = x - dragging.offsetX + "px";
  dragging.ghost.style.top = y - dragging.offsetY + "px";
}

function endDrag(x, y) {
  if (!dragging.active) return;
  const id = dragging.id;
  const moved = dragging.moved;

  // A real drag is followed by a click event on the tile we just moved.
  // Swallow it, or the board would act on the same gesture twice.
  dragging.justDragged = moved;
  if (moved) setTimeout(() => { dragging.justDragged = false; }, 0);

  dragging.ghost.remove();
  dragging.active = false;
  dragging.ghost = null;
  dragging.node = null;
  dragging.id = null;

  document.querySelectorAll(".wslot.drop-ok").forEach(s => s.classList.remove("drop-ok"));
  document.querySelectorAll(".ltile.lifted").forEach(t => {
    if (state.make.carrying == null) t.classList.remove("lifted");
  });

  if (!moved) return;   // a tap, not a drag — the click handler deals with it

  const under = document.elementFromPoint(x, y);
  const slotNode = under && under.closest(".wslot");
  if (slotNode) {
    placeTile(id, Number(slotNode.dataset.slot));
  } else {
    const tile = state.make.tiles.find(t => t.id === id);
    if (tile && tile.at !== "tray") returnTile(id);
    else renderBoard();
  }
}

document.addEventListener("pointerdown", e => {
  if (state.screen !== "make" || state.make.busy || e.button !== 0) return;
  const node = e.target.closest(".ltile");
  if (!node) return;
  startDrag(Number(node.dataset.id), node, e);
});

document.addEventListener("pointermove", e => {
  if (!dragging.active) return;
  if (!dragging.moved) {
    // A few pixels of slack, so a plain click is never read as a drag.
    const far = Math.hypot(e.clientX - dragging.startX, e.clientY - dragging.startY) > 8;
    if (!far) return;
    dragging.moved = true;
    dragging.ghost.style.display = "";
    if (dragging.node) dragging.node.classList.add("lifted");
  }
  moveGhost(e.clientX, e.clientY);

  const under = document.elementFromPoint(e.clientX, e.clientY);
  const slotNode = under && under.closest(".wslot");
  document.querySelectorAll(".wslot.drop-ok").forEach(s => {
    if (s !== slotNode) s.classList.remove("drop-ok");
  });
  if (slotNode) slotNode.classList.add("drop-ok");
});

document.addEventListener("pointerup", e => endDrag(e.clientX, e.clientY));
document.addEventListener("pointercancel", () => {
  if (dragging.active) {
    dragging.moved = false;
    endDrag(0, 0);
  }
});

/* ------------------------------------------------- checking and blending */

async function checkWord() {
  const make = state.make;
  make.busy = true;

  const guess = make.target.parts.map((_, i) => {
    const t = make.tiles.find(x => x.at === i);
    return t ? t.g : null;
  });
  const correct = guess.every((g, i) => g === make.target.parts[i]);
  const slotNodes = [...dom.wordSlots.children];

  if (!correct) {
    Sfx.retry();
    setBanner("Nearly! Try again.", "bad");
    guess.forEach((g, i) => {
      if (g !== make.target.parts[i]) slotNodes[i].classList.add("wrong");
    });
    await Speech.say("Try again", { silentDelay: 700 });
    await wait(550);

    // Correct letters stay put; only the wrong ones go back to the tray.
    guess.forEach((g, i) => {
      if (g !== make.target.parts[i]) {
        const t = make.tiles.find(x => x.at === i);
        if (t) t.at = "tray";
      }
    });
    make.busy = false;
    lastFocusHint = null;
    setBanner("Drag the letters into the boxes!");
    renderBoard();
    nav.set(dom.letterTray.querySelector(".ltile"), true);
    return;
  }

  await blendIt(slotNodes);
}

async function blendIt(slotNodes) {
  const make = state.make;
  setBanner("Blend it!", "good");
  slotNodes.forEach(s => s.classList.add("correct"));

  for (let i = 0; i < make.target.parts.length; i++) {
    slotNodes[i].classList.add("sounding");
    await wait(420);   // the boxes light up one by one, quietly
    slotNodes[i].classList.remove("sounding");
    await wait(100);
  }

  await wait(200);
  setBanner(cased(make.target.word) + "!", "good");
  Sfx.win();
  confettiBurst();
  await Speech.say(make.target.word, { rate: 0.8, silentDelay: 800 });

  state.stars += 1;
  saveStars();
  renderStars();

  await wait(900);
  lastFocusHint = null;
  nextWord();
}

function finishLetter() {
  state.done[state.letterKey] = true;
  saveDone();
  dom.wordSlots.innerHTML = "";
  dom.letterTray.innerHTML = "";
  setBanner("All done! ⭐", "good");
  confettiBurst();
  Sfx.win();
  setTimeout(goHome, 1800);
}

dom.pictureCard.addEventListener("click", () => {
  if (state.make.target) Speech.say(state.make.target.word, { rate: 0.75 });
});

/* ===================================================================== keys */

document.addEventListener("keydown", e => {
  /* Teacher shortcut: works from any screen, including with the modal shut. */
  if (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) {
    e.preventDefault();
    if (dom.teacherModal.hidden) openTeacher();
    return;
  }

  if (!dom.teacherModal.hidden) {
    if (e.key === "Escape") closeTeacher();
    return;
  }

  if (!dom.exitModal.hidden) {
    const k = e.key;
    if (k === "Escape" || k === "Backspace") { e.preventDefault(); return closeExit(); }
    if (k === "Enter" || k === " ") { e.preventDefault(); return nav.click(); }
    if (k === "ArrowLeft" || k === "ArrowUp") { e.preventDefault(); return nav.move(-1, 0); }
    if (k === "ArrowRight" || k === "ArrowDown") { e.preventDefault(); return nav.move(1, 0); }
    return;
  }

  const key = e.key;
  const isArrow = key.startsWith("Arrow");
  const isFire = key === "Enter" || key === " ";
  if (!isArrow && !isFire && key !== "Escape" && key !== "Backspace") return;
  e.preventDefault();

  if (key === "Escape" || key === "Backspace") {
    if (state.screen !== "home") dom.backBtn.click();
    return;
  }

  if (isFire) return nav.click();
  if (key === "ArrowUp") return nav.move(0, -1);
  if (key === "ArrowDown") return nav.move(0, 1);
  if (key === "ArrowLeft") return nav.move(-1, 0);
  if (key === "ArrowRight") return nav.move(1, 0);
});

/* ===================================================================== dwell

   Rest the cursor on anything for the dwell time and it clicks itself, for
   children who cannot aim and press the button at the same time.             */

const dwell = { timer: null, bar: null, el: null };

function cancelDwell() {
  clearTimeout(dwell.timer);
  dwell.timer = null;
  if (dwell.bar) dwell.bar.remove();
  dwell.bar = null;
  dwell.el = null;
}

document.addEventListener("mouseover", e => {
  if (!state.settings.dwell) return;
  const target = e.target.closest(".dwell");
  if (!target || target === dwell.el) return;
  cancelDwell();
  dwell.el = target;

  const bar = document.createElement("div");
  bar.className = "dwell-bar";
  target.append(bar);
  dwell.bar = bar;
  requestAnimationFrame(() => {
    bar.style.transition = `width ${state.settings.dwellTime}ms linear`;
    bar.style.width = "100%";
  });

  dwell.timer = setTimeout(() => {
    const t = dwell.el;
    cancelDwell();
    if (t && t.isConnected) t.click();
  }, state.settings.dwellTime);
});

document.addEventListener("mouseout", e => {
  if (dwell.el && e.target.closest(".dwell") === dwell.el) cancelDwell();
});

/* ===================================================================== exit */

/* The Exit button sits on the letters page only. It asks first, so a child
   who lands on it by accident can always back out. "No" is the default
   highlight, and Escape also backs out. */

function openExit() {
  Speech.cancel();
  cancelDwell();
  dom.exitModal.hidden = false;
  nav.set(el("exitCancelBtn"));
}

function closeExit() {
  dom.exitModal.hidden = true;
  nav.set(dom.exitBtn);
}

dom.exitBtn.addEventListener("click", openExit);
el("exitCancelBtn").addEventListener("click", closeExit);
el("exitYesBtn").addEventListener("click", () => {
  dom.exitModal.hidden = true;
  saveSettings();
  window.close();
});

/* ===================================================================== teacher */

/* The gear is deliberately awkward for a child: you must hold the button down
   for a full second. Pointer capture keeps the hold alive even if the joystick
   drifts off the small button while pressed. Ctrl+Shift+S opens it instantly
   for the teacher. */

let holdTimer = null;

const cancelHold = () => {
  clearTimeout(holdTimer);
  holdTimer = null;
  dom.teacherBtn.classList.remove("holding");
};

dom.teacherBtn.addEventListener("pointerdown", e => {
  e.preventDefault();
  try { dom.teacherBtn.setPointerCapture(e.pointerId); } catch (_) {}
  dom.teacherBtn.classList.add("holding");
  clearTimeout(holdTimer);
  holdTimer = setTimeout(openTeacher, 1000);
});

["pointerup", "pointercancel"].forEach(ev =>
  dom.teacherBtn.addEventListener(ev, cancelHold)
);

function openTeacher() {
  cancelHold();
  Speech.cancel();
  cancelDwell();
  populateTeacher();
  dom.teacherModal.hidden = false;
}

function closeTeacher() {
  dom.teacherModal.hidden = true;
  saveSettings();
  goHome();
}

function populateTeacher() {
  const voiceSelect = el("voiceSelect");
  voiceSelect.innerHTML = "";
  const voices = Speech.getVoices();
  if (!voices.length) {
    voiceSelect.append(new Option("System default", ""));
  } else {
    // English voices on this computer first, then online ones (need the
    // internet), then Thai voices, which read the English with a Thai accent.
    const label = v => v.name.replace(/ Online \(Natural\)/, "").replace(/^Microsoft /, "");
    const en = voices.filter(v => /^en/i.test(v.lang));
    const th = voices.filter(v => /^th/i.test(v.lang));
    en.filter(v => !Speech.isOnlineVoice(v)).forEach(v =>
      voiceSelect.append(new Option(`${label(v)} (${v.lang})`, v.name)));
    en.filter(v => Speech.isOnlineVoice(v)).forEach(v =>
      voiceSelect.append(new Option(`${label(v)} (${v.lang}) — needs internet`, v.name)));
    th.forEach(v => voiceSelect.append(new Option(
      `${label(v)} — Thai accent${Speech.isOnlineVoice(v) ? " — needs internet" : ""}`, v.name)));
  }
  voiceSelect.value = Speech.getVoiceName();

  el("extrasSelect").value = String(state.settings.extras);
  el("findSizeSelect").value = String(state.settings.findSize);
  el("caseSelect").value = state.settings.letterCase;
  el("picStyleSelect").value = state.settings.picStyle;
  el("labelsToggle").checked = state.settings.labels;
  el("dwellToggle").checked = state.settings.dwell;
  el("dwellTimeSelect").value = String(state.settings.dwellTime);
  el("voiceToggle").checked = state.settings.voice;
  el("rateSelect").value = String(state.settings.rate);
  el("voiceStatus").textContent = "";
  el("voiceStatus").className = "voice-status";
}

function bindSetting(id, prop, transform = v => v) {
  el(id).addEventListener("change", e => {
    const raw = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    state.settings[prop] = transform(raw);
    saveSettings();
  });
}

bindSetting("extrasSelect", "extras", Number);
bindSetting("findSizeSelect", "findSize", Number);
bindSetting("caseSelect", "letterCase");
el("picStyleSelect").addEventListener("change", e => {
  state.settings.picStyle = e.target.value;
  saveSettings();
  if (typeof setPictureStyle === "function") setPictureStyle(state.settings.picStyle);
  document.querySelectorAll("[data-pic]").forEach(n => setPicture(n, n.dataset.pic));
});
bindSetting("labelsToggle", "labels");
bindSetting("dwellToggle", "dwell");
bindSetting("dwellTimeSelect", "dwellTime", Number);

el("voiceToggle").addEventListener("change", e => {
  state.settings.voice = e.target.checked;
  Speech.setEnabled(state.settings.voice);
  saveSettings();
  if (state.settings.voice) testVoice();
});

/* Speaks a test sentence and says plainly whether it worked. */
async function testVoice() {
  const status = el("voiceStatus");
  status.className = "voice-status";
  status.textContent = "Speaking…";
  if (!window.speechSynthesis) {
    status.className = "voice-status bad";
    status.textContent = "✗ This browser has no computer voice. Use Microsoft Edge.";
    return;
  }
  const r = await Speech.test("Hello! Let's build some words.");
  if (r.ok && r.fellBack) {
    status.className = "voice-status ok";
    status.textContent = "✓ Working — but the voice you chose needs the internet, so a voice on this computer was used instead.";
  } else if (r.ok) {
    status.className = "voice-status ok";
    status.textContent = "✓ Working. If you heard nothing, check the computer's volume and speakers." +
      (r.words ? " Words light up exactly with this voice."
               : " This voice does not say which word it is on, so the words light up at reading speed.");
  } else {
    status.className = "voice-status bad";
    status.textContent = Speech.isOnlineVoice(r.voice)
      ? "✗ No sound. This voice needs the internet — pick a voice without \"needs internet\"."
      : "✗ No sound. Try another voice, and check the volume and that speakers are plugged in.";
  }
}
el("voiceTestBtn").addEventListener("click", testVoice);



el("rateSelect").addEventListener("change", e => {
  state.settings.rate = Number(e.target.value);
  Speech.setRate(state.settings.rate);
  saveSettings();
});

el("voiceSelect").addEventListener("change", e => {
  state.settings.voiceName = e.target.value;
  Speech.setVoiceByName(e.target.value);
  saveSettings();
  testVoice();
});

el("resetScoreBtn").addEventListener("click", () => {
  state.stars = 0;
  state.done = {};
  saveStars();
  saveDone();
  renderStars();
});

el("closeTeacherBtn").addEventListener("click", closeTeacher);

/* ===================================================================== boot */

/* If a guide picture (school logo, photo) is missing on this computer, hide it
   rather than show a broken-image box. */
document.querySelectorAll("img").forEach(img => {
  const hide = () => { img.style.display = "none"; };
  if (img.complete && img.naturalWidth === 0) hide();
  else img.addEventListener("error", hide);
});

loadSaved();
renderStars();
renderLetterGrid();
document.querySelectorAll("[data-pic]").forEach(el => setPicture(el, el.dataset.pic));
show("home");
focusFirstTile();

if (window.speechSynthesis) {
  window.speechSynthesis.addEventListener("voiceschanged", () => {
    Speech.getVoices();
    if (state.settings.voiceName) Speech.setVoiceByName(state.settings.voiceName);
    if (!dom.teacherModal.hidden) populateTeacher();
  });
}
