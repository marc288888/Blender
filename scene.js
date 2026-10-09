/* scene.js — builds ONE whole picture for a story page.
 *
 * Before this, a page showed its characters as separate floating squares.
 * Now the page gets a real illustration: a sky, a ground, some scenery, and
 * the characters standing in it at different sizes so the picture has depth —
 * the same idea as a storybook page.
 *
 * The characters themselves are the drawings in art.js. This file only does
 * the staging: picking a setting, drawing the background, and deciding where
 * each character stands and how big it is.
 *
 * storyScene(["<char>", "<char>"]) -> SVG markup, or null if nothing to draw.
 */

const SCENE = (function () {
  const K = typeof AK !== "undefined" ? AK : "#33302e";

  /* ---------------------------------------------------------------- stage */

  const W = 160, H = 100;   /* picture is 16:10 */
  const HORIZON = 57;       /* where the ground starts */

  /* Things that belong in the sky, not standing on the grass. */
  const SKY = new Set([
    "\u2600\uFE0F", "\u{1F31E}", "\u{1F319}", "\u{1F308}", "\u{1F4AB}",
    "\u26A1", "\u{1F327}\uFE0F", "\u{1F4A8}", "\u{1F3B5}", "\u{1F3B6}",
    "\u{1F4AD}", "\u{1F4A4}", "\u{1F50A}", "\u{1F4E2}", "\u{1FA81}",
    "\u2B06\uFE0F", "\u2B07\uFE0F", "\u27A1\uFE0F", "\u2753", "\u{1F4A5}",
    "8\uFE0F\u20E3", "6\uFE0F\u20E3", "3\uFE0F\u20E3", "\u3030\uFE0F",
    "\u{1F426}", "\u{1F41D}", "\u{1F389}",
    /* added for the KG3 book stories */
    "✈️", "🎈", "🚀", "☁️", "🌫️", "❌"
  ]);

  /* A setting is picked from what is in the picture. First match wins. */
  const SETTINGS = [
    ["indoor", ["\u{1F6CF}\uFE0F", "\u{1FA91}", "\u{1FA9F}", "\u{1F6AA}",
                "\u{1F5C4}\uFE0F", "\u{1F4FA}",
                "mat", "wardrobe", "cot", "pillow", "🪔", "🧑‍🏫", "🕐", "🍮"]],
    ["desert", ["\u{1F3DC}\uFE0F", "\u{1F335}"]],
    ["water",  ["\u{1F41F}", "\u{1F433}", "\u{1F419}", "\u{1F30A}",
                "\u{1F986}", "\u{1F4A6}", "\u{1F4A7}",
                "🪼", "🦈", "🐬", "🎣"]],
    ["night",  ["\u{1F319}", "\u{1F4A4}", "\u{1F634}"]],
    ["town",   ["\u{1F3E0}", "\u{1F3D8}\uFE0F", "\u{1F3EA}", "\u{1F307}", "⛪", "🚕"]]
  ];

  function settingFor(keys) {
    for (const [name, triggers] of SETTINGS) {
      if (keys.some(k => triggers.includes(k))) return name;
    }
    return "field";
  }

  /* A tiny repeatable shuffle so each page looks a little different from the
     next one, but the SAME page always looks the same. */
  function seedOf(keys) {
    let n = 0;
    const s = keys.join("");
    for (let i = 0; i < s.length; i++) n = (n * 31 + s.charCodeAt(i)) % 9973;
    return n;
  }
  function wobble(seed, i, amount) {
    const v = Math.sin((seed + i * 57.3) * 12.9898) * 43758.5453;
    return ((v - Math.floor(v)) - 0.5) * 2 * amount;
  }

  /* ------------------------------------------------------------- helpers */

  let uid = 0;

  const rect = (x, y, w, h, fill) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  const path = (d, fill, stroke, sw) =>
    `<path d="${d}" fill="${fill || "none"}"` +
    (stroke ? ` stroke="${stroke}" stroke-width="${sw || 1}" stroke-linecap="round"` : "") +
    `/>`;
  const circ = (cx, cy, r, fill) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
  const ell = (cx, cy, rx, ry, fill) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;

  function grad(id, from, to) {
    return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="${from}"/>` +
      `<stop offset="1" stop-color="${to}"/></linearGradient>`;
  }

  function cloud(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff" opacity="0.92">` +
      circ(0, 0, 7, "#fff") + circ(9, 2, 5.5, "#fff") + circ(-8, 2, 5, "#fff") +
      rect(-8, 0, 17, 5, "#fff") + `</g>`;
  }

  function sun(x, y, col) {
    let rays = "";
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      rays += path(
        `M${(x + Math.cos(a) * 9).toFixed(1)} ${(y + Math.sin(a) * 9).toFixed(1)}` +
        `L${(x + Math.cos(a) * 13).toFixed(1)} ${(y + Math.sin(a) * 13).toFixed(1)}`,
        null, col, 1.8);
    }
    return rays + circ(x, y, 7.5, col);
  }

  function tree(x, base, s) {
    return `<g transform="translate(${x} ${base}) scale(${s})">` +
      rect(-2.5, -14, 5, 14, "#8a5f35") +
      circ(0, -20, 10, "#4e9c47") + circ(-7, -15, 7.5, "#5bb152") +
      circ(7, -15, 7, "#5bb152") + `</g>`;
  }

  function bush(x, base, s) {
    return `<g transform="translate(${x} ${base}) scale(${s})">` +
      circ(0, -5, 6, "#54a84c") + circ(-5, -3, 4.5, "#62b857") +
      circ(5, -3, 4.5, "#62b857") + `</g>`;
  }

  function tufts(seed, col) {
    let out = "";
    for (let i = 0; i < 14; i++) {
      const x = 4 + ((i * 11.7 + seed % 13) % 152);
      const y = HORIZON + 6 + ((i * 7.3) % 36);
      out += path(`M${x.toFixed(1)} ${y.toFixed(1)}l-1.6 -3.4M${x.toFixed(1)} ${y.toFixed(1)}l1.6 -3.4`,
        null, col, 1);
    }
    return out;
  }

  function stars(seed) {
    let out = "";
    for (let i = 0; i < 16; i++) {
      const x = 5 + ((i * 19.3 + seed % 17) % 150);
      const y = 5 + ((i * 11.1 + seed % 7) % 44);
      const r = 0.7 + (i % 3) * 0.4;
      out += circ(x.toFixed(1), y.toFixed(1), r, "#fdf6c8");
    }
    return out;
  }

  /* ---------------------------------------------------------- backgrounds */

  function background(name, seed, id, opts) {
    const g = s => `url(#${id}${s})`;
    const o = opts || {};
    const w = (i, amt) => wobble(seed, i, amt);
    /* Don't draw a sun in the sky if the story itself already has one. */
    const skySun = (o.hasSun || o.sunX === null) ? ""
      : sun(o.sunX === undefined ? 20 + w(1, 14) : o.sunX, 14 + w(2, 4), "#f7c93f");
    const puffs =
      cloud(104 + w(3, 22), 13 + w(4, 5), 1.05) +
      cloud(136 + w(5, 14), 25 + w(6, 6), 0.8) +
      cloud(62 + w(7, 20), 10 + w(8, 4), 0.7);
    let defs = "", art = "";

    if (name === "indoor") {
      defs = grad(id + "w", "#f7e6c8", "#efd6ae");
      art =
        rect(0, 0, W, 70, g("w")) +
        rect(0, 70, W, 30, "#c08d55") +
        rect(0, 68, W, 4, "#9a6c3e") +
        path("M0 78H160M0 88H160", null, "#a9774a", 0.9) +
        /* a picture on the wall, so the room is not an empty box */
        `<g><rect x="12" y="12" width="26" height="20" fill="#fff" stroke="${K}" stroke-width="1.6"/>` +
        circ(20, 26, 4, "#7cc3ea") + path("M14 32l8-9 7 9z", "#6aab5f") + `</g>`;
      return { defs, art, ground: 70, shadow: "rgba(70,40,10,0.18)" };
    }

    if (name === "desert") {
      defs = grad(id + "s", "#ffe6ae", "#fff3d6") + grad(id + "g", "#f6d99a", "#e8c278");
      art =
        rect(0, 0, W, HORIZON + 2, g("s")) +
        (o.hasSun ? "" : sun(128 + w(1, 16), 16 + w(2, 4), "#f6a93b")) +
        path(`M0 ${HORIZON}Q34 ${HORIZON - 9} 66 ${HORIZON}T160 ${HORIZON - 4}V100H0Z`, "#eccf96") +
        path(`M0 ${HORIZON + 10}Q46 ${HORIZON + 2} 92 ${HORIZON + 12}T160 ${HORIZON + 8}V100H0Z`, g("g")) +
        path(`M20 ${HORIZON + 26}q22 -5 44 0M96 ${HORIZON + 34}q20 -4 40 0`, null, "#d9ae71", 1);
      return { defs, art, ground: HORIZON, shadow: "rgba(120,80,20,0.18)" };
    }

    if (name === "water") {
      defs = grad(id + "s", "#bfe9fb", "#eaf8ff") + grad(id + "w", "#63c3e8", "#2d8cc4");
      art =
        rect(0, 0, W, HORIZON + 2, g("s")) +
        skySun + puffs +
        rect(0, HORIZON, W, H - HORIZON, g("w")) +
        path(`M0 ${HORIZON}q10 -3 20 0t20 0t20 0t20 0t20 0t20 0t20 0t20 0`,
          "none", "#ffffff", 1.2) +
        path(`M14 ${HORIZON + 14}q8 -3 16 0M106 ${HORIZON + 20}q8 -3 16 0M58 ${HORIZON + 30}q8 -3 16 0`,
          null, "#cdeeff", 1.4);
      return { defs, art, ground: HORIZON + 10, shadow: "rgba(10,60,90,0.18)" };
    }

    if (name === "night") {
      defs = grad(id + "s", "#1d2f63", "#3f5a93") + grad(id + "g", "#3f6b47", "#2b4a33");
      art =
        rect(0, 0, W, HORIZON + 2, g("s")) +
        (o.hasMoon ? "" : circ(136, 16, 7, "#fdf6c8")) + stars(seed) +
        path(`M0 ${HORIZON}Q40 ${HORIZON - 16} 80 ${HORIZON}T160 ${HORIZON - 6}V100H0Z`, "#2f4f39") +
        rect(0, HORIZON + 6, W, H - HORIZON - 6, g("g")) +
        tufts(seed, "#4e8158");
      return { defs, art, ground: HORIZON + 6, shadow: "rgba(0,0,0,0.3)" };
    }

    if (name === "town") {
      defs = grad(id + "s", "#bfe6f7", "#f0faff") + grad(id + "g", "#9dd36d", "#72b94f");
      art =
        rect(0, 0, W, HORIZON + 2, g("s")) +
        skySun + puffs +
        /* a row of little rooftops along the horizon */
        `<g opacity="0.55">` +
        rect(8, HORIZON - 14, 16, 14, "#b6c3d4") +
        path(`M6 ${HORIZON - 14}l10 -8 10 8z`, "#8fa0b6") +
        rect(34, HORIZON - 10, 13, 10, "#c3cedd") +
        rect(120, HORIZON - 12, 15, 12, "#b6c3d4") +
        rect(140, HORIZON - 8, 12, 8, "#c3cedd") + `</g>` +
        rect(0, HORIZON, W, H - HORIZON, g("g")) +
        rect(0, HORIZON + 22, W, 9, "#b9b2a6") +
        path(`M8 ${HORIZON + 26.5}h14M34 ${HORIZON + 26.5}h14M60 ${HORIZON + 26.5}h14` +
             `M86 ${HORIZON + 26.5}h14M112 ${HORIZON + 26.5}h14M138 ${HORIZON + 26.5}h14`,
          null, "#ffffff", 1) +
        tufts(seed, "#5da348");
      return { defs, art, ground: HORIZON + 22, shadow: "rgba(40,60,20,0.18)" };
    }

    /* field — the everyday outdoor setting */
    defs = grad(id + "s", "#bfe6f7", "#f2fbff") + grad(id + "g", "#a3dc72", "#6fba4d");
    const treeRight = (seed % 2) === 0;
    art =
      rect(0, 0, W, HORIZON + 2, g("s")) +
      skySun + puffs +
      /* far hills */
      path(`M0 ${HORIZON}Q26 ${HORIZON - 14} 52 ${HORIZON}T104 ${HORIZON}T160 ${HORIZON - 8}V100H0Z`, "#8ccb6a") +
      rect(0, HORIZON + 4, W, H - HORIZON - 4, g("g")) +
      tree(treeRight ? 143 : 15, HORIZON + 13, 1.15) +
      bush(treeRight ? 13 : 148, HORIZON + 17, 1) +
      tufts(seed, "#5da348");
    return { defs, art, ground: HORIZON + 4, shadow: "rgba(40,60,20,0.18)" };
  }

  /* ------------------------------------------------------------- layouts */

  /* Where the characters stand. Big and low = close to you, small and high =
     further away. That is what makes it read as a scene and not a row. */
  const GROUND = {
    1: [{ cx: 80, s: 66, base: 97 }],
    2: [{ cx: 52, s: 60, base: 97 }, { cx: 116, s: 45, base: 84 }],
    3: [{ cx: 76, s: 58, base: 98 }, { cx: 24, s: 42, base: 88 },
        { cx: 132, s: 37, base: 80 }],
    4: [{ cx: 70, s: 54, base: 98 }, { cx: 20, s: 40, base: 90 },
        { cx: 118, s: 36, base: 82 }, { cx: 146, s: 28, base: 74 }]
  };

  const AIR = {
    1: [{ cx: 128, cy: 20, s: 30 }],
    2: [{ cx: 24, cy: 18, s: 27 }, { cx: 132, cy: 24, s: 24 }],
    3: [{ cx: 20, cy: 18, s: 25 }, { cx: 80, cy: 12, s: 22 },
        { cx: 136, cy: 24, s: 23 }]
  };

  /* When the whole page is sky things (a kite, an arrow, a music note) there
     is nobody on the grass, so they take the middle of the picture instead of
     hiding in the corners. */
  const AIR_ONLY = {
    1: [{ cx: 80, cy: 48, s: 58 }],
    2: [{ cx: 50, cy: 44, s: 48 }, { cx: 116, cy: 54, s: 40 }],
    3: [{ cx: 80, cy: 42, s: 48 }, { cx: 24, cy: 54, s: 34 },
        { cx: 136, cy: 58, s: 32 }]
  };

  function slots(table, n) {
    const row = table[Math.min(n, 4)] || table[Object.keys(table).length];
    if (row) return row.slice(0, n);
    /* more than the table covers: reuse the last one, shrinking */
    const last = table[Object.keys(table).pop()];
    return Array.from({ length: n }, (_, i) => last[i % last.length]);
  }

  function place(key, x, y, w, h) {
    const inner = typeof PIC !== "undefined" ? PIC[key] : null;
    if (!inner) return "";
    return `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" ` +
      `width="${w.toFixed(1)}" height="${h.toFixed(1)}" ` +
      `viewBox="0 0 100 100" overflow="visible">${inner}</svg>`;
  }

  /* ---------------------------------------------------------------- main */

  function storyScene(keys) {
    if (!keys || !keys.length) return null;
    if (typeof PIC === "undefined") return null;
    const known = keys.filter(k => PIC[k]);
    if (!known.length) return null;

    const id = "sc" + (uid++) + "-";
    const seed = seedOf(known);
    const name = settingFor(known);
    const SUNS = ["\u2600\uFE0F", "\u{1F31E}", "\u{1F307}"];
    const air = known.filter(k => SKY.has(k));
    const land = known.filter(k => !SKY.has(k));
    const airOnly = land.length === 0;

    /* Keep the scenery sun out of the way of anything flying. */
    const sunX = (airOnly || air.length >= 3) ? null : air.length === 2 ? 78 : undefined;

    const bg = background(name, seed, id, {
      hasSun: known.some(k => SUNS.includes(k) || k === "\u{1F319}"),
      hasMoon: known.includes("\u{1F319}"),
      sunX: sunX
    });

    let body = "";

    /* characters on the ground, furthest drawn first so near ones overlap */
    const gs = slots(GROUND, land.length);
    const placed = land.map((k, i) => {
      const slot = gs[i] || gs[gs.length - 1];
      const s = slot.s;
      const cx = slot.cx + wobble(seed, i, 3);
      const base = Math.max(slot.base, bg.ground + 12);
      return { k, s, x: cx - s / 2, y: base - s, base, cx };
    }).sort((a, b) => a.base - b.base);

    placed.forEach(it => {
      body += ell(it.cx, it.base - 1.5, it.s * 0.34, it.s * 0.075, bg.shadow);
      body += place(it.k, it.x, it.y, it.s, it.s);
    });

    /* characters in the sky */
    const as = slots(airOnly ? AIR_ONLY : AIR, air.length);
    air.forEach((k, i) => {
      const slot = as[i] || as[as.length - 1];
      const s = slot.s;
      body += place(k, slot.cx - s / 2 + wobble(seed, i + 9, 4), slot.cy - s / 2, s, s);
    });

    return `<svg class="scene-art" viewBox="0 0 ${W} ${H}" ` +
      `xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" ` +
      `aria-hidden="true" focusable="false">` +
      `<defs>${bg.defs}</defs>` +
      `<g>${bg.art}</g><g>${body}</g></svg>`;
  }

  return { storyScene, settingFor };
})();

const storyScene = SCENE.storyScene;

if (typeof module !== "undefined") { module.exports = SCENE; }
