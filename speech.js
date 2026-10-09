/* Optional computer voice. OFF by default — the teacher reads aloud.
   When switched on in Teacher Settings it uses the voices installed on Windows. */

/* Rough "sound it out" spellings, so the voice says the phoneme rather than
   the letter name. Adjust any of these if your machine's voice sounds odd. */
const PHONEME_SAY = {
  a: "ah", e: "eh", i: "ih", o: "oh", u: "uh",
  b: "buh", c: "kuh", d: "duh", f: "fff", g: "guh", h: "huh",
  j: "juh", k: "kuh", l: "lll", m: "mmm", n: "nnn", p: "puh",
  q: "kwuh", qu: "kwuh", r: "rrr", s: "sss", t: "tuh", v: "vvv",
  w: "wuh", x: "ks", y: "yuh", z: "zzz", zz: "zzz",
  sh: "shhh", ch: "chuh", th: "thuh", wh: "wuh", ck: "kuh"
};

const Speech = (() => {
  let voice = null;
  let voices = [];
  let rate = 0.8;
  let enabled = false;
  let lastProblem = "";
  let preferredName = "";   // the voice the teacher picked, remembered by name

  const synth = () => window.speechSynthesis || null;
  const isOnline = v => v && v.localService === false;   // "Online (Natural)" voices
  const english = () => voices.filter(v => /^en/i.test(v.lang));
  /* A voice that is on the computer itself, so it works with no internet. */
  function localEnglish() {
    // If a Thai voice was chosen, fall back to a Thai voice on this computer.
    if (voice && /^th/i.test(voice.lang)) {
      const th = voices.filter(v => /^th/i.test(v.lang) && v.localService !== false);
      if (th.length) return th[0];
    }
    const list = english().filter(v => v.localService !== false);
    return list.find(v => /en-GB/i.test(v.lang)) ||
           list.find(v => /en-US/i.test(v.lang)) || list[0] || null;
  }

  /* Edge reloads its voice list now and then (and online voices can vanish
     from it for a moment). Always look the chosen voice up again by name,
     so the program never drifts back to a different voice. */
  function loadVoices() {
    const fresh = synth() ? synth().getVoices() : [];
    if (fresh.length) voices = fresh;
    const wanted = preferredName || (voice && voice.name);
    const match = wanted && voices.find(v => v.name === wanted);
    if (match) voice = match;
    else if (!voice) {
      voice = localEnglish() ||
        english().find(v => /en-GB/i.test(v.lang)) ||
        english()[0] || null;
    }
    // English voices plus Thai ones (they read English with a Thai accent).
    return voices.filter(v => /^(en|th)/i.test(v.lang));
  }

  if (synth()) loadVoices();

  function cancel() {
    if (synth()) synth().cancel();
  }

  /* The voice to use right now: the chosen one, unless it needs the internet
     and there is none — then a voice that is on the computer. */
  function currentVoice(forceLocal) {
    loadVoices();
    if (voice && (forceLocal || !navigator.onLine) && isOnline(voice)) {
      return localEnglish() || voice;
    }
    return voice;
  }

  function speakOnce(text, opts, v) {
    return new Promise(res => {
      const s = synth();
      const u = new SpeechSynthesisUtterance(text);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
      u.rate = opts.rate != null ? opts.rate : rate;
      u.pitch = opts.pitch != null ? opts.pitch : 1.05;
      let started = false, done = false;
      const end = (ok, why) => {
        if (done) return;
        done = true;
        clearTimeout(startGuard); clearTimeout(guard);
        res({ ok, why, started });
      };
      u.onstart = () => { started = true; if (opts.onStart) opts.onStart(); };
      // Word-by-word progress, used to light up each word as it is read.
      u.onboundary = e => {
        started = true;
        if (opts.onWord && (!e.name || e.name === "word")) opts.onWord(e.charIndex);
      };
      u.onend = () => end(true);
      u.onerror = e => end(false, (e && e.error) || "error");
      // If nothing has started after 4 s, the voice is not working.
      // If nothing at all is happening after 7 s, the voice is not working.
      // (Some online voices never send "start", so also check s.speaking.)
      const startGuard = setTimeout(() => {
        if (!started && !s.speaking) { s.cancel(); end(false, "no-start"); }
      }, 7000);
      const guard = setTimeout(() => end(true), 4000 + text.length * 150);
      s.resume();            // Edge/Chrome can get stuck "paused"
      s.speak(u);
    });
  }

  /* Resolves when the speaking is finished (or straight away, quietly, when
     the voice is off), so the games never get stuck waiting for it. */
  async function say(text, opts = {}) {
    if (!enabled || !synth()) {
      await new Promise(r => setTimeout(r, opts.silentDelay != null ? opts.silentDelay : 300));
      return { ok: false, why: "off" };
    }
    if (synth().speaking || synth().pending) {
      synth().cancel();
      await new Promise(r => setTimeout(r, 60));   // speaking right after cancel can be dropped
    }
    const stopped = r => r.why === "interrupted" || r.why === "canceled";
    const chosen = currentVoice(false);
    let r = await speakOnce(text, opts, chosen);
    if (!r.ok && !stopped(r) && isOnline(chosen)) {
      // Online voices sometimes hiccup. Try the same voice once more first...
      await new Promise(res => setTimeout(res, 400));
      r = await speakOnce(text, opts, currentVoice(false));
      // ...and only if it fails again (no internet), use a computer voice for
      // this one sentence. The chosen voice is kept for the next one.
      if (!r.ok && !stopped(r)) {
        const local = localEnglish();
        if (local) r = await speakOnce(text, opts, local);
        if (r.ok) lastProblem = "online";
      }
    }
    if (!r.ok && r.why !== "interrupted" && r.why !== "canceled") lastProblem = r.why;
    return r;
  }

  function sayPhoneme(grapheme) {
    return say(PHONEME_SAY[grapheme] || grapheme, {
      rate: Math.max(0.6, rate - 0.1),
      silentDelay: 240
    });
  }

  /* For the Test button in Teacher Settings: speaks even if the voice is
     switched off, and reports what happened. */
  async function test(text) {
    const was = enabled;
    enabled = true;
    lastProblem = "";
    let words = false;
    const r = await say(text, { onWord: () => { words = true; } });
    enabled = was;
    return { ok: r.ok, why: r.why, words, fellBack: lastProblem === "online", voice: currentVoice(false) };
  }

  return {
    say,
    sayPhoneme,
    cancel,
    test,
    getVoices: loadVoices,
    isOnlineVoice: isOnline,
    setEnabled(on) {
      enabled = !!on;
      if (!enabled) cancel();
    },
    isEnabled: () => enabled,
    setVoiceByName(name) {
      preferredName = name || "";
      loadVoices();
    },
    getVoiceName: () => preferredName || (voice ? voice.name : ""),
    setRate(r) { rate = r; },
    getRate: () => rate
  };
})();

/* Short synthesised chimes. These always play — they are feedback, not speech,
   and they work whether or not the computer voice is switched on. */
const Sfx = (() => {
  let ctx = null;
  function audio() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function tone(freq, start, duration, type = "sine", gain = 0.18) {
    const a = audio();
    const osc = a.createOscillator();
    const g = a.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, a.currentTime + start);
    g.gain.exponentialRampToValueAtTime(gain, a.currentTime + start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + duration);
    osc.connect(g).connect(a.destination);
    osc.start(a.currentTime + start);
    osc.stop(a.currentTime + start + duration + 0.05);
  }
  return {
    tick: () => tone(660, 0, 0.06, "triangle", 0.07),
    move: () => tone(520, 0, 0.05, "triangle", 0.05),
    lock: () => tone(880, 0, 0.12, "triangle", 0.14),
    unlock: () => tone(440, 0, 0.08, "triangle", 0.1),
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.22, "sine", 0.16)),
    retry: () => { tone(340, 0, 0.16, "sine", 0.12); tone(260, 0.14, 0.22, "sine", 0.12); }
  };
})();
