/* art.js — hand-drawn cartoon pictures for the stories.
 *
 * Every picture is a small SVG drawn on a 100x100 square with bold dark
 * outlines and flat colours, so it looks like classroom clipart and stays
 * sharp on any size screen.
 *
 * The map is keyed by the emoji used in alphabet.js, so content stays
 * readable for a teacher editing the stories. If a key is missing the app
 * simply falls back to showing the emoji itself.
 *
 * To change a picture, edit its entry below. To add one, add a key.
 */

const ART = (function () {
  const K = "#33302e"; /* outline colour for everything */

  const P = {
    skin: "#ffcfa3", skin2: "#e0a473",
    hairB: "#5a3d28", hairY: "#f0c54e", hairG: "#d6d3cf",
    white: "#ffffff", cream: "#faf1dd", grey: "#c3c7cb", grey2: "#8d9298",
    black: "#4a4a4a", red: "#e85442", pink: "#f58cb0", orange: "#f49a3c",
    yellow: "#f9d64a", green: "#63b65c", green2: "#3f8f4a", teal: "#45b5a6",
    blue: "#5a9fe0", navy: "#33639c", purple: "#9272c9", brown: "#a3703f",
    brown2: "#7a5230", sand: "#f0d9a0", stone: "#a9a49d", water: "#73c8ea",
    gold: "#f2c23e"
  };
  P.gold = "#f2c23e";

  function st(w) {
    return 'stroke="' + K + '" stroke-width="' + (w || 3.2) +
      '" stroke-linecap="round" stroke-linejoin="round"';
  }
  function F(c, w) { return 'fill="' + c + '" ' + st(w); }
  function N(w) { return 'fill="none" ' + st(w); }

  function c(cx, cy, r, col, w) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" ' + F(col, w) + '/>';
  }
  function e(cx, cy, rx, ry, col, w) {
    return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" ' + F(col, w) + '/>';
  }
  function r(x, y, w2, h, col, rad, w) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w2 + '" height="' + h +
      '" rx="' + (rad || 0) + '" ' + F(col, w) + '/>';
  }
  function p(d, col, w) { return '<path d="' + d + '" ' + F(col, w) + '/>'; }
  function l(d, w, col) {
    return '<path d="' + d + '" fill="none" stroke="' + (col || K) +
      '" stroke-width="' + (w || 3.2) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  function dot(cx, cy, rr) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + (rr || 3) + '" fill="' + K + '"/>';
  }
  function txt(x, y, s, size, col) {
    return '<text x="' + x + '" y="' + y + '" font-family="Verdana,Segoe UI,sans-serif" ' +
      'font-weight="700" font-size="' + size + '" fill="' + (col || K) +
      '" text-anchor="middle" dominant-baseline="central">' + s + '</text>';
  }

  /* ---- shared face parts ---- */
  function eyes2(cx, cy, dx, rr) {
    return dot(cx - dx, cy, rr || 3.2) + dot(cx + dx, cy, rr || 3.2);
  }
  function eyesArc(cx, cy, dx, w2) {
    w2 = w2 || 7;
    return l('M' + (cx - dx - w2 / 2) + ' ' + cy + ' Q' + (cx - dx) + ' ' + (cy - 6) + ' ' + (cx - dx + w2 / 2) + ' ' + cy, 3) +
      l('M' + (cx + dx - w2 / 2) + ' ' + cy + ' Q' + (cx + dx) + ' ' + (cy - 6) + ' ' + (cx + dx + w2 / 2) + ' ' + cy, 3);
  }
  function eyesShut(cx, cy, dx, w2) {
    w2 = w2 || 7;
    return l('M' + (cx - dx - w2 / 2) + ' ' + cy + ' Q' + (cx - dx) + ' ' + (cy + 5) + ' ' + (cx - dx + w2 / 2) + ' ' + cy, 3) +
      l('M' + (cx + dx - w2 / 2) + ' ' + cy + ' Q' + (cx + dx) + ' ' + (cy + 5) + ' ' + (cx + dx + w2 / 2) + ' ' + cy, 3);
  }
  function smile(cx, cy, w2, d) {
    return l('M' + (cx - w2) + ' ' + cy + ' Q' + cx + ' ' + (cy + (d || w2 * 0.9)) + ' ' + (cx + w2) + ' ' + cy, 3);
  }
  function frown(cx, cy, w2, d) {
    return l('M' + (cx - w2) + ' ' + cy + ' Q' + cx + ' ' + (cy - (d || w2 * 0.9)) + ' ' + (cx + w2) + ' ' + cy, 3);
  }
  function mouthO(cx, cy, rx, ry) {
    return e(cx, cy, rx, ry, "#8c4a44", 2.6);
  }
  function cheeks(cx, cy, dx) {
    return '<circle cx="' + (cx - dx) + '" cy="' + cy + '" r="5" fill="#f08b8b" opacity="0.65"/>' +
      '<circle cx="' + (cx + dx) + '" cy="' + cy + '" r="5" fill="#f08b8b" opacity="0.65"/>';
  }

  /* A yellow smiley face, used for the feelings pictures. */
  function faceBase() { return c(50, 50, 37, P.yellow); }

  /* ---- shared person parts ----
     Head sits at (50,38) r22, body fills the bottom of the square. */
  function torso(col) {
    return p("M25 99 C25 73 35 62 50 62 C65 62 75 73 75 99 Z", col);
  }
  function neck() { return r(44, 54, 12, 10, P.skin, 3); }
  function head(skin) { return c(50, 38, 22, skin || P.skin); }
  function hairCap(col) {
    return p("M28 42 Q28 15 50 15 Q72 15 72 42 Q65 29 50 29 Q35 29 28 42 Z", col);
  }

  const ART = {};

  return { ART: ART, P: P, K: K, h: {
    c: c, e: e, r: r, p: p, l: l, dot: dot, txt: txt, F: F, N: N, st: st,
    eyes2: eyes2, eyesArc: eyesArc, eyesShut: eyesShut, smile: smile,
    frown: frown, mouthO: mouthO, cheeks: cheeks, faceBase: faceBase,
    torso: torso, neck: neck, head: head, hairCap: hairCap
  } };
})();

/* Unpack the helpers so the picture list below stays short and readable. */
const APAL = ART.P, AK = ART.K;
const { c, e, r, p, l, dot, txt, F, N, st, eyes2, eyesArc, eyesShut, smile,
  frown, mouthO, cheeks, faceBase, torso, neck, head, hairCap } = ART.h;
const PIC = ART.ART;

/* ===================== people ===================== */
Object.assign(PIC, {
  "\u{1F467}": /* girl */
    c(24, 48, 9, APAL.hairB) + c(76, 48, 9, APAL.hairB) +
    torso(APAL.pink) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 38, 8) + smile(50, 46, 8) + cheeks(50, 44, 16),

  "\u{1F466}": /* boy */
    torso(APAL.blue) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 38, 8) + smile(50, 46, 8),

  "\u{1F474}": /* grandad */
    torso(APAL.green) + neck() + head() +
    p("M28 44 Q24 20 40 20 Q34 30 34 44 Z", APAL.hairG) +
    p("M72 44 Q76 20 60 20 Q66 30 66 44 Z", APAL.hairG) +
    l("M34 22 Q50 14 66 22", 3, APAL.hairG) +
    c(40, 38, 9, "none", 2.6) + c(60, 38, 9, "none", 2.6) + l("M49 38 L51 38", 2.6) +
    dot(40, 38, 3) + dot(60, 38, 3) +
    p("M36 50 Q50 45 64 50 Q50 58 36 50 Z", APAL.white, 2.4) +
    smile(50, 58, 6, 4),

  "\u{1F475}": /* grandma */
    c(50, 16, 10, APAL.hairG) +
    torso(APAL.purple) + neck() + head() + hairCap(APAL.hairG) +
    eyes2(50, 38, 8) + smile(50, 46, 8) + cheeks(50, 44, 16),

  "\u{1F469}": /* mum */
    p("M26 44 Q26 15 50 15 Q74 15 74 44 L74 70 L64 70 Q68 40 50 40 Q32 40 36 70 L26 70 Z", APAL.hairB) +
    torso(APAL.red) + neck() + head() +
    p("M30 40 Q30 18 50 18 Q70 18 70 40 Q63 30 50 30 Q37 30 30 40 Z", APAL.hairB) +
    eyes2(50, 38, 8) + smile(50, 46, 8),

  "\u{1F478}": /* queen */
    torso(APAL.purple) + neck() + head() + hairCap(APAL.hairY) +
    p("M30 20 L34 8 L42 16 L50 4 L58 16 L66 8 L70 20 Z", APAL.gold) +
    eyes2(50, 39, 8) + smile(50, 47, 7),

  "\u{1F9D1}\u200D\u{1F4BC}": /* shopkeeper */
    torso(APAL.navy) + neck() + head() + hairCap(APAL.hairB) +
    p("M42 62 L50 72 L58 62 L50 66 Z", APAL.white, 2.4) +
    p("M48 70 L52 70 L54 88 L46 88 Z", APAL.red, 2.4) +
    eyes2(50, 38, 8) + smile(50, 46, 7),

  "\u{1F3C3}": /* running */
    c(62, 20, 12, APAL.skin) + eyes2(64, 19, 4, 2.6) +
    p("M38 76 L52 40 L66 44 L58 70 Z", APAL.red) +
    l("M52 46 L30 36", 6) + l("M64 46 L84 56", 6) +
    l("M46 70 L28 86", 6) + l("M56 72 L70 90", 6),

  "\u{1F6B6}": /* walking */
    c(50, 18, 12, APAL.skin) + eyes2(52, 17, 4, 2.6) +
    p("M40 70 L44 36 L60 36 L62 70 Z", APAL.teal) +
    l("M44 44 L32 60", 6) + l("M60 44 L72 58", 6) +
    l("M46 68 L36 90", 6) + l("M58 68 L66 90", 6),

  "\u{1F937}": /* shrug */
    torso(APAL.orange) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 38, 8) + l("M40 28 Q44 24 48 27", 2.6) + l("M52 27 Q56 24 60 28", 2.6) +
    l("M42 48 Q50 44 58 48", 3) +
    l("M28 74 L14 64", 5) + l("M72 74 L86 64", 5) +
    p("M6 62 Q10 56 16 60 Q12 66 6 62 Z", APAL.skin, 2.4) +
    p("M94 62 Q90 56 84 60 Q88 66 94 62 Z", APAL.skin, 2.4),

  "\u{1F44B}": /* waving hand */
    r(33, 22, 10, 36, APAL.skin, 5) + r(45, 16, 10, 42, APAL.skin, 5) +
    r(57, 20, 10, 38, APAL.skin, 5) + r(69, 28, 10, 30, APAL.skin, 5) +
    p("M31 46 L80 46 L80 68 Q80 92 55 92 Q31 92 31 68 Z", APAL.skin) +
    p("M32 56 L18 66 Q11 72 17 79 Q24 86 32 78 Z", APAL.skin) +
    l("M88 20 Q95 32 92 44", 3) + l("M14 20 Q7 32 10 44", 3),

  "\u{1F44D}": /* thumbs up */
    p("M34 94 L34 50 Q34 42 42 42 L56 42 L50 22 Q48 12 58 12 Q64 12 66 20 L70 42 L80 42 Q88 42 88 50 L88 86 Q88 94 80 94 Z", APAL.skin) +
    r(12, 44, 20, 50, APAL.blue, 5) +
    l("M46 56 L80 56", 2.4),

  "\u{1F440}": /* eyes */
    e(28, 50, 22, 15, APAL.white) + e(72, 50, 22, 15, APAL.white) +
    c(30, 50, 9, APAL.blue, 2.6) + c(70, 50, 9, APAL.blue, 2.6) +
    dot(30, 50, 4.5) + dot(70, 50, 4.5) +
    '<circle cx="27" cy="46" r="2.4" fill="#fff"/><circle cx="67" cy="46" r="2.4" fill="#fff"/>',

  "\u{1F443}": /* nose */
    p("M42 14 Q50 8 58 14 L61 54 L39 54 Z", APAL.skin) +
    e(50, 66, 17, 15, APAL.skin) +
    e(39, 72, 5, 3.6, "#c98a58", 2.2) + e(61, 72, 5, 3.6, "#c98a58", 2.2) +
    l("M44 30 Q42 44 40 56", 2.2, "#e0a473"),

  "\u{1F463}": /* footprints */
    e(30, 60, 13, 20, APAL.navy) +
    c(20, 36, 5, APAL.navy, 2.4) + c(31, 32, 5, APAL.navy, 2.4) + c(41, 35, 4.5, APAL.navy, 2.4) +
    e(72, 74, 11, 17, APAL.navy) +
    c(63, 54, 4.5, APAL.navy, 2.4) + c(73, 51, 4.5, APAL.navy, 2.4) + c(82, 54, 4, APAL.navy, 2.4),

  "\u{1F915}": /* head bandage */
    torso(APAL.blue) + neck() + head() + hairCap(APAL.hairB) +
    p("M27 28 L73 21 L75 33 L29 40 Z", APAL.white, 2.6) +
    l("M40 25 L42 38", 2.2) + l("M56 22 L58 35", 2.2) +
    dot(41, 47, 3.2) + dot(59, 47, 3.2) + frown(50, 56, 7, 4),

  "\u{1F92B}": /* shush */
    torso(APAL.purple) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 32, 9) + e(50, 44, 5.5, 4, "#8c4a44", 2.4) +
    r(46, 39, 8, 17, APAL.skin, 4) +
    e(50, 61, 11, 8, APAL.skin)
});

/* ===================== feelings ===================== */
Object.assign(PIC, {
  "\u{1F602}": faceBase() + eyesArc(50, 44, 15, 11) + p("M30 56 Q50 80 70 56 Z", "#8c4a44", 2.8) +
    l("M22 48 L14 58", 3.2, APAL.water) + l("M78 48 L86 58", 3.2, APAL.water),
  "\u{1F604}": faceBase() + eyesArc(50, 42, 14, 11) + p("M30 54 Q50 78 70 54 Z", "#8c4a44", 2.8),
  "\u{1F601}": faceBase() + eyesArc(50, 42, 14, 11) +
    r(30, 54, 40, 18, APAL.white, 8) + l("M30 62 L70 62", 2.6),
  "\u{1F60A}": faceBase() + eyesArc(50, 44, 14, 11) + smile(50, 60, 12, 10) + cheeks(50, 58, 24),
  "\u{1F60B}": faceBase() + eyesArc(50, 42, 14, 11) + smile(50, 56, 12, 8) +
    p("M44 62 Q50 76 58 64 Q52 62 44 62 Z", APAL.pink, 2.6),
  "\u{1F632}": faceBase() + c(38, 44, 6, APAL.white, 2.6) + c(62, 44, 6, APAL.white, 2.6) +
    dot(38, 44, 3) + dot(62, 44, 3) + e(50, 66, 8, 11, "#8c4a44", 2.8),
  "\u{1F616}": faceBase() + l("M32 40 L44 46", 3) + l("M68 40 L56 46", 3) +
    eyesShut(50, 50, 12, 9) +
    l("M34 66 Q42 58 50 66 Q58 74 66 66", 3),
  "\u{1F615}": faceBase() + eyes2(50, 44, 13, 3.4) +
    l("M34 66 Q46 58 66 64", 3),
  "\u{1F634}": faceBase() + eyesShut(50, 46, 14, 10) + e(50, 64, 6, 5, "#8c4a44", 2.6) +
    txt(80, 24, "z", 18) + txt(92, 12, "z", 13),
  "\u{1F63F}": /* sad cat */
    p("M24 36 L22 12 L40 24 Z", APAL.grey) + p("M76 36 L78 12 L60 24 Z", APAL.grey) +
    c(50, 54, 32, APAL.grey) + eyesShut(50, 48, 12, 10) +
    p("M46 58 L54 58 L50 64 Z", APAL.pink, 2.2) + frown(50, 74, 8, 5) +
    l("M34 62 L16 58", 2.4) + l("M66 62 L84 58", 2.4) +
    p("M38 56 Q34 64 38 70 Q42 64 38 56 Z", APAL.water, 2)
});

/* ===================== animals ===================== */
Object.assign(PIC, {
  "\u{1F41C}": /* ant */
    l("M30 44 L20 26", 2.4) + l("M40 44 L48 24", 2.4) +
    l("M46 56 L36 78", 2.6) + l("M56 56 L58 80", 2.6) + l("M66 58 L78 78", 2.6) +
    l("M46 48 L34 32", 2.6) + l("M58 48 L70 34", 2.6) +
    e(74, 54, 16, 14, APAL.black) + e(48, 54, 12, 11, APAL.black) +
    c(26, 50, 12, APAL.black) + dot(22, 46, 2.6) + dot(31, 46, 2.6),

  "\u{1F431}": /* cat */
    p("M26 36 L24 10 L44 24 Z", APAL.orange) + p("M74 36 L76 10 L56 24 Z", APAL.orange) +
    c(50, 54, 32, APAL.orange) + eyes2(50, 48, 12, 4) +
    p("M45 58 L55 58 L50 64 Z", APAL.pink, 2.2) +
    l("M50 64 Q44 71 39 66", 2.6) + l("M50 64 Q56 71 61 66", 2.6) +
    l("M32 60 L14 56", 2.4) + l("M32 66 L14 68", 2.4) +
    l("M68 60 L86 56", 2.4) + l("M68 66 L86 68", 2.4),

  "\u{1F408}": /* kitten */
    p("M30 44 L28 22 L45 34 Z", APAL.grey) + p("M70 44 L72 22 L55 34 Z", APAL.grey) +
    c(50, 58, 27, APAL.grey) + eyes2(50, 54, 10, 3.6) +
    p("M46 61 L54 61 L50 66 Z", APAL.pink, 2) + smile(50, 70, 6, 4) +
    l("M34 64 L18 61", 2.2) + l("M66 64 L82 61", 2.2),

  "\u{1F436}": /* dog */
    e(16, 52, 9, 20, APAL.brown2) + e(84, 52, 9, 20, APAL.brown2) +
    c(50, 50, 30, APAL.brown) + eyes2(50, 44, 11, 3.6) +
    e(50, 70, 17, 13, APAL.cream) + e(50, 62, 7, 5.5, APAL.black, 2.4) +
    l("M50 68 L50 74", 2.4) + smile(43, 74, 5, 4) + smile(57, 74, 5, 4),

  "\u{1F418}": /* elephant */
    e(20, 44, 15, 20, APAL.grey2) + e(80, 44, 15, 20, APAL.grey2) +
    c(50, 46, 28, APAL.grey) +
    p("M41 66 Q33 92 52 96 Q42 86 50 68 Z", APAL.grey) +
    eyes2(50, 42, 11, 3.6) +
    l("M44 90 Q56 94 62 88", 2.4),

  "\u{1F41F}": /* fish */
    p("M74 50 L96 32 L96 68 Z", APAL.orange) +
    e(46, 50, 30, 21, APAL.orange) +
    p("M44 29 L54 20 L56 32 Z", APAL.orange, 2.4) +
    dot(30, 44, 4) + smile(26, 54, 5, 4) +
    l("M58 40 Q64 50 58 60", 2.4),

  "\u{1F410}": /* goat */
    l("M36 24 Q16 14 26 2", 5) + l("M64 24 Q84 14 74 2", 5) +
    e(18, 46, 11, 7, APAL.cream) + e(82, 46, 11, 7, APAL.cream) +
    p("M30 34 Q50 24 70 34 Q72 62 50 76 Q28 62 30 34 Z", APAL.cream) +
    eyes2(50, 46, 11, 3.6) +
    e(50, 64, 10, 7, "#efe2c8", 2.4) + dot(46, 63, 2.2) + dot(54, 63, 2.2) +
    p("M43 76 Q50 96 57 76 Z", APAL.cream, 2.6),

  "\u{1F414}": /* hen */
    p("M22 62 L6 46 L10 70 L4 80 Z", APAL.cream, 2.6) +
    e(46, 62, 28, 24, APAL.white) +
    c(70, 36, 16, APAL.white) +
    p("M60 22 Q64 12 68 22 Q72 12 76 22 Q80 14 82 24 Z", APAL.red, 2.4) +
    p("M84 36 L96 40 L84 44 Z", APAL.orange, 2.4) +
    p("M64 50 Q70 56 76 50 Z", APAL.red, 2.2) +
    dot(72, 33, 3.2) + l("M38 58 Q46 70 56 58", 2.4),

  "\u{1F41B}": /* bug */
    l("M26 44 L18 30", 2.4) + l("M36 40 L34 26", 2.4) +
    c(78, 62, 15, APAL.green) + c(58, 56, 16, APAL.green) +
    c(38, 52, 15, APAL.green) + c(22, 48, 14, APAL.green2) +
    dot(17, 44, 2.8) + dot(26, 43, 2.8) + smile(21, 52, 5, 4),

  "\u{1F998}": /* kangaroo */
    p("M26 94 Q6 86 22 72 Q34 62 46 66 Z", APAL.brown) +
    p("M38 94 L38 66 Q38 48 58 48 Q76 48 76 68 L76 94 L62 94 L62 72 L52 72 L52 94 Z", APAL.brown) +
    c(70, 30, 16, APAL.brown) +
    e(62, 12, 5, 11, APAL.brown2) + e(78, 12, 5, 11, APAL.brown2) +
    dot(66, 28, 3) + dot(78, 28, 3) + e(80, 38, 6, 4, APAL.brown2, 2.2) +
    e(50, 76, 10, 8, APAL.sand, 2.4),

  "\u{1F435}": /* monkey */
    c(18, 46, 11, APAL.brown) + c(82, 46, 11, APAL.brown) +
    c(50, 46, 28, APAL.brown) +
    e(50, 58, 20, 16, APAL.sand) +
    eyes2(50, 40, 11, 4) + dot(45, 54, 2.4) + dot(55, 54, 2.4) +
    smile(50, 62, 9, 7),

  "\u{1F423}": /* chick */
    c(50, 62, 27, APAL.yellow) + c(48, 32, 19, APAL.yellow) +
    p("M64 30 L84 37 L64 44 Z", APAL.orange, 2.4) +
    dot(44, 28, 3.4) + l("M38 18 Q42 12 46 16", 2.4) +
    l("M40 88 L36 96", 3, APAL.orange) + l("M60 88 L64 96", 3, APAL.orange),

  "\u{1F426}": /* bird */
    p("M22 58 L4 48 L8 66 Z", APAL.navy, 2.4) +
    e(46, 58, 26, 20, APAL.blue) + c(70, 38, 15, APAL.blue) +
    p("M82 36 L96 41 L82 46 Z", APAL.orange, 2.4) +
    dot(72, 34, 3.2) + e(46, 60, 14, 9, APAL.navy, 2.4),

  "\u{1F419}": /* octopus */
    l("M26 60 Q16 80 24 94", 7, APAL.purple) + l("M40 66 Q34 86 40 96", 7, APAL.purple) +
    l("M60 66 Q66 86 60 96", 7, APAL.purple) + l("M74 60 Q84 80 76 94", 7, APAL.purple) +
    e(50, 44, 30, 28, APAL.purple) +
    c(40, 42, 8, APAL.white, 2.4) + c(60, 42, 8, APAL.white, 2.4) +
    dot(41, 43, 4) + dot(61, 43, 4) + smile(50, 58, 8, 6),

  "\u{1F437}": /* pig */
    p("M26 34 L22 14 L42 24 Z", APAL.pink) + p("M74 34 L78 14 L58 24 Z", APAL.pink) +
    c(50, 54, 31, APAL.pink) + eyes2(50, 46, 12, 3.6) +
    e(50, 64, 16, 12, "#f2a7c0") + dot(45, 64, 2.8) + dot(55, 64, 2.8),

  "\u{1F986}": /* duck */
    e(44, 62, 29, 22, APAL.yellow) + c(70, 34, 16, APAL.yellow) +
    p("M84 32 L98 38 L84 44 Z", APAL.orange, 2.4) +
    dot(72, 30, 3.2) + e(44, 64, 16, 10, "#e8c23a", 2.4) +
    l("M38 84 L34 94", 3, APAL.orange) + l("M54 84 L58 94", 3, APAL.orange),

  "\u{1F40D}": /* snake */
    l("M14 86 Q46 86 44 64 Q42 44 62 42 Q82 40 80 24", 13, APAL.green) +
    c(80, 20, 12, APAL.green2) + dot(77, 17, 3) + dot(85, 18, 3) +
    l("M80 8 L80 2", 2.6, APAL.red) +
    l("M76 2 L80 6 L84 2", 2.6, APAL.red),

  "\u{1F422}": /* turtle */
    e(22, 68, 11, 9, APAL.green) + e(78, 68, 11, 9, APAL.green) +
    c(66, 44, 14, APAL.green) + dot(72, 41, 3) +
    p("M14 66 Q22 28 50 28 Q78 28 86 66 Z", APAL.green2) +
    l("M50 28 L50 66", 2.4) + l("M30 44 L70 44", 2.4),

  "\u{1F98A}": /* fox */
    p("M24 40 L18 10 L42 26 Z", APAL.orange) + p("M76 40 L82 10 L58 26 Z", APAL.orange) +
    p("M18 38 Q50 26 82 38 Q74 72 50 86 Q26 72 18 38 Z", APAL.orange) +
    p("M34 62 Q50 54 66 62 Q60 82 50 86 Q40 82 34 62 Z", APAL.white, 2.4) +
    eyes2(50, 50, 13, 3.6) + e(50, 68, 6, 4.5, APAL.black, 2.2),

  "\u{1F993}": /* zebra */
    e(28, 26, 7, 11, APAL.white) + e(72, 26, 7, 11, APAL.white) +
    p("M30 40 Q50 26 70 40 Q72 72 50 88 Q28 72 30 40 Z", APAL.white) +
    l("M38 36 L42 52", 4) + l("M50 32 L50 50", 4) + l("M62 36 L58 52", 4) +
    eyes2(50, 60, 12, 3.4) + e(50, 78, 10, 7, APAL.grey, 2.4) +
    dot(46, 77, 2.2) + dot(54, 77, 2.2),

  "\u{1F41D}": /* bee */
    e(38, 32, 14, 10, APAL.white, 2.4) + e(62, 32, 14, 10, APAL.white, 2.4) +
    e(50, 60, 28, 22, APAL.yellow) +
    p("M40 40 Q50 38 44 80 Q36 72 40 40 Z", APAL.black, 2) +
    p("M62 40 Q70 48 60 80 Q54 72 62 40 Z", APAL.black, 2) +
    l("M22 42 L16 30", 2.4) + l("M30 38 L28 26", 2.4) +
    dot(26, 54, 3),

  "\u{1F411}": /* sheep */
    l("M34 82 L32 96", 3.4) + l("M60 82 L62 96", 3.4) +
    c(36, 56, 20, APAL.white) + c(60, 50, 22, APAL.white) +
    c(54, 72, 19, APAL.white) + c(30, 72, 16, APAL.white) +
    e(78, 58, 9, 7, APAL.grey2, 2.4) + e(94, 56, 6, 5, APAL.grey2, 2.4) +
    c(84, 66, 15, APAL.black) +
    '<circle cx="79" cy="63" r="2.6" fill="#fff"/><circle cx="89" cy="63" r="2.6" fill="#fff"/>',

  "\u{1F433}": /* whale */
    p("M10 58 Q10 30 44 30 Q78 30 84 58 Q78 82 44 82 Q10 82 10 58 Z", APAL.blue) +
    p("M84 58 L98 40 L96 76 Z", APAL.blue, 2.6) +
    l("M34 24 Q30 10 22 6", 3, APAL.water) + l("M40 24 Q44 10 52 8", 3, APAL.water) +
    dot(28, 52, 3.6) + smile(26, 62, 6, 5) +
    l("M16 68 Q40 76 70 70", 2.4)
});

/* ===================== things, food, nature, symbols ===================== */
function numTile(n, col) {
  return r(14, 14, 72, 72, col, 16) + txt(50, 53, n, 42, "#ffffff");
}
function arrow(rot, col) {
  return '<g transform="rotate(' + rot + ' 50 50)">' +
    p("M12 38 L58 38 L58 20 L90 50 L58 80 L58 62 L12 62 Z", col) + "</g>";
}
function noteShape(x, y, s2) {
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s2 + ')">' +
    e(0, 30, 13, 10, APAL.navy) + l("M13 30 L13 -30", 4.5) +
    p("M13 -30 Q30 -24 30 -8 Q26 -20 13 -18 Z", APAL.navy, 2.4) + "</g>";
}

Object.assign(PIC, {
  "\u{1FAD9}": /* jar */
    r(32, 10, 36, 12, APAL.grey, 4) +
    p("M28 24 L72 24 L74 86 Q74 94 66 94 L34 94 Q26 94 26 86 Z", "#dff0f5") +
    l("M38 40 Q38 34 46 34", 2.6, "#ffffff"),

  "\u{1F34E}": /* apple */
    l("M50 22 L50 8", 3.4, APAL.brown2) +
    p("M52 14 Q68 2 76 14 Q62 22 52 16 Z", APAL.green, 2.4) +
    p("M50 26 Q32 18 20 36 Q8 58 24 82 Q36 96 50 86 Q64 96 76 82 Q92 58 80 36 Q68 18 50 26 Z", APAL.red) +
    l("M34 42 Q26 50 28 62", 2.6, "#ffffff"),

  "\u{1F389}": /* party popper */
    p("M8 92 L40 34 L66 60 Z", APAL.red) +
    c(70, 24, 5, APAL.yellow, 2.2) + c(86, 40, 5, APAL.blue, 2.2) +
    c(56, 14, 5, APAL.green, 2.2) + c(88, 16, 5, APAL.purple, 2.2) +
    l("M62 42 L80 30", 2.6) + l("M56 24 L60 34", 2.6),

  "\u26BD": /* ball */
    c(50, 50, 38, APAL.white) +
    p("M50 26 L66 38 L60 58 L40 58 L34 38 Z", APAL.black, 2.4) +
    l("M50 26 L50 12", 2.4) + l("M66 38 L80 30", 2.4) + l("M34 38 L20 30", 2.4) +
    l("M60 58 L68 76", 2.4) + l("M40 58 L32 76", 2.4),

  "\u{1F6CF}\uFE0F": /* bed */
    r(8, 40, 14, 48, APAL.brown2, 4) + r(78, 52, 14, 36, APAL.brown2, 4) +
    r(18, 56, 70, 24, APAL.white, 6) +
    p("M44 56 L88 56 L88 80 L44 80 Z", APAL.blue, 2.6) +
    e(32, 60, 13, 8, "#eef3f8", 2.4),

  "\u{1F4E6}": /* box */
    p("M14 36 L50 20 L86 36 L50 52 Z", "#d9a86a") +
    p("M14 36 L50 52 L50 90 L14 72 Z", APAL.brown) +
    p("M86 36 L50 52 L50 90 L86 72 Z", "#8a5c33") +
    l("M50 52 L50 90", 2.6),

  "\u{1F518}": /* button */
    c(50, 50, 34, APAL.red) + c(50, 50, 25, "#c9412f", 2.4) +
    dot(41, 44, 5) + dot(59, 44, 5) + dot(41, 58, 5) + dot(59, 58, 5),

  "\u{1F5C4}\uFE0F": /* cupboard */
    r(12, 10, 76, 80, APAL.brown, 5) +
    l("M50 10 L50 90", 2.8) +
    l("M20 48 L80 48", 2.8) +
    c(44, 30, 3.4, APAL.gold, 2) + c(56, 30, 3.4, APAL.gold, 2) +
    c(44, 68, 3.4, APAL.gold, 2) + c(56, 68, 3.4, APAL.gold, 2),

  "\u{1F9C1}": /* cupcake */
    p("M24 48 L76 48 L68 90 Q68 94 62 94 L38 94 Q32 94 32 90 Z", "#e6b06a") +
    l("M38 52 L34 90", 2.2) + l("M50 52 L50 90", 2.2) + l("M62 52 L66 90", 2.2) +
    p("M22 48 Q22 30 36 28 Q40 14 54 18 Q70 14 72 30 Q84 34 78 48 Z", APAL.pink) +
    c(44, 32, 3, APAL.red, 1.8) + c(62, 36, 3, APAL.blue, 1.8) + c(52, 26, 3, APAL.yellow, 1.8),

  "\u27A1\uFE0F": arrow(0, APAL.blue),
  "\u2B06\uFE0F": arrow(-90, APAL.green),
  "\u2B07\uFE0F": arrow(90, APAL.brown),

  "\u26CF\uFE0F": /* digging */
    l("M70 30 L26 86", 7, APAL.brown2) +
    p("M46 10 Q74 6 90 26 Q72 22 62 32 Q54 18 46 10 Z", APAL.grey2) +
    c(20, 90, 7, APAL.sand, 2.4) + c(34, 92, 6, APAL.sand, 2.4),

  "\u{1F941}": /* drum */
    p("M18 32 Q50 20 82 32 L82 68 Q50 82 18 68 Z", APAL.red) +
    e(50, 32, 32, 12, "#f2dfc0") +
    l("M22 36 L34 64", 2.4) + l("M50 38 L50 68", 2.4) + l("M78 36 L66 64", 2.4) +
    l("M34 22 L10 4", 3.4, APAL.brown2) + c(8, 4, 5, APAL.cream, 2.2) +
    l("M66 22 L90 4", 3.4, APAL.brown2) + c(92, 4, 5, APAL.cream, 2.2),

  "\u{1F95A}": /* egg */
    p("M50 8 Q76 30 76 62 Q76 92 50 92 Q24 92 24 62 Q24 30 50 8 Z", APAL.cream) +
    l("M36 40 Q34 54 38 64", 2.4, "#e6d7b4"),

  "\u{1F4A5}": /* bang */
    p("M50 2 L60 26 L84 16 L74 40 L98 50 L74 60 L84 84 L60 74 L50 98 L40 74 L16 84 L26 60 L2 50 L26 40 L16 16 L40 26 Z", APAL.orange) +
    p("M50 24 L57 40 L73 50 L57 60 L50 76 L43 60 L27 50 L43 40 Z", APAL.yellow, 2.4),

  "\u{1F373}": /* fried egg */
    p("M20 44 Q14 22 38 18 Q54 6 68 20 Q92 22 86 46 Q94 68 70 76 Q54 92 36 76 Q12 70 20 44 Z", APAL.white) +
    c(52, 50, 17, APAL.yellow) +
    '<circle cx="46" cy="44" r="4" fill="#fff" opacity="0.6"/>',

  "\u{1F30A}": /* wave */
    p("M4 56 Q18 30 40 42 Q62 54 74 34 Q86 16 96 28 L96 92 L4 92 Z", APAL.water) +
    l("M10 70 Q30 62 50 70 Q70 78 90 70", 3, "#ffffff") +
    l("M10 84 Q30 76 50 84 Q70 92 90 84", 3, "#ffffff"),

  "\u{1F6A9}": /* flag */
    l("M24 94 L24 8", 4.4, APAL.brown2) +
    p("M26 12 Q48 2 70 12 Q86 20 86 40 Q62 52 44 42 Q34 36 26 44 Z", APAL.red),

  "\u{1F374}": /* fork */
    l("M34 26 L34 46", 3.4) + l("M44 26 L44 46", 3.4) + l("M54 26 L54 46", 3.4) +
    p("M30 44 L58 44 Q58 58 48 60 L48 94 L40 94 L40 60 Q30 58 30 44 Z", APAL.grey) +
    r(66, 24, 10, 70, APAL.grey, 5),

  "\u{1F4A8}": /* dash */
    l("M12 34 L68 34", 8, APAL.grey2) + l("M30 52 L86 52", 8, APAL.grey2) +
    l("M16 70 L62 70", 8, APAL.grey2),

  "\u{1F337}": /* tulip */
    l("M50 58 L50 94", 4, APAL.green2) +
    p("M50 72 Q28 62 22 44 Q44 44 50 66 Z", APAL.green, 2.4) +
    p("M50 72 Q72 66 80 50 Q58 48 50 68 Z", APAL.green, 2.4) +
    p("M28 28 Q28 54 50 60 Q72 54 72 28 Q62 40 62 24 Q56 38 50 20 Q44 38 38 24 Q38 40 28 28 Z", APAL.pink),

  "\u{1F331}": /* seedling */
    p("M12 88 Q24 78 50 78 Q76 78 88 88 Z", APAL.brown) +
    l("M50 80 L50 40", 4, APAL.green2) +
    p("M50 52 Q28 50 24 30 Q48 30 50 50 Z", APAL.green, 2.4) +
    p("M50 46 Q72 42 76 22 Q52 24 50 44 Z", APAL.green, 2.4),

  "\u{1F6AA}": /* door */
    r(20, 8, 60, 86, APAL.brown, 5) +
    r(28, 16, 44, 70, "#8a5c33", 4, 2.6) +
    c(66, 54, 4.5, APAL.gold, 2.2),

  "\u26F0\uFE0F": /* hill */
    p("M2 90 Q26 40 46 90 Z", APAL.green2) +
    p("M30 90 L62 26 L94 90 Z", APAL.stone) +
    p("M62 26 L76 54 Q62 46 48 54 Z", APAL.white, 2.4),

  "\u{1F3E0}": /* house */
    p("M8 48 L50 12 L92 48 Z", APAL.red) +
    r(18, 46, 64, 46, APAL.cream, 3) +
    r(42, 62, 18, 30, APAL.brown, 3) + c(56, 78, 2.6, APAL.gold, 1.8) +
    r(24, 56, 14, 14, APAL.water, 2, 2.6) + r(62, 56, 14, 14, APAL.water, 2, 2.6),

  "\u{1F3A9}": /* hat */
    e(50, 76, 44, 12, APAL.black) +
    p("M28 76 L30 20 Q30 12 50 12 Q70 12 70 20 L72 76 Z", APAL.black) +
    r(26, 60, 48, 12, APAL.red, 2, 2.6),

  "\u{1F50D}": /* magnifier */
    l("M38 62 L12 88", 9, APAL.brown2) +
    c(62, 38, 28, "#dff0f5") + c(62, 38, 28, "none", 5) +
    l("M48 26 Q42 32 42 42", 3, "#ffffff"),

  "\u{1F96B}": /* tin */
    e(50, 22, 28, 10, APAL.grey) +
    p("M22 22 L22 78 Q22 88 50 88 Q78 88 78 78 L78 22", APAL.grey) +
    r(26, 36, 48, 30, APAL.red, 3, 2.6) + l("M34 50 L66 50", 2.4, "#ffffff"),

  "\u{1F4AB}": /* dizzy */
    l("M50 50 Q70 20 50 14 Q26 10 24 36 Q22 66 52 72 Q86 78 88 44", 5, APAL.purple) +
    p("M20 72 L26 84 L38 88 L26 92 L20 98 L14 92 L2 88 L14 84 Z", APAL.yellow, 2.2),

  "\u{1F9E9}": /* jigsaw */
    p("M14 14 L50 14 Q46 26 56 26 Q66 26 62 14 L86 14 L86 38 Q76 34 76 44 Q76 54 86 50 L86 86 L50 86 Q54 74 44 74 Q34 74 38 86 L14 86 Z", APAL.teal),

  "\u2753": numTile("?", APAL.purple),
  "8\uFE0F\u20E3": numTile("8", APAL.blue),
  "6\uFE0F\u20E3": numTile("6", APAL.orange),
  "3\uFE0F\u20E3": numTile("3", APAL.green),

  "\u{1F36F}": /* jam jar */
    r(30, 8, 40, 12, APAL.red, 4) +
    p("M26 22 L74 22 L74 86 Q74 94 66 94 L34 94 Q26 94 26 86 Z", "#f6e3b8") +
    p("M26 44 L74 44 L74 86 Q74 94 66 94 L34 94 Q26 94 26 86 Z", APAL.gold, 2.6) +
    r(36, 52, 28, 22, APAL.white, 3, 2.4) + l("M42 62 L58 62", 2.2),

  "\u{1FA81}": /* kite */
    l("M50 70 Q60 80 50 88 Q40 94 48 98", 2.6) +
    p("M50 6 L84 46 L50 92 L16 46 Z", APAL.red) +
    l("M50 6 L50 92", 2.4) + l("M16 46 L84 46", 2.4) +
    p("M50 6 L84 46 L50 46 Z", APAL.yellow, 2.4) +
    p("M50 46 L84 46 L50 92 Z", APAL.blue, 2.4),

  "\u{1F9F6}": /* yarn */
    c(50, 54, 36, APAL.purple) +
    l("M22 34 Q50 48 76 30", 2.6) + l("M18 54 Q50 70 82 50", 2.6) +
    l("M28 74 Q50 86 72 70", 2.6) +
    l("M74 40 Q94 34 92 16", 3, APAL.purple),

  "\u{1F333}": /* tree */
    r(42, 58, 16, 36, APAL.brown2, 3) +
    c(32, 44, 20, APAL.green2) + c(68, 44, 20, APAL.green2) + c(50, 30, 24, APAL.green),

  "\u{1F342}": /* leaf */
    l("M16 88 Q40 72 58 54", 3.4, APAL.brown2) +
    p("M58 54 Q40 42 48 24 Q58 4 84 10 Q92 34 82 48 Q72 62 58 54 Z", APAL.orange) +
    l("M58 54 Q70 36 82 24", 2.4),

  "\u{1F96D}": /* mango */
    l("M56 20 L52 32", 3, APAL.brown2) +
    p("M60 24 Q74 14 82 22 Q70 32 60 28 Z", APAL.green, 2.2) +
    p("M50 26 Q78 26 84 54 Q90 84 56 90 Q22 94 16 64 Q12 36 50 26 Z", APAL.orange) +
    l("M34 44 Q26 54 28 68", 2.6, "#ffffff"),

  "\u{1F7E4}": c(50, 50, 36, "#8a5c33") + c(38, 42, 7, "#6e4524", 2) + c(62, 60, 9, "#6e4524", 2),
  "\u{1F7E2}": c(50, 50, 36, APAL.green) + c(40, 42, 7, "#4d9a48", 2) + c(62, 58, 9, "#4d9a48", 2),

  "\u{1FAB9}": /* nest */
    p("M10 56 Q50 40 90 56 Q86 92 50 92 Q14 92 10 56 Z", APAL.brown) +
    l("M16 64 Q50 56 84 64", 2.4, APAL.brown2) +
    l("M20 76 Q50 68 80 76", 2.4, APAL.brown2) +
    e(38, 52, 10, 7, APAL.cream, 2.2) + e(62, 52, 10, 7, APAL.cream, 2.2),

  "\u{1F319}": /* moon */
    p("M62 6 Q26 14 26 50 Q26 86 62 94 Q34 76 34 50 Q34 24 62 6 Z", APAL.yellow) +
    c(74, 22, 4, APAL.yellow, 2) + c(84, 46, 3, APAL.yellow, 2),

  "\u{1F50A}": /* speaker */
    p("M10 38 L30 38 L52 18 L52 82 L30 62 L10 62 Z", APAL.grey2) +
    l("M62 36 Q70 50 62 64", 3) + l("M74 26 Q88 50 74 74", 3),

  "\u{1F95C}": /* peanut */
    p("M22 30 Q22 12 40 12 Q58 12 58 28 Q58 42 66 48 Q82 56 82 74 Q82 92 62 92 Q44 92 42 74 Q40 60 32 54 Q22 46 22 30 Z", "#d9a86a") +
    c(36, 28, 4, "#b8854a", 1.8) + c(46, 44, 4, "#b8854a", 1.8) + c(64, 74, 4, "#b8854a", 1.8),

  "\u{1F34A}": /* orange */
    l("M50 16 L50 26", 3.4, APAL.brown2) +
    p("M52 18 Q66 8 74 18 Q62 26 52 22 Z", APAL.green, 2.2) +
    c(50, 58, 34, APAL.orange) + l("M50 32 L50 84", 2) + l("M26 48 L74 68", 2),

  "\u{1FAA8}": /* rock */
    p("M6 86 Q2 62 20 48 Q30 26 52 32 Q72 22 84 42 Q98 58 92 86 Z", APAL.stone) +
    l("M28 86 Q22 60 40 46", 2.4) + l("M62 86 Q70 58 54 38", 2.4) +
    c(72, 62, 5, "#948f88", 2),

  "\u{1F372}": /* pot */
    e(50, 32, 34, 10, APAL.grey2) +
    p("M16 32 L22 76 Q24 90 50 90 Q76 90 78 76 L84 32 Z", APAL.grey) +
    c(34, 38, 5, APAL.green, 2) + c(50, 42, 5, APAL.green, 2) + c(64, 38, 5, APAL.green, 2) +
    l("M16 36 L4 30", 3.4) + l("M84 36 L96 30", 3.4),

  "\u{1F4E2}": /* megaphone */
    p("M10 40 L34 40 L80 14 L80 86 L34 60 L10 60 Z", APAL.red) +
    r(22, 60, 16, 30, APAL.red, 3, 2.6) +
    l("M88 34 Q96 50 88 66", 3),

  "\u{1F327}\uFE0F": /* rain cloud */
    p("M20 48 Q10 30 28 26 Q34 10 52 16 Q72 12 74 30 Q92 34 84 50 Z", APAL.grey) +
    l("M28 58 L22 76", 4, APAL.water) + l("M46 58 L40 80", 4, APAL.water) +
    l("M64 58 L58 76", 4, APAL.water) + l("M80 58 L74 74", 4, APAL.water),

  "\u{1FA9F}": /* window */
    r(10, 12, 80, 76, APAL.water, 4) +
    l("M50 12 L50 88", 4) + l("M10 50 L90 50", 4) +
    r(6, 8, 88, 8, APAL.brown2, 3, 2.6) +
    l("M22 24 Q22 18 32 18", 2.6, "#ffffff"),

  "\u{1F462}": /* boot */
    p("M30 8 L58 8 L60 52 Q62 64 76 68 Q92 74 92 88 L92 94 L30 94 Z", APAL.red) +
    l("M30 70 L92 86", 2.6) + l("M32 24 L58 24", 2.4),

  "\u{1F308}": /* rainbow */
    l("M8 86 A42 42 0 0 1 92 86", 10, APAL.red) +
    l("M20 86 A30 30 0 0 1 80 86", 10, APAL.yellow) +
    l("M32 86 A18 18 0 0 1 68 86", 10, APAL.green) +
    l("M8 86 A42 42 0 0 1 92 86", 1.6) + l("M32 86 A18 18 0 0 1 68 86", 1.6),

  "\u2600\uFE0F": /* sun */
    l("M50 4 L50 16", 4) + l("M50 84 L50 96", 4) +
    l("M4 50 L16 50", 4) + l("M84 50 L96 50", 4) +
    l("M17 17 L26 26", 4) + l("M74 74 L83 83", 4) +
    l("M83 17 L74 26", 4) + l("M26 74 L17 83", 4) +
    c(50, 50, 26, APAL.yellow),

  "\u{1F31E}": /* sun with face */
    l("M50 4 L50 14", 4) + l("M50 86 L50 96", 4) +
    l("M4 50 L14 50", 4) + l("M86 50 L96 50", 4) +
    l("M17 17 L24 24", 4) + l("M76 76 L83 83", 4) +
    l("M83 17 L76 24", 4) + l("M24 76 L17 83", 4) +
    c(50, 50, 30, APAL.yellow) + eyes2(50, 44, 10, 3.4) + smile(50, 56, 9, 7) +
    cheeks(50, 56, 19),

  "\u{1F307}": /* sunset */
    r(4, 62, 92, 30, APAL.water, 3) +
    p("M18 62 A32 32 0 0 1 82 62 Z", APAL.orange) +
    l("M8 72 Q30 66 52 72", 2.6, "#ffffff") + l("M48 82 Q70 76 92 82", 2.6, "#ffffff") +
    l("M6 62 L94 62", 3),

  "\u{1F3DC}\uFE0F": /* desert */
    r(4, 60, 92, 34, APAL.sand, 3) +
    c(72, 26, 16, APAL.yellow) +
    l("M4 66 Q24 50 44 66", 3) + l("M44 66 Q66 48 96 66", 3) +
    l("M12 80 Q34 70 56 80", 2.6),

  "\u{1F3DE}\uFE0F": /* park */
    r(4, 64, 92, 30, APAL.green, 3) +
    p("M4 64 Q22 34 42 64 Z", APAL.green2, 2.6) +
    p("M44 64 Q64 28 86 64 Z", APAL.stone, 2.6) +
    c(20, 24, 11, APAL.yellow) +
    r(66, 74, 8, 20, APAL.brown2, 2, 2.4) + c(70, 68, 14, APAL.green2),

  "\u{1F3B5}": noteShape(38, 46, 1.1),
  "\u{1F3B6}": noteShape(26, 52, 0.85) + noteShape(62, 38, 0.85),

  "\u{1F69A}": /* truck */
    r(6, 40, 52, 36, APAL.blue, 4) +
    p("M58 50 L80 50 L94 66 L94 76 L58 76 Z", APAL.navy) +
    r(62, 52, 14, 12, APAL.water, 2, 2.4) +
    c(26, 80, 11, APAL.black) + c(76, 80, 11, APAL.black) +
    c(26, 80, 4, APAL.grey, 2) + c(76, 80, 4, APAL.grey, 2),

  "\u{1F4A6}": /* water drops */
    p("M30 22 Q46 42 46 54 Q46 68 30 68 Q14 68 14 54 Q14 42 30 22 Z", APAL.water) +
    p("M66 38 Q82 58 82 70 Q82 84 66 84 Q50 84 50 70 Q50 58 66 38 Z", APAL.water) +
    p("M74 12 Q84 24 84 32 Q84 40 74 40 Q64 40 64 32 Q64 24 74 12 Z", APAL.water, 2.4),

  "\u2602\uFE0F": /* umbrella */
    l("M50 48 L50 84 Q50 94 38 94 Q30 94 30 86", 4) +
    p("M6 50 Q6 12 50 12 Q94 12 94 50 Q78 40 72 50 Q62 38 50 50 Q38 38 28 50 Q22 40 6 50 Z", APAL.red) +
    l("M50 12 L50 50", 2.4),

  "\u{1F4A7}": /* droplet */
    p("M50 8 Q80 44 80 62 Q80 88 50 88 Q20 88 20 62 Q20 44 50 8 Z", APAL.water) +
    l("M36 60 Q36 72 46 76", 3, "#ffffff"),

  "\u{1F690}": /* van */
    p("M8 68 L8 34 Q8 26 18 26 L58 26 L58 68 Z", APAL.purple) +
    p("M58 68 L58 36 L76 36 L92 56 L92 68 Z", APAL.purple) +
    r(16, 34, 16, 14, APAL.water, 2, 2.4) + r(62, 40, 14, 12, APAL.water, 2, 2.4) +
    l("M4 68 L96 68", 3.4) +
    c(28, 76, 10, APAL.black) + c(74, 76, 10, APAL.black) +
    c(28, 76, 3.6, APAL.grey, 2) + c(74, 76, 3.6, APAL.grey, 2),

  "\u{1F955}": /* carrot */
    p("M34 42 Q50 34 62 46 Q74 58 40 90 Q18 72 34 42 Z", APAL.orange) +
    l("M44 56 L52 62", 2.2) + l("M34 68 L42 74", 2.2) +
    p("M50 38 Q46 18 58 10 Q62 26 56 40 Z", APAL.green2, 2.4) +
    p("M58 40 Q68 24 82 24 Q74 40 60 46 Z", APAL.green, 2.4),

  "\u{1F347}": /* grapes */
    l("M54 24 L54 10", 3, APAL.brown2) +
    p("M56 14 Q70 4 80 12 Q66 22 56 18 Z", APAL.green, 2.2) +
    c(36, 38, 11, APAL.purple) + c(58, 36, 11, APAL.purple) +
    c(26, 56, 11, APAL.purple) + c(48, 56, 11, APAL.purple) + c(70, 54, 11, APAL.purple) +
    c(38, 74, 11, APAL.purple) + c(58, 74, 11, APAL.purple),

  "\u{1F3D8}\uFE0F": /* village */
    p("M4 48 L26 30 L48 48 Z", APAL.red) + r(10, 46, 32, 44, APAL.cream, 2) +
    r(20, 62, 12, 28, APAL.brown, 2, 2.4) +
    p("M50 56 L70 38 L90 56 Z", APAL.blue) + r(56, 54, 28, 36, APAL.cream, 2) +
    r(64, 68, 12, 22, APAL.brown, 2, 2.4),

  "\u231A": /* watch */
    r(38, 4, 24, 22, APAL.navy, 5) + r(38, 74, 24, 22, APAL.navy, 5) +
    c(50, 50, 28, APAL.grey) + c(50, 50, 21, APAL.white, 2.6) +
    l("M50 50 L50 36", 3) + l("M50 50 L62 54", 3),

  "\u3030\uFE0F": /* wavy line */
    l("M6 38 Q24 14 42 38 Q60 62 78 38 Q88 24 96 32", 7, APAL.blue) +
    l("M6 70 Q24 46 42 70 Q60 94 78 70 Q88 56 96 64", 7, APAL.teal),

  "\u{1FA7B}": /* x-ray of ribs */
    r(8, 8, 84, 84, APAL.navy, 6) +
    l("M50 22 L50 84", 6, "#dfe9f5") +
    l("M50 32 Q28 34 26 50", 5, "#dfe9f5") + l("M50 32 Q72 34 74 50", 5, "#dfe9f5") +
    l("M50 46 Q30 48 29 62", 5, "#dfe9f5") + l("M50 46 Q70 48 71 62", 5, "#dfe9f5") +
    l("M50 60 Q34 62 34 73", 5, "#dfe9f5") + l("M50 60 Q66 62 66 73", 5, "#dfe9f5"),

  "\u{1F341}": /* maple leaf */
    l("M50 94 L50 66", 3.4, APAL.brown2) +
    p("M50 10 Q57 30 68 23 Q63 38 78 35 Q69 47 84 51 Q68 59 74 72 Q59 68 57 84 L50 72 L43 84 Q41 68 26 72 Q32 59 16 51 Q31 47 22 35 Q37 38 32 23 Q43 30 50 10 Z", APAL.red),

  "\u{1FA80}": /* yo-yo */
    l("M50 10 L50 34", 3) + l("M46 8 L54 8", 3) +
    c(50, 60, 30, APAL.yellow) + c(50, 60, 10, APAL.orange, 2.6) +
    l("M28 44 Q34 38 44 36", 2.6, "#ffffff"),

  "\u26A1": /* lightning */
    p("M58 4 L22 54 L44 54 L36 96 L76 42 L52 42 L62 4 Z", APAL.yellow),

  "\u{1F4A4}": /* zzz */
    txt(70, 26, "z", 26, APAL.navy) + txt(46, 52, "z", 34, APAL.navy) +
    txt(22, 82, "z", 20, APAL.navy),

  "\u{1FA91}": /* chair */
    r(26, 6, 48, 50, APAL.brown, 5) + r(34, 16, 32, 30, "#8a5c33", 3, 2.4) +
    r(18, 54, 64, 12, "#b9823f", 4) +
    r(22, 64, 10, 30, APAL.brown2, 3) + r(68, 64, 10, 30, APAL.brown2, 3),

  "\u{1F9C0}": /* cheese */
    p("M10 44 L74 14 L92 34 L92 80 L10 80 Z", APAL.gold) +
    p("M10 44 L92 34 L92 80 L10 80 Z", "#e8b43a", 2.6) +
    c(30, 60, 7, "#f6e3b8", 2.2) + c(56, 54, 6, "#f6e3b8", 2.2) + c(74, 68, 6, "#f6e3b8", 2.2),

  "\u{1F35F}": /* chips */
    r(18, 46, 36, 48, APAL.red, 4) +
    r(26, 34, 7, 26, APAL.gold, 2, 2.4) + r(38, 24, 7, 36, APAL.gold, 2, 2.4) +
    r(50, 28, 7, 32, APAL.gold, 2, 2.4) + r(62, 38, 7, 24, APAL.gold, 2, 2.4) +
    p("M14 46 L58 46 L52 94 L20 94 Z", APAL.red) + l("M24 58 L48 58", 2.4, "#ffffff"),

  "\u{1F352}": /* cherries */
    l("M34 62 Q44 30 56 12", 3.4, APAL.green2) +
    l("M66 62 Q62 32 56 12", 3.4, APAL.green2) +
    p("M56 12 Q72 2 86 10 Q70 20 56 18 Z", APAL.green, 2.2) +
    c(30, 72, 18, APAL.red) + c(70, 74, 16, APAL.red) +
    '<circle cx="24" cy="66" r="4" fill="#fff" opacity="0.6"/>',

  "\u{1F45F}": /* trainer */
    p("M8 78 L8 54 Q8 44 20 44 L36 44 L58 58 L86 64 Q94 66 94 76 L94 82 L8 82 Z", APAL.white) +
    l("M22 46 L30 62", 2.6) + l("M32 48 L40 64", 2.6) + l("M42 52 L50 66", 2.6) +
    r(6, 78, 90, 10, APAL.blue, 3, 2.6),

  "\u{1F3EA}": /* shop */
    r(10, 40, 80, 52, APAL.cream, 3) +
    p("M4 40 L96 40 L88 20 L12 20 Z", APAL.red) +
    l("M28 20 L22 40", 2.4) + l("M50 20 L50 40", 2.4) + l("M72 20 L78 40", 2.4) +
    r(38, 58, 24, 34, APAL.brown, 3, 2.6) +
    r(16, 52, 16, 16, APAL.water, 2, 2.4) + r(68, 52, 16, 16, APAL.water, 2, 2.4),

  "\u{1F460}": /* high heel */
    p("M8 70 Q8 46 34 42 Q58 38 70 54 Q78 66 92 66 L92 78 L8 78 Z", APAL.red) +
    p("M74 78 L92 78 L88 96 L78 96 Z", APAL.red, 2.6) +
    l("M20 58 Q36 50 50 56", 2.4, "#ffffff"),

  "\u{1F335}": /* cactus */
    r(4, 86, 92, 10, APAL.sand, 3) +
    p("M40 88 L40 56 L28 56 Q16 56 16 44 L16 30 L26 30 L26 42 Q26 46 32 46 L40 46 L40 20 Q40 12 50 12 Q60 12 60 20 L60 38 L68 38 Q74 38 74 34 L74 22 L84 22 L84 36 Q84 48 72 48 L60 48 L60 88 Z", APAL.green2) +
    l("M50 24 L50 80", 2, APAL.green),

  "\u{1FA79}": /* plaster */
    '<g transform="rotate(-30 50 50)">' +
    r(10, 38, 80, 26, "#f0c88e", 13) +
    r(34, 38, 32, 26, "#e8b670", 0, 2.6) +
    dot(44, 46, 2.2) + dot(56, 46, 2.2) + dot(44, 56, 2.2) + dot(56, 56, 2.2) +
    "</g>",

  "\u{1F4AD}": /* thought bubble */
    p("M20 46 Q10 26 32 22 Q40 8 58 14 Q82 10 84 32 Q96 42 82 56 Q60 68 36 60 Q22 56 20 46 Z", APAL.white) +
    c(28, 74, 8, APAL.white, 2.6) + c(16, 88, 5, APAL.white, 2.4)
});

/* ===================== more pictures =====================
   Drawings for the Find and Make games, so those screens match the
   storybook instead of showing plain emoji. Same rules as above: one
   100x100 square, bold outlines, flat colours. */

/* The shared head/hair parts are drawn for one head at (50,38) r22. This
   puts the same hair on a head of any size, for pictures with more than
   one person in them. */
function hairCapAt(cx, cy, rr, col) {
  const s = rr / 22;
  return '<g transform="translate(' + (cx - 50 * s).toFixed(2) + ' ' +
    (cy - 38 * s).toFixed(2) + ') scale(' + s.toFixed(3) + ')">' + hairCap(col) + '</g>';
}

Object.assign(PIC, {
  "\u{1F392}": /* backpack */
    l("M38 30 Q38 8 50 8 Q62 8 62 30", 4) +
    r(20, 28, 60, 62, APAL.red, 14) +
    p("M20 50 Q20 28 50 28 Q80 28 80 50 Z", "#c94436") +
    r(34, 58, 32, 26, APAL.yellow, 7) +
    r(45, 44, 10, 11, APAL.grey, 2, 2.6),

  "\u{1F5FA}\u{FE0F}": /* map */
    p("M10 24 L36 16 L64 26 L90 16 L90 78 L64 88 L36 78 L10 86 Z", APAL.cream) +
    l("M36 16 L36 78", 2.6) + l("M64 26 L64 88", 2.6) +
    dot(24, 64, 2.2) + dot(34, 60, 2.2) + dot(46, 66, 2.2) + dot(58, 56, 2.2) +
    l("M70 38 L82 50", 4, APAL.red) + l("M82 38 L70 50", 4, APAL.red),

  "\u{1F43B}": /* bear */
    c(24, 30, 13, APAL.brown) + c(76, 30, 13, APAL.brown) +
    c(24, 30, 6, "#d9a06a", 2.2) + c(76, 30, 6, "#d9a06a", 2.2) +
    c(50, 56, 32, APAL.brown) +
    e(50, 68, 19, 14, APAL.cream) +
    eyes2(50, 48, 13, 3.4) +
    e(50, 62, 6, 4.4, AK) +
    l("M50 66 Q44 74 38 70", 2.8) + l("M50 66 Q56 74 62 70", 2.8),

  "\u{1F68C}": /* bus */
    r(10, 28, 80, 48, APAL.yellow, 11) +
    r(18, 36, 22, 17, APAL.water, 4) + r(46, 36, 20, 17, APAL.water, 4) +
    r(72, 36, 12, 17, APAL.water, 4) +
    l("M70 58 L70 76", 2.6) +
    r(18, 60, 18, 8, "#e0b92f", 3, 2.4) +
    c(30, 78, 10, APAL.black) + c(72, 78, 10, APAL.black) +
    c(30, 78, 3.6, APAL.grey, 2) + c(72, 78, 3.6, APAL.grey, 2),

  "\u{1F98B}": /* butterfly */
    p("M50 50 C30 18 6 26 10 46 C13 64 34 62 50 50 Z", APAL.orange) +
    p("M50 50 C70 18 94 26 90 46 C87 64 66 62 50 50 Z", APAL.orange) +
    p("M50 52 C34 54 18 66 28 82 C38 94 48 74 50 58 Z", APAL.pink) +
    p("M50 52 C66 54 82 66 72 82 C62 94 52 74 50 58 Z", APAL.pink) +
    c(26, 42, 5, APAL.yellow, 2.2) + c(74, 42, 5, APAL.yellow, 2.2) +
    e(50, 56, 5, 22, APAL.brown2) +
    l("M46 36 Q38 22 32 18", 2.6) + l("M54 36 Q62 22 68 18", 2.6) +
    dot(31, 17, 2.4) + dot(69, 17, 2.4),

  "\u{1F987}": /* bat */
    p("M50 50 C36 30 16 28 6 42 C18 44 14 58 28 56 C36 68 44 60 50 56 Z", APAL.purple) +
    p("M50 50 C64 30 84 28 94 42 C82 44 86 58 72 56 C64 68 56 60 50 56 Z", APAL.purple) +
    p("M40 36 L36 18 L48 30 Z", "#5b4b7a") + p("M60 36 L64 18 L52 30 Z", "#5b4b7a") +
    e(50, 50, 14, 20, "#5b4b7a") +
    c(45, 44, 3.2, APAL.white, 1.6) + c(55, 44, 3.2, APAL.white, 1.6) +
    smile(50, 56, 6, 4),

  "\u{1F697}": /* car */
    p("M28 54 L34 32 Q36 27 43 27 L63 27 Q70 27 72 32 L78 54 Z", APAL.red) +
    p("M38 50 L42 34 L48 34 L48 50 Z", APAL.water, 2.4) +
    p("M62 50 L58 34 L52 34 L52 50 Z", APAL.water, 2.4) +
    r(10, 50, 80, 24, APAL.red, 9) +
    c(86, 60, 4, APAL.yellow, 2.2) +
    c(28, 76, 11, APAL.black) + c(72, 76, 11, APAL.black) +
    c(28, 76, 4, APAL.grey, 2) + c(72, 76, 4, APAL.grey, 2),

  "\u{2615}": /* cup of tea */
    l("M74 46 Q92 46 92 58 Q92 72 72 72", 4) +
    p("M22 34 L26 82 Q27 90 36 90 L62 90 Q71 90 72 82 L76 34 Z", APAL.cream) +
    e(49, 40, 26, 6, "#9a5f38", 2.6) +
    r(25, 60, 48, 11, APAL.blue, 0, 2.4) +
    l("M40 24 Q34 17 40 10", 2.8) + l("M56 24 Q50 17 56 10", 2.8),

  "\u{1F9E2}": /* cap */
    p("M22 58 Q22 24 50 24 Q78 24 78 58 Z", APAL.blue) +
    l("M50 26 L50 56", 2.4) + l("M34 30 Q31 44 31 57", 2.2) + l("M66 30 Q69 44 69 57", 2.2) +
    p("M74 54 Q96 54 94 68 Q82 70 72 64 Z", APAL.navy) +
    r(20, 54, 56, 11, APAL.navy, 5) +
    c(50, 24, 4.4, APAL.navy, 2.2),

  "\u{1F995}": /* dinosaur */
    p("M18 62 Q4 64 2 78 Q16 74 24 68 Z", APAL.green) +
    e(42, 60, 28, 19, APAL.green) +
    r(28, 72, 11, 18, APAL.green2, 5) + r(52, 72, 11, 18, APAL.green2, 5) +
    p("M56 54 Q62 28 74 20 Q88 14 90 28 Q90 38 78 40 Q68 46 64 60 Z", APAL.green) +
    dot(82, 26, 2.8) + l("M86 34 Q90 34 92 32", 2.2) +
    p("M30 42 L36 32 L42 42 Z", APAL.green2, 2.4) + p("M44 40 L50 30 L56 40 Z", APAL.green2, 2.4),

  "\u{1F468}": /* man */
    torso(APAL.navy) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 38, 8) + smile(50, 46, 7) +
    l("M40 30 Q44 27 48 29", 2.4) + l("M60 30 Q56 27 52 29", 2.4),

  "\u{1F58A}\u{FE0F}": /* pen */
    '<g transform="rotate(-35 50 50)">' +
    r(41, 12, 18, 56, APAL.blue, 5) +
    r(41, 30, 18, 9, APAL.navy, 0, 2.4) +
    p("M41 68 L59 68 L50 92 Z", APAL.cream) +
    p("M46 84 L54 84 L50 93 Z", AK, 0, 1.6) +
    '</g>',

  "\u{1F945}": /* goal net */
    p("M16 34 L28 22 L72 22 L88 34 L88 76 L16 76 Z", APAL.white) +
    l("M28 24 L28 74", 1.8, APAL.grey2) + l("M44 23 L44 74", 1.8, APAL.grey2) +
    l("M60 23 L60 74", 1.8, APAL.grey2) + l("M76 28 L76 74", 1.8, APAL.grey2) +
    l("M18 40 L88 40", 1.8, APAL.grey2) + l("M18 52 L88 52", 1.8, APAL.grey2) +
    l("M18 64 L88 64", 1.8, APAL.grey2) +
    l("M16 34 L16 76", 4.4) + l("M16 34 L88 34", 4.4) + l("M88 34 L88 76", 4.4) +
    c(66, 68, 9, APAL.white) + l("M60 65 L72 71", 2) + l("M66 59 L66 77", 2),

  "\u{1F9B5}": /* leg */
    p("M34 6 L66 6 Q64 30 62 48 Q60 66 58 80 L40 80 Q42 62 42 46 Q38 28 34 6 Z", APAL.skin) +
    l("M42 46 Q52 50 62 45", 2.4) +
    p("M40 78 L60 78 Q62 88 78 90 Q86 92 84 97 L42 97 Q36 97 36 88 Z", APAL.blue) +
    l("M62 90 L80 93", 2.2),

  "\u{1FAB6}": /* feather */
    p("M28 88 Q32 42 58 14 Q80 32 66 62 Q52 86 28 88 Z", APAL.water) +
    l("M30 86 Q48 52 58 16", 2.8) +
    l("M38 74 Q48 68 54 58", 1.8) + l("M42 62 Q52 58 58 46", 1.8) +
    l("M48 50 Q56 46 60 36", 1.8),

  "\u{1FAAD}": /* folding fan */
    p("M50 86 L16 42 Q50 16 84 42 Z", APAL.pink) +
    l("M50 86 L28 48", 2.2) + l("M50 86 L50 34", 2.2) + l("M50 86 L72 48", 2.2) +
    l("M24 52 Q50 34 76 52", 2.2) +
    c(50, 86, 6, APAL.brown2, 2.8),

  "\u{1F42C}": /* dolphin fin */
    p("M32 74 Q42 30 74 72 Q54 66 32 74 Z", APAL.navy) +
    r(0, 74, 100, 26, APAL.water, 0, 2.6) +
    l("M4 82 Q14 76 24 82 T44 82 T64 82 T84 82", 3, "#3f8fbf") +
    l("M10 92 Q20 86 30 92 T50 92 T70 92 T90 92", 3, "#3f8fbf"),

  "\u{1F381}": /* gift */
    r(16, 44, 68, 46, APAL.red, 6) +
    r(44, 44, 12, 46, APAL.yellow, 0, 2.4) +
    r(10, 30, 80, 17, "#c94436", 6) +
    r(44, 30, 12, 17, APAL.yellow, 0, 2.4) +
    p("M46 30 Q34 10 24 20 Q20 32 46 32 Z", APAL.yellow) +
    p("M54 30 Q66 10 76 20 Q80 32 54 32 Z", APAL.yellow),

  "\u{26FD}": /* fuel pump */
    r(20, 22, 42, 68, APAL.red, 8) +
    r(28, 30, 26, 20, APAL.cream, 4) +
    l("M34 38 L48 38", 2.4) + l("M34 44 L44 44", 2.4) +
    r(28, 58, 26, 10, "#c94436", 4, 2.4) +
    l("M62 40 Q80 40 80 56 L80 72", 4) +
    r(72, 70, 16, 12, APAL.grey2, 4) +
    r(14, 86, 54, 8, APAL.stone, 3, 2.6),

  "\u{2705}": /* tick */
    c(50, 50, 35, APAL.green) +
    l("M33 52 L45 65 L69 37", 7, APAL.white),

  "\u{1F36C}": /* sweet */
    p("M16 34 L34 50 L16 66 Z", APAL.pink) +
    p("M84 34 L66 50 L84 66 Z", APAL.pink) +
    e(50, 50, 22, 17, APAL.red) +
    l("M40 42 Q50 50 40 58", 2.6, APAL.white) +
    l("M52 42 Q62 50 52 58", 2.6, APAL.white),

  "\u{1F590}\u{FE0F}": /* hand */
    p("M30 94 Q20 72 22 56 Q24 44 32 50 L34 58 L34 26 Q34 17 41 17 Q48 17 48 26 " +
      "L48 46 L50 16 Q50 7 57 7 Q64 7 64 16 L64 46 L66 22 Q66 13 73 13 Q80 13 80 22 " +
      "L80 50 L84 38 Q87 29 92 32 Q96 35 93 45 L86 74 Q81 94 68 94 Z", APAL.skin),

  "\u{1F525}": /* fire */
    p("M50 8 Q68 28 64 44 Q76 38 76 54 Q76 82 50 92 Q24 82 24 54 Q24 36 38 42 Q32 24 50 8 Z", APAL.orange) +
    p("M50 44 Q60 56 58 66 Q58 80 50 86 Q42 80 42 66 Q42 56 50 44 Z", APAL.yellow, 2.4),

  "\u{1F917}": /* hug */
    e(18, 64, 11, 8, APAL.skin) + e(82, 64, 11, 8, APAL.skin) +
    faceBase() + eyesArc(50, 44, 12, 9) + smile(50, 56, 11, 9) + cheeks(50, 56, 22),

  "\u{1FAB0}": /* fly */
    e(26, 42, 16, 9, APAL.white, 2.4) + e(74, 42, 16, 9, APAL.white, 2.4) +
    l("M34 72 L22 88", 2.6) + l("M50 76 L50 92", 2.6) + l("M66 72 L78 88", 2.6) +
    e(50, 60, 17, 20, "#5b6470") +
    l("M38 56 L62 56", 2.2) + l("M38 66 L62 66", 2.2) +
    c(50, 34, 13, "#5b6470") +
    c(43, 31, 6, APAL.red, 2.2) + c(57, 31, 6, APAL.red, 2.2),

  "\u{1F366}": /* ice cream */
    c(36, 34, 17, APAL.pink) + c(64, 34, 17, APAL.cream) + c(50, 24, 17, "#f6a9c7") +
    p("M24 44 L76 44 L50 94 Z", APAL.sand) +
    l("M34 56 L58 56", 2) + l("M40 68 L66 56", 2) + l("M30 56 L46 80", 2),

  "\u{1F444}": /* lips */
    p("M14 50 Q32 30 50 44 Q68 30 86 50 Q66 74 50 74 Q34 74 14 50 Z", APAL.red) +
    l("M14 50 Q50 58 86 50", 2.8),

  "\u{1F4CC}": /* push pin */
    p("M45 44 L55 44 L52 72 L50 95 L48 72 Z", APAL.grey) +
    c(50, 30, 18, APAL.red) +
    c(44, 25, 5, "#f2a69b", 0),

  "\u{2708}\u{FE0F}": /* jet */
    p("M8 58 L44 44 L44 20 Q44 10 50 10 Q56 10 56 20 L56 44 L92 58 L92 68 L56 62 " +
      "L56 80 L66 88 L66 94 L50 90 L34 94 L34 88 L44 80 L44 62 L8 68 Z", APAL.grey) +
    l("M50 14 L50 86", 2) + c(50, 24, 4, APAL.water, 2),

  "\u{1F9C3}": /* juice box */
    l("M64 30 L64 10 L78 10", 4, APAL.red) +
    r(26, 28, 44, 62, APAL.orange, 6) +
    r(34, 40, 28, 26, APAL.cream, 4) +
    c(48, 52, 8, APAL.red, 2.4) + l("M48 44 L48 40", 2.2, APAL.green2) +
    r(26, 76, 44, 8, "#d4802c", 0, 2.2),

  "\u{1F353}": /* jam jar */
    r(32, 14, 36, 10, APAL.navy, 4) +
    p("M28 26 L72 26 L72 84 Q72 92 64 92 L36 92 Q28 92 28 84 Z", APAL.white) +
    p("M30 46 L70 46 L70 84 Q70 90 64 90 L36 90 Q30 90 30 84 Z", APAL.red, 2.4) +
    r(36, 56, 28, 18, APAL.cream, 3, 2.4) +
    l("M42 64 L58 64", 2.2) + l("M44 70 L56 70", 2),

  "\u{1F9D1}\u{200D}\u{1F527}": /* worker */
    torso(APAL.blue) + neck() + head() +
    p("M27 34 Q27 14 50 14 Q73 14 73 34 Q73 28 50 28 Q27 28 27 34 Z", APAL.orange) +
    r(24, 32, 52, 7, "#d4802c", 3, 2.4) +
    eyes2(50, 42, 8) + smile(50, 50, 7) +
    l("M70 74 L88 62", 5, APAL.grey2) + c(88, 58, 7, APAL.grey2, 2.6) + c(88, 58, 3, APAL.white, 1.8),

  "\u{1F3FA}": /* jug */
    l("M70 44 Q88 46 88 58 Q88 70 70 72", 4) +
    p("M34 22 L66 22 L74 42 Q78 62 74 80 Q72 92 50 92 Q28 92 26 80 Q22 62 26 42 Z", APAL.sand) +
    e(50, 22, 16, 6, "#dcc083", 2.6) +
    l("M28 56 Q50 62 72 56", 2.4) + l("M30 68 Q50 74 70 68", 2.2),

  "\u{1F511}": /* key */
    c(26, 50, 18, APAL.gold) + c(26, 50, 7, APAL.cream, 2.4) +
    r(42, 44, 46, 12, APAL.gold, 4) +
    r(66, 54, 8, 14, APAL.gold, 2, 2.6) + r(80, 54, 8, 14, APAL.gold, 2, 2.6),

  "\u{1F451}": /* crown */
    p("M14 72 L18 26 L34 46 L50 20 L66 46 L82 26 L86 72 Z", APAL.gold) +
    r(12, 70, 76, 14, "#d9a521", 5) +
    c(18, 26, 5, APAL.red, 2.2) + c(50, 20, 5, APAL.red, 2.2) + c(82, 26, 5, APAL.red, 2.2) +
    c(34, 77, 4, APAL.water, 2) + c(66, 77, 4, APAL.water, 2),

  "\u{1F9D2}": /* kid */
    torso(APAL.green) + neck() + head() + hairCap(APAL.hairY) +
    eyes2(50, 38, 8) + smile(50, 46, 8) + cheeks(50, 44, 16) +
    l("M50 15 Q54 6 60 8", 2.6, APAL.hairY),

  "\u{1F9F0}": /* toolbox */
    l("M34 36 Q34 20 50 20 Q66 20 66 36", 4) +
    r(12, 36, 76, 48, APAL.red, 8) +
    r(12, 48, 76, 10, "#c94436", 0, 2.4) +
    r(20, 62, 24, 16, APAL.grey, 3, 2.4) +
    l("M56 76 L72 62", 4, APAL.grey2) + c(74, 60, 5, APAL.grey2, 2.4),

  "\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467}": /* family */
    p("M4 94 C4 76 12 68 24 68 C36 68 44 76 44 94 Z", APAL.navy) +
    c(24, 52, 16, APAL.skin) + hairCapAt(24, 52, 16, APAL.hairB) +
    eyes2(24, 52, 6, 2.6) + smile(24, 58, 5, 4) +
    p("M56 94 C56 76 64 68 76 68 C88 68 96 76 96 94 Z", APAL.pink) +
    c(76, 52, 16, APAL.skin) + hairCapAt(76, 52, 16, APAL.hairY) +
    eyes2(76, 52, 6, 2.6) + smile(76, 58, 5, 4) +
    p("M34 96 C34 84 40 78 50 78 C60 78 66 84 66 96 Z", APAL.yellow) +
    c(50, 68, 12, APAL.skin) + hairCapAt(50, 68, 12, APAL.hairB) +
    eyes2(50, 68, 4.5, 2.2) + smile(50, 73, 4, 3),

  "\u{1F9E6}": /* sock */
    p("M32 10 L62 10 L62 54 Q62 64 72 68 L86 76 Q94 82 88 90 Q82 96 72 92 L40 78 " +
      "Q30 72 30 58 L30 24 Z", APAL.blue) +
    r(30, 10, 32, 14, APAL.red, 0, 2.6) +
    l("M31 32 L61 32", 3, APAL.white) + l("M31 42 L61 42", 3, APAL.white),

  "\u{1F343}": /* leaf */
    p("M16 86 Q18 38 52 16 Q86 28 74 58 Q60 86 16 86 Z", APAL.green) +
    l("M18 86 Q42 58 54 20", 2.8) +
    l("M28 74 Q40 70 46 58", 2) + l("M34 62 Q46 58 52 44", 2) + l("M42 50 Q54 46 58 34", 2),

  "\u{1F981}": /* lion */
    c(50, 52, 40, APAL.orange) +
    c(50, 52, 29, "#f9c877") +
    e(28, 34, 9, 9, APAL.orange, 2.6) + e(72, 34, 9, 9, APAL.orange, 2.6) +
    eyes2(50, 46, 12, 3.4) +
    e(50, 60, 7, 5, "#8c4a44", 2.4) +
    l("M50 64 Q44 72 38 68", 2.6) + l("M50 64 Q56 72 62 68", 2.6) +
    l("M28 58 L16 56", 2) + l("M28 62 L16 64", 2) +
    l("M72 58 L84 56", 2) + l("M72 62 L84 64", 2),

  "\u{1FA94}": /* lamp */
    p("M22 54 L34 22 L66 22 L78 54 Z", APAL.red) +
    r(44, 54, 12, 26, APAL.grey2, 0, 2.6) +
    p("M30 90 Q30 80 50 80 Q70 80 70 90 Z", APAL.navy) +
    r(22, 88, 56, 8, APAL.navy, 4) +
    l("M34 36 L66 36", 2.2, "#c94436"),

  "\u{1FAB5}": /* log */
    r(18, 34, 64, 34, APAL.brown, 8) +
    e(22, 51, 10, 17, "#c89060") +
    e(22, 51, 6, 10, APAL.brown2, 2.2) + e(22, 51, 2.4, 4, "#c89060", 1.8) +
    l("M44 38 L48 64", 2, APAL.brown2) + l("M60 38 L64 64", 2, APAL.brown2),

  "\u{1F412}": /* monkey */
    c(20, 46, 13, APAL.brown) + c(80, 46, 13, APAL.brown) +
    c(20, 46, 7, "#e8b88c", 2.2) + c(80, 46, 7, "#e8b88c", 2.2) +
    c(50, 50, 32, APAL.brown) +
    p("M50 34 Q76 34 76 58 Q76 80 50 80 Q24 80 24 58 Q24 34 50 34 Z", "#f0cba0") +
    eyes2(50, 48, 11, 3.4) +
    dot(45, 62, 2.2) + dot(55, 62, 2.2) +
    smile(50, 68, 9, 6),

  "\u{1F95B}": /* glass of milk */
    p("M28 16 L72 16 L66 88 Q65 94 50 94 Q35 94 34 88 Z", APAL.white) +
    p("M30 30 L70 30 L66 88 Q65 94 50 94 Q35 94 34 88 Z", "#eef3f8", 2.4) +
    e(50, 17, 22, 5, APAL.cream, 2.4) +
    l("M38 44 Q40 62 42 78", 2.4, APAL.grey),

  "\u{1F9F9}": /* broom */
    l("M64 10 L46 54", 5, APAL.brown) +
    p("M30 52 L62 52 L74 92 Q50 100 26 92 Z", APAL.yellow) +
    r(30, 50, 32, 10, APAL.brown2, 3, 2.6) +
    l("M38 64 L34 90", 2, "#d4b43c") + l("M50 64 L50 92", 2, "#d4b43c") +
    l("M62 64 L66 90", 2, "#d4b43c"),

  "\u{1F642}": /* smiling face */
    faceBase() + eyes2(50, 44, 13, 4) + smile(50, 58, 13, 10),

  "\u{1F989}": /* owl */
    p("M50 14 Q84 14 84 54 Q84 92 50 92 Q16 92 16 54 Q16 14 50 14 Z", APAL.brown) +
    p("M18 26 L30 20 L34 32 Z", APAL.brown) + p("M82 26 L70 20 L66 32 Z", APAL.brown) +
    p("M50 56 Q78 56 78 72 Q78 90 50 90 Q22 90 22 72 Q22 56 50 56 Z", APAL.sand) +
    c(34, 44, 16, APAL.cream) + c(66, 44, 16, APAL.cream) +
    c(34, 44, 7, AK, 0) + c(66, 44, 7, AK, 0) +
    c(32, 42, 2.4, APAL.white, 0) + c(64, 42, 2.4, APAL.white, 0) +
    p("M50 50 L56 60 L44 60 Z", APAL.orange, 2.4) +
    l("M40 90 L36 96", 3, APAL.orange) + l("M60 90 L64 96", 3, APAL.orange),

  "\u{1F350}": /* pear */
    l("M52 24 L54 10", 3, APAL.brown2) +
    p("M54 14 Q70 4 76 16 Q66 26 54 20 Z", APAL.green2, 2.4) +
    p("M50 22 Q62 22 60 38 Q58 50 66 60 Q76 72 70 84 Q62 96 50 96 Q38 96 30 84 " +
      "Q24 72 34 60 Q42 50 40 38 Q38 22 50 22 Z", "#c7d94a") +
    c(40, 70, 3, "#aec43a", 0) + c(58, 78, 2.6, "#aec43a", 0),

  "\u{1F6D1}": /* stop sign */
    p("M34 12 L66 12 L88 34 L88 66 L66 88 L34 88 L12 66 L12 34 Z", APAL.red) +
    r(22, 44, 56, 12, APAL.white, 2, 2.4),

  "\u{1F4B7}": /* banknote */
    r(8, 28, 84, 44, APAL.green) +
    r(14, 34, 72, 32, "#8fd089", 3, 2.2) +
    c(50, 50, 13, APAL.cream, 2.6) +
    txt(50, 51, "\u00a3", 16, AK) +
    c(22, 50, 4, "#8fd089", 2) + c(78, 50, 4, "#8fd089", 2),

  "\u{1F400}": /* rat */
    l("M18 66 Q6 62 8 78 Q10 90 24 86", 3.2) +
    c(78, 36, 12, APAL.grey) + c(78, 36, 6, "#e3b7c4", 2.2) +
    e(48, 64, 32, 22, APAL.grey) +
    p("M70 46 Q86 46 88 60 Q90 74 76 80 Q62 84 56 72 Z", APAL.grey) +
    dot(80, 62, 3) + e(90, 70, 4, 3, "#e3b7c4", 2) +
    l("M84 74 L96 70", 1.8) + l("M84 78 L96 80", 1.8) +
    l("M70 72 L58 70", 1.8),

  "\u{1F916}": /* robot */
    l("M50 16 L50 6", 3) + c(50, 6, 4, APAL.red, 2.2) +
    r(20, 16, 60, 44, APAL.grey, 10) +
    r(28, 26, 44, 22, "#3a4654", 5, 2.4) +
    c(40, 37, 5, APAL.water, 0) + c(60, 37, 5, APAL.water, 0) +
    l("M42 52 L58 52", 2.6) +
    r(26, 64, 48, 30, APAL.blue, 7) +
    r(8, 68, 14, 20, APAL.grey, 5) + r(78, 68, 14, 20, APAL.grey, 5) +
    c(50, 78, 6, APAL.yellow, 2.4),

  "\u{1F48D}": /* ring */
    p("M38 30 L50 18 L62 30 L50 42 Z", "#8ad4f0") +
    l("M24 62 A26 26 0 1 0 76 62 A26 26 0 1 0 24 62", 14, AK) +
    l("M24 62 A26 26 0 1 0 76 62 A26 26 0 1 0 24 62", 8.5, APAL.gold),

  "\u{1F7E5}": /* red square */
    r(14, 14, 72, 72, APAL.red, 10),

  "\u{2B50}": /* star */
    p("M50 8 L61 36 L92 38 L68 58 L76 90 L50 72 L24 90 L32 58 L8 38 L39 36 Z", APAL.gold),

  "\u{1F622}": /* sad face */
    faceBase() + eyes2(50, 44, 13, 4) + frown(50, 66, 12, 8) +
    p("M60 50 Q66 62 60 66 Q54 62 60 50 Z", APAL.water, 2),

  "\u{1F3AB}": /* ticket */
    p("M8 28 L92 28 L92 42 Q84 42 84 50 Q84 58 92 58 L92 72 L8 72 L8 58 " +
      "Q16 58 16 50 Q16 42 8 42 Z", APAL.orange) +
    l("M34 32 L34 40", 2.4) + l("M34 46 L34 54", 2.4) + l("M34 60 L34 68", 2.4) +
    r(44, 40, 36, 20, APAL.cream, 3, 2.4) +
    l("M50 48 L74 48", 2.2) + l("M50 54 L66 54", 2.2),

  "\u{1F51D}": /* top arrow */
    c(50, 50, 38, APAL.navy) +
    p("M50 24 L72 48 L60 48 L60 70 L40 70 L40 48 L28 48 Z", APAL.white, 2.6),

  "\u{1F6B0}": /* tap */
    r(8, 14, 16, 46, APAL.grey2, 4) +
    p("M24 24 L62 24 Q72 24 72 36 L72 46 L56 46 L56 38 Q56 34 50 34 L24 34 Z", APAL.grey) +
    r(50, 44, 28, 10, APAL.grey, 3) +
    r(28, 10, 26, 10, APAL.blue, 4) +
    l("M64 56 Q62 70 64 80", 3.2, APAL.water) +
    e(64, 88, 13, 6, APAL.water, 2.4),

  "\u{1F51F}": /* ten */
    r(6, 30, 88, 40, APAL.navy, 10) +
    txt(50, 51, "10", 30, APAL.white),

  "\u{1F6C1}": /* bath */
    p("M10 46 L90 46 L84 82 Q83 90 74 90 L26 90 Q17 90 16 82 Z", APAL.white) +
    p("M14 56 L86 56 L84 82 Q83 90 74 90 L26 90 Q17 90 16 82 Z", APAL.water, 2.4) +
    l("M10 46 L90 46", 3.4) +
    c(30, 64, 5, APAL.white, 2) + c(46, 70, 4, APAL.white, 2) + c(62, 62, 5, APAL.white, 2) +
    l("M78 30 L78 42", 4, APAL.grey2) + r(68, 22, 22, 9, APAL.grey2, 3) +
    r(16, 88, 12, 10, APAL.grey2, 2, 2.4) + r(72, 88, 12, 10, APAL.grey2, 2, 2.4),

  "\u{1F984}": /* unicorn */
    p("M50 8 L59 32 L41 32 Z", APAL.gold) +
    l("M44 18 L56 18", 2) + l("M46 25 L54 25", 2) +
    p("M26 36 L18 18 L38 28 Z", APAL.white) + p("M74 36 L82 18 L62 28 Z", APAL.white) +
    p("M50 26 Q78 26 78 56 Q78 84 50 88 Q22 84 22 56 Q22 26 50 26 Z", APAL.white) +
    p("M24 44 Q22 26 38 24 Q32 36 36 48 Q28 48 24 44 Z", APAL.pink, 2.4) +
    p("M76 44 Q78 26 62 24 Q68 36 64 48 Q72 48 76 44 Z", APAL.purple, 2.4) +
    eyes2(50, 54, 13, 3.6) +
    e(50, 74, 13, 9, "#ffe4ec") +
    dot(45, 73, 2) + dot(55, 73, 2),

  "\u{1F3BB}": /* violin */
    '<g transform="rotate(-20 50 50)">' +
    l("M50 10 L50 34", 4, APAL.brown2) + r(42, 4, 16, 10, APAL.brown2, 3) +
    p("M50 32 Q68 32 68 48 Q68 56 60 60 Q68 66 68 76 Q68 94 50 94 Q32 94 32 76 " +
      "Q32 66 40 60 Q32 56 32 48 Q32 32 50 32 Z", APAL.brown) +
    l("M44 36 L44 90", 1.8, "#6b4525") + l("M56 36 L56 90", 1.8, "#6b4525") +
    r(42, 80, 16, 6, APAL.brown2, 2, 2.2) +
    '</g>',

  "\u{1F30B}": /* volcano */
    p("M4 92 L34 30 L66 30 L96 92 Z", APAL.brown) +
    p("M34 30 L66 30 L74 46 Q50 52 26 46 Z", APAL.brown2, 2.4) +
    p("M38 32 Q34 16 44 6 Q44 18 52 14 Q50 26 60 22 Q58 34 66 32 Z", APAL.orange) +
    l("M34 32 Q30 50 36 68", 4, APAL.red) + l("M66 32 Q70 52 64 70", 4, APAL.red) +
    r(2, 88, 96, 10, APAL.green2, 0, 2.4),

  "\u{1FA7A}": /* stethoscope */
    l("M26 14 Q20 42 34 54 Q50 68 66 54 Q80 42 74 14", 4.4) +
    c(26, 12, 7, APAL.grey2, 2.6) + c(74, 12, 7, APAL.grey2, 2.6) +
    l("M50 64 L50 76", 4) +
    c(50, 84, 14, APAL.grey) + c(50, 84, 7, APAL.grey2, 2.4),

  "\u{1F6E2}\u{FE0F}": /* barrel */
    e(50, 22, 30, 9, "#d98b3a") +
    p("M20 22 Q12 50 20 78 Q50 88 80 78 Q88 50 80 22 Q50 32 20 22 Z", APAL.orange) +
    r(14, 36, 72, 9, "#c4752c", 0, 2.4) + r(14, 58, 72, 9, "#c4752c", 0, 2.4) +
    e(50, 22, 30, 9, "#d98b3a", 3.2),

  "\u{1FAB1}": /* worm */
    l("M20 86 Q8 62 28 56 Q48 50 42 36 Q38 24 56 22 Q76 20 78 38", 20, AK) +
    l("M20 86 Q8 62 28 56 Q48 50 42 36 Q38 24 56 22 Q76 20 78 38", 14, "#f2a2b8") +
    dot(74, 32, 2.4) + dot(82, 34, 2.4) + smile(78, 40, 5, 4),

  "\u{1F349}": /* watermelon */
    p("M8 26 L92 26 Q92 94 50 94 Q8 94 8 26 Z", APAL.green2) +
    p("M14 32 L86 32 Q86 88 50 88 Q14 88 14 32 Z", APAL.cream, 2.4) +
    p("M20 38 L80 38 Q80 82 50 82 Q20 82 20 38 Z", APAL.red, 2.4) +
    dot(38, 48, 3) + dot(56, 46, 3) + dot(46, 60, 3) + dot(64, 58, 3) + dot(50, 72, 3),

  "\u{1F3C6}": /* trophy */
    p("M30 14 L70 14 L68 44 Q66 60 50 60 Q34 60 32 44 Z", APAL.gold) +
    l("M30 20 Q12 20 14 34 Q16 46 32 46", 3.6) +
    l("M70 20 Q88 20 86 34 Q84 46 68 46", 3.6) +
    r(44, 58, 12, 16, "#d9a521", 0, 2.6) +
    r(28, 72, 44, 10, APAL.gold, 3) + r(22, 82, 56, 12, "#d9a521", 4) +
    txt(50, 34, "1", 20, "#8a6a12"),

  "\u{1F487}": /* wig */
    p("M16 86 Q10 40 50 16 Q90 40 84 86 Q74 76 72 58 Q50 70 28 58 Q26 76 16 86 Z", APAL.hairB) +
    c(50, 46, 20, APAL.skin, 2.6) +
    eyes2(50, 44, 7, 2.8) + smile(50, 52, 6, 5),

  "\u{1F578}\u{FE0F}": /* web */
    l("M50 6 L50 94", 2.4) + l("M6 50 L94 50", 2.4) +
    l("M16 16 L84 84", 2.4) + l("M84 16 L16 84", 2.4) +
    l("M50 22 L72 36 L78 50 L72 64 L50 78 L28 64 L22 50 L28 36 Z", 2.4) +
    l("M50 38 L62 46 L64 50 L62 54 L50 62 L38 54 L36 50 L38 46 Z", 2.4) +
    e(62, 36, 7, 6, "#4a4a4a", 2) + dot(62, 36, 2),

  "\u{1F3B7}": /* saxophone */
    l("M44 10 L44 34", 4, APAL.grey2) +
    l("M44 34 Q44 72 58 82", 11, "#d9a521") +
    p("M52 78 Q78 70 86 86 Q74 98 56 92 Z", APAL.gold) +
    dot(48, 44, 3) + dot(50, 56, 3) + dot(54, 68, 3) +
    r(38, 6, 12, 8, "#4a4a4a", 3, 2.4),

  "\u{1F527}": /* spanner */
    '<g transform="rotate(35 50 50)">' +
    r(42, 24, 16, 60, APAL.grey2, 5) +
    p("M34 10 L42 18 L42 30 L58 30 L58 18 L66 10 Q50 2 34 10 Z", APAL.grey) +
    '</g>',

  "\u{1F6E5}\u{FE0F}": /* motor boat */
    r(44, 18, 6, 30, APAL.grey2, 2, 2.4) +
    p("M50 20 L76 20 L50 42 Z", APAL.red, 2.4) +
    p("M26 48 L72 48 L66 64 L32 64 Z", APAL.white) +
    r(34, 52, 10, 8, APAL.water, 2, 2.2) + r(50, 52, 10, 8, APAL.water, 2, 2.2) +
    p("M10 64 L90 64 L78 82 L22 82 Z", APAL.navy) +
    r(0, 80, 100, 20, APAL.water, 0, 2.6) +
    l("M6 88 Q16 82 26 88 T46 88 T66 88 T86 88", 3, "#3f8fbf"),

  "\u{1F402}": /* yak */
    p("M26 38 Q4 34 4 12 Q20 10 28 26 Z", APAL.cream) +
    p("M74 38 Q96 34 96 12 Q80 10 72 26 Z", APAL.cream) +
    p("M18 86 Q10 56 26 40 Q38 28 50 28 Q62 28 74 40 Q90 56 82 86 Z", APAL.brown2) +
    l("M24 60 L18 78", 2.4, "#5c3c21") + l("M76 60 L82 78", 2.4, "#5c3c21") +
    e(50, 66, 18, 14, "#c89060") +
    dot(43, 64, 3) + dot(57, 64, 3) +
    eyes2(50, 46, 13, 3.4) +
    l("M30 86 L30 94", 4) + l("M44 88 L44 96", 4) + l("M56 88 L56 96", 4) + l("M70 86 L70 94", 4),

  "\u{23F3}": /* hourglass */
    r(20, 6, 60, 10, APAL.brown, 4) + r(20, 84, 60, 10, APAL.brown, 4) +
    p("M28 16 L72 16 Q72 40 50 50 Q72 60 72 84 L28 84 Q28 60 50 50 Q28 40 28 16 Z", APAL.cream) +
    p("M32 20 L68 20 Q68 38 50 48 Q32 38 32 20 Z", APAL.gold, 0) +
    p("M38 80 Q50 62 62 80 Z", APAL.gold, 0) +
    l("M50 50 L50 72", 2.4, APAL.gold),

  "\u{1F910}": /* zip */
    r(40, 6, 20, 76, APAL.blue, 4) +
    l("M34 14 L40 14", 3.4) + l("M34 24 L40 24", 3.4) + l("M34 34 L40 34", 3.4) +
    l("M60 14 L66 14", 3.4) + l("M60 24 L66 24", 3.4) + l("M60 34 L66 34", 3.4) +
    l("M34 44 L40 44", 3.4) + l("M60 44 L66 44", 3.4) +
    r(38, 48, 24, 16, APAL.grey, 4) +
    p("M44 62 L56 62 L54 86 Q50 92 46 86 Z", APAL.grey2),

  "\u{30}\u{FE0F}\u{20E3}": /* zero */
    r(10, 14, 80, 72, APAL.navy, 14) +
    txt(50, 51, "0", 44, APAL.white),

  "\u{1F600}": /* grinning face */
    faceBase() + eyes2(50, 42, 13, 4) +
    p("M26 56 Q50 54 74 56 Q70 80 50 80 Q30 80 26 56 Z", APAL.white) +
    l("M27 60 Q50 62 73 60", 2.4),

  "\u{1FA93}": /* axe */
    '<g transform="rotate(20 50 50)">' +
    r(44, 20, 12, 74, APAL.brown, 4) +
    p("M44 16 Q74 8 84 30 Q74 52 44 44 Z", APAL.grey) +
    p("M44 20 Q66 16 74 30 Q66 44 44 40 Z", "#e7ecf1", 2.2) +
    '</g>',

  "\u{1F4AC}": /* speech bubble */
    p("M10 20 L90 20 Q96 20 96 28 L96 64 Q96 72 90 72 L44 72 L24 92 L26 72 " +
      "L10 72 Q4 72 4 64 L4 28 Q4 20 10 20 Z", APAL.white) +
    dot(30, 46, 5) + dot(50, 46, 5) + dot(70, 46, 5),

  "\u{1F6A2}": /* ship */
    r(44, 14, 6, 26, APAL.grey2, 2, 2.4) +
    r(26, 40, 48, 16, APAL.white, 4) +
    r(32, 44, 9, 8, APAL.water, 2, 2.2) + r(46, 44, 9, 8, APAL.water, 2, 2.2) +
    r(60, 44, 9, 8, APAL.water, 2, 2.2) +
    r(54, 24, 10, 18, APAL.red, 3) + r(68, 28, 10, 14, APAL.red, 3) +
    p("M8 56 L92 56 L80 78 L20 78 Z", APAL.navy) +
    c(34, 66, 4, APAL.white, 2) + c(50, 66, 4, APAL.white, 2) + c(66, 66, 4, APAL.white, 2) +
    r(0, 78, 100, 22, APAL.water, 0, 2.6) +
    l("M6 88 Q16 82 26 88 T46 88 T66 88 T86 88", 3, "#3f8fbf"),

  "\u{1F41A}": /* shell */
    p("M50 88 Q10 76 12 40 Q14 14 50 12 Q86 14 88 40 Q90 76 50 88 Z", APAL.pink) +
    l("M50 86 L50 14", 2.2) +
    l("M50 86 Q32 56 26 20", 2.2) + l("M50 86 Q68 56 74 20", 2.2) +
    l("M50 86 Q40 52 38 15", 2.2) + l("M50 86 Q60 52 62 15", 2.2),

  "\u{1F6D6}": /* hut */
    p("M50 8 L96 46 L4 46 Z", APAL.sand) +
    l("M50 12 L12 44", 2.2, "#d4b878") + l("M50 12 L88 44", 2.2, "#d4b878") +
    r(12, 44, 76, 46, APAL.brown) +
    r(38, 58, 24, 32, APAL.brown2, 3) +
    c(58, 74, 2.6, APAL.gold, 0) +
    r(16, 56, 14, 14, APAL.water, 3, 2.4),

  "\u{1F329}\u{FE0F}": /* thunder cloud */
    p("M26 60 Q10 60 10 46 Q10 32 26 34 Q28 16 48 16 Q68 16 70 32 Q90 30 90 46 " +
      "Q90 60 74 60 Z", APAL.grey) +
    p("M52 58 L34 84 L46 84 L40 98 L64 72 L50 72 Z", APAL.gold) +
    l("M22 70 L18 84", 3.4, APAL.water) + l("M80 70 L76 84", 3.4, APAL.water),

  "\u{1FAA1}": /* needle and thread */
    l("M20 88 Q40 78 36 60 Q32 42 52 36", 3, APAL.red) +
    '<g transform="rotate(-30 50 50)">' +
    p("M50 12 L56 24 L56 82 L50 92 L44 82 L44 24 Z", APAL.grey) +
    e(50, 30, 4, 8, APAL.white, 2.2) +
    '</g>',

  "\u{1F449}": /* pointing hand */
    p("M6 44 L46 44 L46 26 Q46 18 54 18 Q62 18 62 26 L62 42 L78 42 Q90 42 90 54 " +
      "Q90 74 74 82 Q60 90 44 90 L22 90 Q10 90 10 78 L10 58 Q6 54 6 44 Z", APAL.skin) +
    l("M62 56 L82 56", 2.2) + l("M60 68 L80 68", 2.2),

  "\u{1F6E4}\u{FE0F}": /* path */
    r(0, 50, 100, 50, APAL.green2, 0, 2.4) +
    r(0, 0, 100, 50, "#9fd5f0", 0, 2.4) +
    p("M38 50 L62 50 L86 100 L14 100 Z", APAL.stone) +
    l("M50 56 L50 64", 4, APAL.white) + l("M50 74 L50 84", 5, APAL.white) +
    l("M50 92 L50 100", 6, APAL.white) +
    c(18, 46, 8, APAL.green, 2.4) + c(82, 46, 9, APAL.green, 2.4),

  "\u{1F4CF}": /* ruler */
    '<g transform="rotate(-20 50 50)">' +
    r(6, 40, 88, 22, APAL.yellow, 4) +
    l("M18 40 L18 50", 2.4) + l("M30 40 L30 54", 2.4) + l("M42 40 L42 50", 2.4) +
    l("M54 40 L54 54", 2.4) + l("M66 40 L66 50", 2.4) + l("M78 40 L78 54", 2.4) +
    '</g>',

  "\u{2638}\u{FE0F}": /* wheel */
    c(50, 50, 40, APAL.grey2) + c(50, 50, 31, APAL.cream, 2.6) +
    l("M50 20 L50 80", 3) + l("M20 50 L80 50", 3) +
    l("M29 29 L71 71", 3) + l("M71 29 L29 71", 3) +
    c(50, 50, 9, APAL.grey2),

  "\u{1F617}": /* whistling face */
    faceBase() + eyes2(50, 42, 13, 4) +
    e(42, 64, 7, 8, "#8c4a44", 2.6) +
    l("M58 58 Q74 56 82 50", 2.4) + l("M60 66 Q78 66 88 62", 2.4),

  "\u{23F0}": /* alarm clock */
    c(26, 20, 11, APAL.red) + c(74, 20, 11, APAL.red) +
    c(50, 54, 38, APAL.red) + c(50, 54, 30, APAL.cream, 2.6) +
    l("M50 54 L50 34", 3.4) + l("M50 54 L66 62", 3.4) +
    dot(50, 54, 3) +
    l("M16 86 L8 96", 4) + l("M84 86 L92 96", 4),

  "\u{1F944}": /* spoon */
    '<g transform="rotate(20 50 50)">' +
    r(44, 44, 12, 50, APAL.grey, 6) +
    e(50, 28, 17, 22, APAL.grey) +
    e(50, 28, 10, 14, "#e7ecf1", 2.2) +
    '</g>',

  /* ---- the three menu cards ---- */
  "\u{1F4D6}": /* open book */
    p("M50 26 Q34 14 10 18 L10 76 Q34 72 50 84 Q66 72 90 76 L90 18 Q66 14 50 26 Z", APAL.white) +
    l("M50 26 L50 84", 3) +
    l("M18 32 L40 35", 2.2) + l("M18 44 L40 47", 2.2) + l("M18 56 L40 59", 2.2) +
    l("M60 35 L82 32", 2.2) + l("M60 47 L82 44", 2.2) + l("M60 59 L82 56", 2.2),

  "\u{1F446}": /* pointing up */
    p("M34 92 Q24 92 24 80 L24 60 Q24 50 34 50 L40 50 L40 20 " +
      "Q40 10 50 10 Q60 10 60 20 L60 50 L72 50 Q82 50 82 60 L82 74 " +
      "Q82 92 66 92 Z", APAL.skin) +
    p("M24 62 Q14 60 14 70 Q14 78 24 80 Z", APAL.skin) +
    l("M50 58 L50 70", 2.2) + l("M62 58 L62 70", 2.2) + l("M73 58 L73 70", 2.2),

  "\u{1F524}": /* abc tiles */
    r(6, 26, 30, 48, APAL.cream, 7) + txt(21, 51, "a", 26, APAL.navy) +
    r(36, 26, 30, 48, APAL.cream, 7) + txt(51, 51, "b", 26, APAL.navy) +
    r(66, 26, 30, 48, APAL.cream, 7) + txt(81, 51, "c", 26, APAL.navy)
});


/* ===================== KG3 book pictures: people, faces, body ===================== */
Object.assign(PIC, {
  "😠": /* angry face */
    faceBase() +
    l("M28 34 L44 42", 3.6) + l("M72 34 L56 42", 3.6) +
    dot(38, 48, 4) + dot(62, 48, 4) +
    frown(50, 72, 12, 9) +
    l("M82 14 L88 22 M88 14 L82 22", 3, APAL.red),

  "😔": /* sorry face */
    faceBase() +
    l("M30 38 Q38 34 44 40", 3) + l("M70 38 Q62 34 56 40", 3) +
    eyesShut(50, 50, 12) +
    frown(50, 72, 8, 5) +
    p("M80 30 Q86 40 80 46 Q74 40 80 30 Z", APAL.water, 2.2),

  "🥵": /* hot face */
    c(50, 50, 37, "#ff9b6a") +
    dot(38, 44, 4) + dot(62, 44, 4) +
    e(50, 66, 11, 9, "#8c4a44", 2.6) + e(50, 71, 6, 4, APAL.pink, 0) +
    p("M18 26 Q24 38 18 44 Q12 38 18 26 Z", APAL.water, 2.2) +
    p("M84 30 Q90 42 84 48 Q78 42 84 30 Z", APAL.water, 2.2),

  "🧑‍🏫": /* teacher */
    c(50, 12, 9, APAL.hairB) +
    torso(APAL.purple) + neck() + head() + hairCap(APAL.hairB) +
    c(41, 38, 7, "none", 2.4) + c(59, 38, 7, "none", 2.4) + l("M48 38 L52 38", 2.4) +
    dot(41, 38, 2.6) + dot(59, 38, 2.6) + smile(50, 47, 7) +
    l("M70 98 L92 56", 3.6, APAL.brown2),

  "🤴": /* king */
    torso(APAL.red) + p("M42 62 L50 74 L58 62 Z", APAL.gold, 2.4) +
    neck() + head() + hairCap(APAL.hairB) +
    p("M30 22 L32 6 L42 15 L50 2 L58 15 L68 6 L70 22 Z", APAL.gold) +
    c(50, 12, 2.6, APAL.red, 0) +
    eyes2(50, 37, 8) +
    p("M38 48 Q44 43 50 47 Q56 43 62 48 Q56 52 50 49 Q44 52 38 48 Z", APAL.hairB, 2) +
    smile(50, 53, 5, 3),

  "🧔": /* uncle */
    torso(APAL.teal) + neck() + head() + hairCap(APAL.hairB) +
    c(41, 38, 7, "#e7f4fb", 2.4) + c(59, 38, 7, "#e7f4fb", 2.4) + l("M48 38 L52 38", 2.4) +
    dot(41, 38, 2.6) + dot(59, 38, 2.6) +
    p("M32 44 Q34 62 50 64 Q66 62 68 44 Q60 52 50 52 Q40 52 32 44 Z", APAL.hairB, 2.4) +
    smile(50, 53, 5, 3),

  "👮": /* police officer */
    torso(APAL.navy) + p("M45 64 L50 72 L55 64 Z", APAL.white, 2) +
    c(40, 78, 4, APAL.gold, 2) +
    neck() + head() +
    p("M26 28 Q28 10 50 10 Q72 10 74 28 Z", APAL.navy) +
    r(24, 26, 52, 7, "#22446e", 3, 2.6) +
    p("M46 14 L50 10 L54 14 L50 20 Z", APAL.gold, 1.8) +
    eyes2(50, 41, 8) + smile(50, 49, 7),

  "👶": /* baby (tot) */
    p("M26 99 C26 76 36 68 50 68 C64 68 74 76 74 99 Z", APAL.yellow) +
    c(50, 44, 28, APAL.skin) +
    l("M50 16 Q44 8 52 6", 3, APAL.hairB) +
    e(22, 46, 5, 7, APAL.skin) + e(78, 46, 5, 7, APAL.skin) +
    eyes2(50, 42, 10, 3.6) + cheeks(50, 52, 17) +
    smile(50, 54, 7, 6),

  "👬": /* men */
    '<g transform="translate(-14 6) scale(0.72)">' +
    torso(APAL.navy) + neck() + head() + hairCap(APAL.hairB) + eyes2(50, 38, 8) + smile(50, 46, 7) +
    '</g><g transform="translate(42 6) scale(0.72)">' +
    torso(APAL.green) + neck() + head() + hairCap(APAL.black) +
    c(41, 38, 7, "none", 2.4) + c(59, 38, 7, "none", 2.4) + l("M48 38 L52 38", 2.4) +
    dot(41, 38, 2.6) + dot(59, 38, 2.6) + smile(50, 47, 7) +
    '</g>',

  "👫": /* children */
    '<g transform="translate(-14 10) scale(0.72)">' +
    torso(APAL.blue) + neck() + head() + hairCap(APAL.hairB) + eyes2(50, 38, 8) + smile(50, 46, 8) +
    '</g><g transform="translate(42 10) scale(0.72)">' +
    c(24, 48, 9, APAL.hairY) + c(76, 48, 9, APAL.hairY) +
    torso(APAL.pink) + neck() + head() + hairCap(APAL.hairY) +
    eyes2(50, 38, 8) + smile(50, 46, 8) + cheeks(50, 44, 16) +
    '</g>',

  "🧟": /* friendly cartoon zombie */
    p("M25 99 C25 73 35 62 50 62 C65 62 75 73 75 99 L66 92 L58 99 L50 92 L42 99 L34 92 Z", APAL.purple) +
    r(44, 54, 12, 10, "#a8d28a", 3) +
    c(50, 38, 22, "#a8d28a") +
    p("M28 34 L32 18 L38 26 L44 14 L50 24 L56 14 L62 26 L68 18 L72 34 Q60 26 50 28 Q40 26 28 34 Z", APAL.black) +
    c(41, 38, 6, APAL.white, 2.2) + c(59, 38, 5, APAL.white, 2.2) +
    dot(42, 39, 2.6) + dot(58, 38, 2.2) +
    l("M40 50 L44 48 L48 51 L52 48 L56 51 L60 48", 2.4) +
    l("M64 30 L70 34", 2.2),

  "🏋️": /* strength - lifting a weight */
    r(6, 14, 88, 6, APAL.grey2, 3, 2.4) +
    r(4, 4, 12, 26, APAL.black, 3) + r(84, 4, 12, 26, APAL.black, 3) +
    l("M30 66 L24 40 L30 18", 7, APAL.skin) + l("M70 66 L76 40 L70 18", 7, APAL.skin) +
    p("M32 99 C32 76 40 66 50 66 C60 66 68 76 68 99 Z", APAL.red) +
    c(50, 50, 15, APAL.skin) +
    p("M36 48 Q36 34 50 34 Q64 34 64 48 Q58 40 50 40 Q42 40 36 48 Z", APAL.hairB) +
    dot(44, 50, 2.4) + dot(56, 50, 2.4) + l("M44 57 L56 57", 2.6) +
    p("M70 46 Q74 52 70 56 Q66 52 70 46 Z", APAL.water, 1.8),

  "🦶": /* kick */
    p("M20 8 L36 8 L40 54 L64 62 Q78 66 76 76 Q74 84 60 82 L28 76 Q22 74 22 66 Z", APAL.blue) +
    p("M40 58 L64 62 Q78 66 76 76 Q74 84 60 82 L36 78 Z", APAL.red) +
    c(84, 40, 13, APAL.white) +
    p("M84 30 L90 36 L88 44 L80 44 L78 36 Z", APAL.black, 1.6) +
    l("M66 30 L74 34 M64 42 L72 42 M66 54 L74 50", 2.4),

  "👕": /* clothes / t-shirt */
    p("M34 14 Q50 24 66 14 L92 28 L82 46 L72 40 L72 90 L28 90 L28 40 L18 46 L8 28 Z", APAL.teal) +
    l("M34 14 Q50 30 66 14", 2.6) +
    c(50, 56, 7, APAL.yellow, 2.2),

  "👗": /* dress */
    p("M38 10 L44 10 Q50 18 56 10 L62 10 L64 34 L56 40 L82 90 Q50 98 18 90 L44 40 L36 34 Z", APAL.pink) +
    l("M36 34 Q50 42 64 34", 2.6) +
    c(40, 66, 3, APAL.white, 1.6) + c(56, 60, 3, APAL.white, 1.6) + c(50, 78, 3, APAL.white, 1.6) +
    c(64, 80, 3, APAL.white, 1.6) + c(34, 82, 3, APAL.white, 1.6),

  "🧥": /* jacket */
    p("M30 12 L42 8 L50 20 L58 8 L70 12 L90 30 L84 86 L72 86 L72 92 L28 92 L28 86 L16 86 L10 30 Z", APAL.red) +
    l("M50 20 L50 92", 2.6) +
    p("M42 8 L50 20 L40 30 Z", APAL.cream, 2.2) + p("M58 8 L50 20 L60 30 Z", APAL.cream, 2.2) +
    dot(54, 40, 2.4) + dot(54, 54, 2.4) + dot(54, 68, 2.4) +
    r(30, 56, 12, 9, APAL.navy, 2, 2.2) + r(58, 56, 12, 9, APAL.navy, 2, 2.2),

  "🩲": /* underwear */
    p("M10 24 L90 24 L86 44 Q70 52 62 78 L38 78 Q30 52 14 44 Z", APAL.white) +
    r(10, 20, 80, 10, APAL.blue, 3, 2.6) +
    c(30, 42, 4, APAL.red, 0) + c(50, 50, 4, APAL.red, 0) + c(70, 42, 4, APAL.red, 0) +
    c(46, 66, 4, APAL.red, 0) + c(58, 64, 3.4, APAL.red, 0),

  "shoulders": /* shoulders */
    p("M6 99 Q8 70 30 66 L70 66 Q92 70 94 99 Z", APAL.yellow) +
    neck() + head() + hairCap(APAL.hairB) + eyes2(50, 38, 8) + smile(50, 46, 7) +
    p("M10 46 L22 60 L14 62 Z", APAL.red, 2) + l("M8 40 L18 56", 3, APAL.red) +
    p("M90 46 L78 60 L86 62 Z", APAL.red, 2) + l("M92 40 L82 56", 3, APAL.red),

  "lap": /* lap - sitting on a stool */
    r(16, 66, 40, 8, APAL.brown, 2) + l("M22 74 L18 98 M50 74 L54 98", 4, APAL.brown2) +
    p("M14 30 L34 30 L34 66 L14 66 Z", APAL.blue) +
    p("M14 50 L80 50 Q86 50 86 56 L86 66 L14 66 Z", APAL.navy) +
    p("M72 64 L86 64 L86 92 L72 92 Z", APAL.skin) +
    p("M70 90 L92 90 Q96 98 88 98 L70 98 Z", APAL.red) +
    p("M50 12 L58 30 L54 30 L54 44 L46 44 L46 30 L42 30 Z", APAL.red, 2),

  "rub": /* hands rubbing */
    '<g transform="rotate(-20 50 50)">' +
    p("M14 40 L70 40 Q80 40 80 48 Q80 56 70 56 L14 56 Z", APAL.skin) +
    p("M20 54 L76 54 Q86 54 86 62 Q86 70 76 70 L20 70 Z", APAL.skin2) +
    l("M58 40 L58 48 M66 40 L66 48", 2) +
    '</g>' +
    l("M84 16 Q90 22 84 28 M90 10 Q98 22 90 34", 2.6) +
    l("M16 72 Q10 78 16 84 M10 66 Q2 78 10 90", 2.6),

  "💓": /* health - heart with heartbeat */
    p("M50 88 Q10 62 12 36 Q14 14 34 14 Q46 14 50 28 Q54 14 66 14 Q86 14 88 36 Q90 62 50 88 Z", APAL.red) +
    l("M14 50 L34 50 L40 38 L48 64 L56 30 L62 50 L86 50", 3.4, APAL.white),

  "🦷": /* tooth */
    p("M24 18 Q36 10 50 18 Q64 10 76 18 Q88 28 82 46 Q76 64 72 88 Q70 96 64 92 L56 66 Q50 60 44 66 L36 92 Q30 96 28 88 Q24 64 18 46 Q12 28 24 18 Z", APAL.white) +
    dot(40, 36, 3.6) + dot(60, 36, 3.6) + smile(50, 44, 7, 6) +
    l("M30 24 Q26 30 28 36", 2.4, "#cfe8f5"),

  "🪥": /* toothbrush */
    '<g transform="rotate(-30 50 50)">' +
    r(8, 46, 70, 10, APAL.blue, 5) +
    r(70, 30, 22, 16, APAL.white, 3, 2.4) +
    l("M74 30 L74 22 M80 30 L80 20 M86 30 L86 22", 3, APAL.teal) +
    '</g>' +
    c(26, 26, 7, APAL.white, 2) + c(38, 16, 5, APAL.white, 2),

  "🐾": /* pet - a boy hugging his puppy */
    torso(APAL.blue) + neck() + head() + hairCap(APAL.hairB) +
    eyesArc(50, 38, 8) + smile(50, 46, 8) +
    '<g transform="translate(28 46) scale(0.5)">' +
    e(16, 52, 9, 20, APAL.brown2) + e(84, 52, 9, 20, APAL.brown2) +
    c(50, 50, 30, APAL.cream) + eyes2(50, 44, 11, 4) +
    e(50, 62, 7, 5.5, APAL.black, 2.4) + smile(50, 72, 8, 5) +
    '</g>' +
    e(24, 82, 10, 7, APAL.skin) + e(76, 82, 10, 7, APAL.skin) +
    p("M80 14 Q84 6 90 10 Q96 14 88 22 L80 28 L72 22 Q66 14 72 10 Q78 6 80 14 Z", APAL.red, 2)
});

/* ===================== KG3 book pictures: animals ===================== */
Object.assign(PIC, {
  "🐊": /* alligator */
    p("M6 70 Q20 58 40 60 L56 56 Q76 50 94 58 Q98 66 88 68 L60 70 Q60 82 44 84 Q20 86 6 70 Z", APAL.green) +
    p("M56 56 L60 70 L88 68 Q98 66 94 58", APAL.green, 3) +
    l("M62 62 L64 66 L68 62 L72 66 L76 62 L80 66 L84 62", 2, APAL.white) +
    c(52, 50, 7, APAL.white, 2.4) + dot(53, 50, 3) +
    p("M18 64 L22 56 L26 64 M30 62 L34 54 L38 62", APAL.green2, 2.2) +
    l("M24 82 L22 94 M42 84 L42 96", 6, APAL.green2) +
    l("M6 70 Q-2 78 4 84", 5, APAL.green2),

  "🐸": /* frog */
    e(50, 66, 34, 24, APAL.green) +
    c(32, 38, 12, APAL.green) + c(68, 38, 12, APAL.green) +
    c(32, 36, 6, APAL.white, 2.2) + c(68, 36, 6, APAL.white, 2.2) +
    dot(32, 37, 3) + dot(68, 37, 3) +
    smile(50, 62, 18, 10) +
    e(20, 88, 12, 6, APAL.green2) + e(80, 88, 12, 6, APAL.green2) +
    '<circle cx="34" cy="72" r="4" fill="#3f8f4a"/><circle cx="66" cy="74" r="3" fill="#3f8f4a"/>',

  "🦒": /* giraffe */
    '<g transform="translate(6 9) scale(0.9)">' +
    p("M38 98 L40 50 Q40 30 46 18 L58 18 Q60 34 58 50 L60 98 Z", APAL.yellow) +
    e(52, 16, 16, 11, APAL.yellow) +
    l("M44 8 L42 0 M58 8 L60 0", 3) + c(42, 0, 3, APAL.brown2, 1.6) + c(60, 0, 3, APAL.brown2, 1.6) +
    dot(50, 13, 2.8) + dot(60, 13, 2.8) + e(64, 20, 4, 3, APAL.brown, 1.6) +
    c(46, 40, 4, APAL.brown, 0) + c(54, 54, 5, APAL.brown, 0) + c(44, 66, 4, APAL.brown, 0) +
    c(52, 80, 5, APAL.brown, 0) + c(46, 92, 3, APAL.brown, 0) + '</g>',

  "🦍": /* gorilla */
    e(50, 72, 34, 26, APAL.black) +
    c(50, 38, 24, APAL.black) +
    e(50, 44, 15, 13, APAL.stone, 2.4) +
    dot(43, 36, 3) + dot(57, 36, 3) + l("M40 31 L60 31", 3) +
    dot(46, 46, 1.8) + dot(54, 46, 1.8) + smile(50, 52, 5, 3) +
    e(50, 76, 16, 14, APAL.stone, 2.4) +
    e(16, 88, 10, 8, APAL.black) + e(84, 88, 10, 8, APAL.black),

  "🪼": /* jellyfish */
    l("M30 56 Q24 72 32 86 Q38 96 30 98", 3.4, APAL.purple) +
    l("M44 58 Q40 76 46 88", 3.4, APAL.purple) +
    l("M56 58 Q60 76 54 90", 3.4, APAL.purple) +
    l("M70 56 Q76 72 68 86 Q62 96 70 98", 3.4, APAL.purple) +
    p("M14 56 Q14 14 50 14 Q86 14 86 56 Q78 50 68 58 Q58 50 50 58 Q42 50 32 58 Q22 50 14 56 Z", APAL.pink) +
    dot(40, 38, 3.4) + dot(60, 38, 3.4) + smile(50, 44, 6, 5) + cheeks(50, 44, 18),

  "🐨": /* koala */
    c(18, 34, 15, APAL.grey) + c(82, 34, 15, APAL.grey) +
    c(18, 34, 8, APAL.pink, 2.2) + c(82, 34, 8, APAL.pink, 2.2) +
    c(50, 54, 32, APAL.grey) +
    dot(38, 48, 3.6) + dot(62, 48, 3.6) +
    e(50, 62, 9, 11, APAL.black, 2.4) + smile(50, 76, 6, 4),

  "🦦": /* otter (doctor) */
    e(50, 76, 28, 24, APAL.brown) + e(50, 80, 16, 16, APAL.cream, 2.4) +
    c(24, 30, 7, APAL.brown) + c(76, 30, 7, APAL.brown) +
    c(50, 40, 25, APAL.brown) +
    e(50, 50, 14, 10, APAL.cream, 2.2) +
    dot(41, 36, 3.2) + dot(59, 36, 3.2) + e(50, 46, 5, 3.6, APAL.black, 2) +
    smile(50, 53, 5, 3) +
    l("M38 49 L28 47 M38 52 L28 54 M62 49 L72 47 M62 52 L72 54", 1.6) +
    p("M28 18 Q50 6 72 18 L68 24 Q50 16 32 24 Z", APAL.white, 2.2) + c(50, 14, 4, APAL.red, 1.6),

  "🦜": /* parrot */
    p("M40 70 L30 98 L42 96 L48 74 Z", APAL.blue) +
    e(52, 60, 20, 26, APAL.red) +
    c(54, 30, 16, APAL.red) +
    p("M66 26 Q82 28 78 44 Q72 38 66 38 Z", APAL.gold, 2.4) +
    c(56, 26, 6, APAL.white, 2) + dot(57, 26, 3) +
    p("M38 52 Q30 70 46 82 Q58 70 52 52 Z", APAL.green, 2.4) +
    p("M42 60 Q38 70 46 76", APAL.yellow, 2) +
    l("M44 86 L44 94 M58 86 L58 94", 3, APAL.grey2),

  "quail": /* quail */
    e(50, 64, 34, 24, APAL.brown) +
    c(72, 40, 16, APAL.brown) +
    l("M72 24 Q70 14 78 10", 3) + c(79, 10, 4, APAL.brown2, 2) +
    p("M86 38 L96 42 L86 46 Z", APAL.orange, 2) +
    dot(76, 37, 3) + l("M62 46 Q72 52 84 48", 2.4, APAL.white) +
    c(36, 60, 2.4, APAL.white, 0) + c(48, 70, 2.4, APAL.white, 0) + c(30, 72, 2.4, APAL.white, 0) +
    c(56, 58, 2.4, APAL.white, 0) + c(42, 52, 2.4, APAL.white, 0) +
    p("M18 56 L4 48 L10 66 Z", APAL.brown2, 2.4) +
    l("M44 86 L42 96 M58 86 L60 96", 3, APAL.orange),

  "🐇": /* rabbit */
    e(36, 22, 8, 20, APAL.white) + e(64, 22, 8, 20, APAL.white) +
    e(36, 24, 4, 13, APAL.pink, 0) + e(64, 24, 4, 13, APAL.pink, 0) +
    e(50, 80, 26, 18, APAL.white) +
    c(50, 52, 22, APAL.white) +
    dot(42, 48, 3.2) + dot(58, 48, 3.2) +
    p("M47 56 L53 56 L50 60 Z", APAL.pink, 1.8) + smile(50, 62, 5, 3) +
    l("M38 58 L24 56 M62 58 L76 56", 1.8) +
    c(78, 82, 7, APAL.white),

  "🦏": /* rhino */
    e(48, 64, 40, 26, APAL.grey) +
    p("M70 46 Q92 44 94 62 Q94 76 80 76 L66 74 Z", APAL.grey) +
    p("M86 48 L92 26 L80 46 Z", APAL.cream, 2.4) +
    p("M76 46 L78 36 L72 46 Z", APAL.cream, 2) +
    dot(76, 56, 3) + c(66, 44, 5, APAL.grey) +
    l("M88 68 Q84 72 80 68", 2.2) +
    r(16, 82, 12, 16, APAL.grey, 3) + r(36, 84, 12, 14, APAL.grey, 3) +
    r(58, 84, 12, 14, APAL.grey, 3) +
    l("M8 60 Q2 66 6 72", 3),

  "🐌": /* snail */
    p("M8 84 Q8 74 22 74 L76 74 Q86 74 86 60 L86 46 Q86 38 92 38 Q98 40 96 50 L94 86 Q94 92 86 92 L16 92 Q8 92 8 84 Z", "#c9e39a") +
    l("M86 40 L82 26 M92 38 L96 24", 2.4) + c(82, 24, 3, APAL.black, 0) + c(96, 22, 3, APAL.black, 0) +
    smile(90, 56, 3, 2) + dot(89, 48, 2.2) +
    c(46, 54, 28, APAL.orange) +
    l("M46 54 Q46 44 56 46 Q66 50 62 62 Q56 74 42 70 Q28 64 30 50 Q34 34 52 32", 2.8),

  "🪲": /* beetle (bug) */
    l("M28 46 L10 38 M26 62 L8 64 M30 78 L14 90", 3) +
    l("M72 46 L90 38 M74 62 L92 64 M70 78 L86 90", 3) +
    e(50, 64, 26, 30, APAL.green2) +
    l("M50 36 L50 94", 2.6) +
    c(50, 28, 13, APAL.black) +
    l("M44 18 Q36 6 28 8 M56 18 Q64 6 72 8", 2.6) +
    c(45, 26, 3.4, APAL.white, 1.6) + c(55, 26, 3.4, APAL.white, 1.6) +
    c(38, 58, 4, APAL.green, 0) + c(62, 74, 4, APAL.green, 0),

  "🐕": /* dog wagging its tail */
    l("M80 44 Q92 30 88 18", 6, APAL.brown2) +
    l("M88 8 Q96 12 98 20 M78 10 Q82 4 90 4", 2.4) +
    e(56, 58, 28, 18, APAL.brown) +
    r(34, 66, 10, 26, APAL.brown, 4) + r(68, 66, 10, 26, APAL.brown, 4) +
    c(28, 40, 18, APAL.brown) +
    e(16, 44, 7, 15, APAL.brown2) +
    e(16, 50, 9, 6, APAL.cream, 2) + dot(10, 48, 3) +
    dot(28, 36, 3) + smile(18, 56, 4, 3),

  "pup": /* puppy */
    e(50, 80, 24, 16, APAL.cream) +
    e(34, 92, 9, 6, APAL.cream) + e(66, 92, 9, 6, APAL.cream) +
    e(20, 40, 10, 18, APAL.black) + e(80, 40, 10, 18, APAL.black) +
    c(50, 44, 26, APAL.cream) +
    c(62, 38, 9, APAL.brown, 0) +
    dot(42, 40, 3.6) + dot(60, 40, 3.6) +
    e(50, 52, 6, 4.4, APAL.black, 2) + smile(50, 58, 6, 4) +
    p("M46 62 Q50 72 54 62 Z", APAL.pink, 1.8) +
    r(34, 66, 32, 6, APAL.red, 3, 2.2) + c(50, 72, 3, APAL.gold, 1.6),

  "🐏": /* ram */
    e(50, 70, 32, 20, APAL.cream) +
    c(28, 62, 8, APAL.cream, 2.2) + c(40, 56, 8, APAL.cream, 2.2) + c(58, 56, 8, APAL.cream, 2.2) +
    c(72, 62, 8, APAL.cream, 2.2) +
    r(30, 82, 8, 16, APAL.black, 3) + r(62, 82, 8, 16, APAL.black, 3) +
    e(50, 38, 16, 20, APAL.stone) +
    p("M36 28 Q16 22 18 42 Q20 56 34 50 Q26 44 30 38 Q34 34 38 36 Z", APAL.brown) +
    p("M64 28 Q84 22 82 42 Q80 56 66 50 Q74 44 70 38 Q66 34 62 36 Z", APAL.brown) +
    dot(44, 36, 3) + dot(56, 36, 3) + e(50, 52, 6, 4, APAL.black, 2),

  "🦈": /* shark fin in the sea */
    r(0, 60, 100, 40, APAL.water, 0, 2.6) +
    p("M30 62 Q46 34 58 10 Q62 40 76 62 Z", APAL.grey2) +
    l("M4 66 Q14 58 24 66 T44 66 T64 66 T84 66 T100 66", 3, APAL.white) +
    l("M10 84 Q18 80 26 84 M60 88 Q68 84 76 88", 2.4, "#cdeeff"),

  "🐬": /* dolphin */
    p("M8 62 Q24 34 56 34 Q80 34 90 46 L98 46 Q96 54 88 54 Q78 70 52 70 L36 70 L22 84 L24 68 Q14 68 8 62 Z", APAL.blue) +
    p("M50 34 Q56 20 66 18 Q62 28 64 36 Z", APAL.blue) +
    p("M30 60 Q50 68 74 60 Q60 70 40 68 Z", "#cfe8f5", 2) +
    dot(76, 44, 3.2) + l("M86 52 Q82 56 78 54", 2.2) +
    l("M10 92 Q20 86 30 92 T50 92 T70 92 T90 92", 3, APAL.water)
});

/* ===================== KG3 book pictures: things (1) ===================== */
function numTile(s, col) {
  return r(14, 10, 72, 80, col || APAL.navy, 14) + txt(50, 52, s, s.length > 1 ? 44 : 58, APAL.white);
}

Object.assign(PIC, {
  "📚": /* books */
    r(12, 70, 76, 16, APAL.red, 3) + l("M18 78 L82 78", 2, APAL.white) +
    r(18, 54, 66, 16, APAL.blue, 3) + l("M24 62 L78 62", 2, APAL.white) +
    r(14, 38, 70, 16, APAL.green, 3) + l("M20 46 L78 46", 2, APAL.white) +
    '<g transform="rotate(-10 50 30)">' + r(22, 22, 60, 16, APAL.gold, 3) +
    l("M28 30 L76 30", 2, APAL.white) + '</g>',

  "🗑️": /* bin */
    r(18, 14, 64, 12, APAL.grey2, 4) + r(40, 6, 20, 8, APAL.grey2, 3, 2.4) +
    p("M22 26 L78 26 L72 94 L28 94 Z", APAL.grey) +
    l("M36 34 L38 86 M50 34 L50 86 M64 34 L62 86", 3, APAL.grey2),

  "mat": /* mat / carpet */
    p("M10 40 L90 40 L96 76 L4 76 Z", APAL.red) +
    p("M20 46 L80 46 L84 70 L16 70 Z", APAL.gold, 2.4) +
    p("M34 52 L66 52 L68 64 L32 64 Z", APAL.teal, 2.2) +
    l("M8 40 L4 32 M20 40 L18 32 M32 40 L31 32 M44 40 L44 32 M56 40 L56 32 M68 40 L69 32 M80 40 L82 32 M90 40 L94 32", 2.2) +
    l("M6 76 L2 86 M18 76 L16 86 M32 76 L31 86 M46 76 L46 86 M60 76 L61 86 M74 76 L76 86 M88 76 L92 86", 2.2),

  "🕐": /* clock */
    c(50, 50, 40, APAL.white) + c(50, 50, 40, "none", 4) +
    dot(50, 16, 3) + dot(84, 50, 3) + dot(50, 84, 3) + dot(16, 50, 3) +
    dot(67, 21, 2) + dot(79, 33, 2) + dot(79, 67, 2) + dot(67, 79, 2) +
    dot(33, 79, 2) + dot(21, 67, 2) + dot(21, 33, 2) + dot(33, 21, 2) +
    l("M50 50 L50 24", 4) + l("M50 50 L70 50", 4) + c(50, 50, 4, APAL.red, 2),

  "☁️": /* cloudy */
    p("M22 70 Q6 70 6 56 Q6 42 22 44 Q22 24 44 24 Q58 24 64 36 Q72 30 80 34 Q94 40 92 56 Q92 70 78 70 Z", APAL.white) +
    p("M30 88 Q20 88 20 80 Q20 72 30 74 Q34 64 46 66 Q54 60 64 66 Q76 66 76 78 Q76 88 66 88 Z", APAL.grey, 2.6),

  "💎": /* diamond */
    p("M28 20 L72 20 L92 42 L50 94 L8 42 Z", "#bfe9fb") +
    l("M8 42 L92 42", 2.6) +
    l("M28 20 L38 42 L50 94 L62 42 L72 20 M38 42 L50 20 L62 42", 2.4) +
    l("M22 30 L28 38", 2.4, APAL.white),

  "✉️": /* envelope / letter */
    r(8, 22, 84, 58, APAL.white, 4) +
    l("M8 24 L50 56 L92 24", 3) + l("M8 78 L38 50 M92 78 L62 50", 2.4) +
    r(70, 30, 14, 14, APAL.red, 2, 2),

  "✏️": /* pencil */
    '<g transform="rotate(-40 50 50)">' +
    r(40, 6, 20, 14, APAL.pink, 4) + r(40, 18, 20, 6, APAL.grey, 0, 2.4) +
    r(40, 24, 20, 50, APAL.yellow, 0) + l("M50 24 L50 74", 2) +
    p("M40 74 L60 74 L50 94 Z", APAL.sand) + p("M46 86 L54 86 L50 95 Z", AK, 1.6) +
    '</g>',

  "🎣": /* fishing rod */
    l("M14 92 L78 10", 4.4, APAL.brown2) +
    c(26, 80, 6, APAL.grey) +
    l("M78 10 Q90 30 88 70", 1.8) +
    c(88, 74, 4, APAL.red, 2) + l("M88 78 Q88 88 82 86", 2.4),

  "5️⃣": /* five */ numTile("5", APAL.purple),
  "4️⃣": /* four */ numTile("4", APAL.teal),
  "9️⃣": /* number nine (with a face, napping) */
    numTile("9", APAL.blue) + l("M70 22 L78 22 L70 30 L78 30", 2.4, APAL.white) +
    l("M82 10 L88 10 L82 16 L88 16", 2, APAL.white),
  "7️⃣": /* seven */ numTile("7", APAL.red),
  "2️⃣": /* two */ numTile("2", APAL.green2),
  "16": /* sixteen */ numTile("16", APAL.orange),

  "fan": /* electric fan */
    r(14, 10, 72, 78, APAL.white, 8) +
    c(50, 48, 30, "#e8eef3", 2.6) +
    p("M50 48 Q40 22 56 20 Q62 34 50 48 Z", APAL.blue, 2.2) +
    p("M50 48 Q76 38 78 54 Q64 60 50 48 Z", APAL.blue, 2.2) +
    p("M50 48 Q58 74 42 76 Q38 62 50 48 Z", APAL.blue, 2.2) +
    p("M50 48 Q24 58 22 42 Q36 36 50 48 Z", APAL.blue, 2.2) +
    c(50, 48, 5, APAL.grey2, 2) +
    r(26, 88, 48, 8, APAL.grey2, 3),

  "⛳": /* golf flag */
    r(0, 78, 100, 22, APAL.green, 0, 2.6) +
    e(56, 86, 12, 4, APAL.black, 0) +
    l("M56 86 L56 10", 3.4) +
    p("M56 10 L88 20 L56 32 Z", APAL.red) +
    c(28, 78, 6, APAL.white, 2.2),

  "🧴": /* glue */
    '<g transform="rotate(25 50 50)">' +
    r(30, 34, 40, 56, APAL.white, 8) + r(30, 50, 40, 22, APAL.orange, 2, 2.4) +
    txt(50, 61, "GLUE", 11, APAL.white) +
    p("M40 34 L44 18 L56 18 L60 34 Z", APAL.orange) + p("M46 18 L50 4 L54 18 Z", APAL.white, 2.2) +
    '</g>',

  "🌾": /* grass */
    p("M4 92 L96 92 L96 98 L4 98 Z", APAL.green2, 2) +
    p("M8 92 L14 40 L20 92 Z", APAL.green, 2.2) + p("M18 92 L30 28 L32 92 Z", APAL.green2, 2.2) +
    p("M30 92 L40 46 L46 92 Z", APAL.green, 2.2) + p("M42 92 L52 22 L58 92 Z", APAL.green2, 2.2) +
    p("M56 92 L64 42 L70 92 Z", APAL.green, 2.2) + p("M68 92 L80 30 L82 92 Z", APAL.green2, 2.2) +
    p("M80 92 L90 48 L94 92 Z", APAL.green, 2.2),

  "🧊": /* igloo */
    p("M6 86 Q6 22 50 22 Q94 22 94 86 Z", APAL.white) +
    p("M34 86 L34 66 Q34 52 50 52 Q66 52 66 66 L66 86 Z", "#3a4654") +
    l("M10 70 L34 70 M66 70 L90 70 M14 54 L86 54 M24 38 L76 38", 2, "#9bc7e0") +
    l("M30 38 L28 54 M50 22 L50 38 M70 38 L72 54 M18 54 L16 70 M84 54 L86 70", 2, "#9bc7e0") +
    l("M2 86 L98 86", 3),

  "🖋️": /* ink */
    r(30, 14, 40, 14, APAL.black, 3) +
    p("M24 30 L76 30 L80 88 Q80 94 74 94 L26 94 Q20 94 20 88 Z", APAL.pink) +
    r(30, 48, 40, 24, APAL.white, 3, 2.4) + txt(50, 60, "INK", 14, "#d0457a") +
    c(86, 86, 4, APAL.pink, 0) + c(92, 76, 2.6, APAL.pink, 0),

  "pink": /* pink crayon */
    '<g transform="rotate(-40 50 50)">' +
    r(38, 22, 24, 66, APAL.pink, 4) +
    l("M38 34 L62 34 M38 76 L62 76", 2.4) +
    p("M38 22 L44 6 L56 6 L62 22 Z", APAL.pink) +
    txt(50, 55, "pink", 10, APAL.white) +
    '</g>',

  "yellow": /* yellow crayon */
    '<g transform="rotate(-40 50 50)">' +
    r(38, 22, 24, 66, APAL.yellow, 4) +
    l("M38 34 L62 34 M38 76 L62 76", 2.4) +
    p("M38 22 L44 6 L56 6 L62 22 Z", APAL.yellow) +
    '</g>',

  "🖍️": /* red crayon */
    '<g transform="rotate(-40 50 50)">' +
    r(38, 22, 24, 66, APAL.red, 4) +
    l("M38 34 L62 34 M38 76 L62 76", 2.4) +
    p("M38 22 L44 6 L56 6 L62 22 Z", APAL.red) +
    txt(50, 55, "RED", 10, APAL.white) +
    '</g>',

  "🚕": /* taxi */
    p("M10 62 L18 42 Q22 34 32 34 L68 34 Q78 34 82 42 L90 62 Z", APAL.yellow) +
    r(6, 60, 88, 20, APAL.yellow, 6) +
    r(38, 22, 24, 12, APAL.white, 3, 2.4) + txt(50, 28, "TAXI", 8) +
    p("M24 58 L30 42 L48 42 L48 58 Z", "#cfeaf7", 2.4) +
    p("M52 58 L52 42 L70 42 L76 58 Z", "#cfeaf7", 2.4) +
    l("M10 70 L90 70", 2, "#33302e") +
    c(28, 80, 9, APAL.black) + c(28, 80, 3.6, APAL.grey, 1.6) +
    c(72, 80, 9, APAL.black) + c(72, 80, 3.6, APAL.grey, 1.6),

  "🫘": /* jolly jelly bean */
    p("M26 30 Q34 8 58 14 Q84 22 80 50 Q76 76 54 86 Q28 94 20 70 Q14 54 26 48 Q20 40 26 30 Z", APAL.red) +
    dot(44, 40, 3.6) + dot(62, 42, 3.6) + smile(52, 54, 9, 8) +
    l("M34 26 Q30 30 30 36", 2.4, APAL.white) +
    l("M28 88 L22 98 M58 86 L64 98", 3),

  "🍮": /* jelly */
    e(50, 84, 44, 10, APAL.white) +
    p("M20 82 L26 34 Q28 24 50 24 Q72 24 74 34 L80 82 Q50 92 20 82 Z", APAL.orange) +
    l("M38 30 L36 80 M62 30 L64 80", 2.2, "#ffd09a") +
    e(50, 30, 24, 7, "#ffc07a", 2.4) +
    dot(42, 52, 3.4) + dot(58, 52, 3.4) + smile(50, 60, 6, 5),

  "❤️": /* love */
    p("M50 88 Q10 62 12 36 Q14 14 34 14 Q46 14 50 28 Q54 14 66 14 Q86 14 88 36 Q90 62 50 88 Z", APAL.red) +
    dot(38, 42, 3.6) + dot(62, 42, 3.6) + smile(50, 52, 8, 6) + cheeks(50, 54, 20),

  "🍋": /* lemon */
    p("M12 52 Q14 24 46 18 Q78 14 88 46 Q90 76 58 84 Q22 90 12 52 Z", APAL.yellow) +
    p("M86 40 L96 34 L92 46 Z", APAL.yellow, 2.4) +
    p("M50 16 Q60 2 72 8 Q64 18 50 16 Z", APAL.green, 2.2) +
    l("M28 38 Q24 46 26 54", 2.4, APAL.white),

  "🎥": /* movie camera */
    c(30, 26, 14, APAL.grey2) + c(30, 26, 5, APAL.black, 2) +
    c(62, 26, 14, APAL.grey2) + c(62, 26, 5, APAL.black, 2) +
    r(14, 40, 60, 38, APAL.black) + c(30, 59, 6, APAL.red, 2) +
    p("M74 50 L94 40 L94 78 L74 68 Z", APAL.grey2) +
    l("M30 78 L22 96 M58 78 L66 96", 3),

  "📅": /* Monday calendar */
    r(12, 16, 76, 74, APAL.white, 6) + r(12, 16, 76, 20, APAL.red, 6) +
    l("M30 8 L30 22 M70 8 L70 22", 4) +
    txt(50, 27, "MON", 13, APAL.white) +
    txt(50, 62, "Monday", 13),

  "🗓️": /* March calendar */
    r(12, 16, 76, 74, APAL.white, 6) + r(12, 16, 76, 20, APAL.green2, 6) +
    l("M30 8 L30 22 M70 8 L70 22", 4) +
    txt(50, 27, "MARCH", 12, APAL.white) +
    r(20, 44, 10, 8, APAL.grey, 1, 1.4) + r(34, 44, 10, 8, APAL.grey, 1, 1.4) + r(48, 44, 10, 8, APAL.grey, 1, 1.4) +
    r(62, 44, 10, 8, APAL.grey, 1, 1.4) + r(20, 58, 10, 8, APAL.grey, 1, 1.4) + r(34, 58, 10, 8, APAL.red, 1, 1.4) +
    r(48, 58, 10, 8, APAL.grey, 1, 1.4) + r(62, 58, 10, 8, APAL.grey, 1, 1.4) +
    r(20, 72, 10, 8, APAL.grey, 1, 1.4) + r(34, 72, 10, 8, APAL.grey, 1, 1.4) + r(48, 72, 10, 8, APAL.grey, 1, 1.4),

  "mug": /* mug */
    l("M70 38 Q92 38 92 56 Q92 74 70 72", 13) +
    l("M70 38 Q92 38 92 56 Q92 74 70 72", 7, APAL.blue) +
    r(16, 24, 56, 68, APAL.blue, 8) +
    e(44, 24, 28, 6, "#6e4a2a", 2.6) +
    c(44, 58, 10, APAL.white, 2.2) + smile(44, 58, 5, 4),

  "🚫": /* NO! */
    p("M50 4 L60 22 L80 12 L76 34 L96 40 L78 54 L92 72 L70 72 L70 94 L54 80 L40 96 L36 74 L14 82 L22 62 L4 52 L22 42 L12 22 L34 26 L38 6 Z", APAL.white) +
    txt(50, 50, "NO!", 26, APAL.red),

  "💡": /* light switch ON */
    r(24, 10, 52, 80, APAL.white, 8) +
    r(38, 24, 24, 52, APAL.grey, 4, 2.4) +
    r(40, 26, 20, 24, APAL.green, 3, 2.2) +
    txt(50, 38, "ON", 10, APAL.white) +
    p("M70 70 L82 62 L80 76 Z", APAL.skin, 2),

  "🔌": /* light switch OFF */
    r(24, 10, 52, 80, APAL.white, 8) +
    r(38, 24, 24, 52, APAL.grey, 4, 2.4) +
    r(40, 50, 20, 24, APAL.red, 3, 2.2) +
    txt(50, 62, "OFF", 9, APAL.white),

  "pillow": /* pillow */
    p("M10 30 Q30 22 50 28 Q70 22 90 30 Q84 50 90 70 Q70 78 50 72 Q30 78 10 70 Q16 50 10 30 Z", APAL.white) +
    l("M22 40 Q50 34 78 40 M22 60 Q50 66 78 60", 2, "#c3d4e6") +
    c(10, 30, 4, APAL.blue, 2) + c(90, 30, 4, APAL.blue, 2) +
    c(10, 70, 4, APAL.blue, 2) + c(90, 70, 4, APAL.blue, 2)
});

/* ===================== KG3 book pictures: things (2) ===================== */
Object.assign(PIC, {
  "🎈": /* balloon */
    l("M50 70 Q44 82 52 90 Q58 96 50 100", 2.2) +
    p("M50 72 Q20 62 22 36 Q24 10 50 10 Q76 10 78 36 Q80 62 50 72 Z", APAL.purple) +
    p("M46 72 L54 72 L50 78 Z", APAL.purple, 2) +
    l("M34 30 Q34 22 42 18", 2.6, APAL.white),

  "quilt": /* quilt */
    r(8, 14, 84, 72, APAL.white, 6) +
    r(8, 14, 28, 24, APAL.red, 0, 2.2) + r(36, 14, 28, 24, APAL.yellow, 0, 2.2) + r(64, 14, 28, 24, APAL.blue, 0, 2.2) +
    r(8, 38, 28, 24, APAL.green, 0, 2.2) + r(36, 38, 28, 24, APAL.pink, 0, 2.2) + r(64, 38, 28, 24, APAL.orange, 0, 2.2) +
    r(8, 62, 28, 24, APAL.purple, 0, 2.2) + r(36, 62, 28, 24, APAL.teal, 0, 2.2) + r(64, 62, 28, 24, APAL.yellow, 0, 2.2) +
    c(22, 26, 4, APAL.white, 1.6) + c(50, 50, 4, APAL.white, 1.6) + c(78, 74, 4, APAL.white, 1.6) +
    r(8, 14, 84, 72, "none", 6, 3.4),

  "🚀": /* rocket */
    p("M40 70 Q36 86 50 98 Q64 86 60 70 Z", APAL.orange, 2.4) +
    p("M50 72 Q46 82 50 90 Q54 82 50 72 Z", APAL.yellow, 2) +
    p("M32 56 L18 74 L36 70 Z", APAL.red) + p("M68 56 L82 74 L64 70 Z", APAL.red) +
    p("M50 4 Q72 22 68 70 L32 70 Q28 22 50 4 Z", APAL.white) +
    c(50, 38, 9, APAL.water) +
    p("M38 18 Q50 4 62 18 Z", APAL.red, 2.4),

  "rug": /* rug */
    e(50, 58, 46, 28, APAL.purple) +
    e(50, 58, 34, 20, APAL.gold, 2.4) +
    e(50, 58, 20, 11, APAL.teal, 2.2),

  "🍅": /* tomato */
    c(50, 58, 34, APAL.red) +
    p("M50 26 L40 18 L46 30 L32 30 L46 36 L50 30 L54 36 L68 30 L54 30 L60 18 Z", APAL.green, 2.2) +
    l("M50 26 L50 14", 3, APAL.green2) +
    l("M30 50 Q28 60 32 68", 2.6, APAL.white),

  "🚂": /* train */
    r(12, 44, 54, 34, APAL.red, 4) +
    r(40, 22, 30, 56, APAL.blue, 4) + r(46, 28, 18, 14, "#cfeaf7", 2, 2.4) +
    r(18, 26, 12, 18, APAL.black, 2) + r(14, 20, 20, 8, APAL.black, 2) +
    c(26, 12, 6, APAL.white, 2) + c(14, 6, 4, APAL.white, 2) +
    r(66, 54, 26, 24, APAL.green, 3) +
    c(24, 82, 9, APAL.black) + c(50, 82, 9, APAL.black) + c(80, 82, 8, APAL.black) +
    c(24, 82, 3.4, APAL.grey, 1.4) + c(50, 82, 3.4, APAL.grey, 1.4) + c(80, 82, 3, APAL.grey, 1.4) +
    p("M4 78 L12 64 L12 78 Z", APAL.grey2, 2.2),

  "tub": /* wooden tub */
    e(50, 30, 40, 10, "#6e4a2a") +
    p("M10 30 L18 86 Q20 92 50 92 Q80 92 82 86 L90 30 Q90 40 50 40 Q10 40 10 30 Z", APAL.brown) +
    l("M12 44 Q50 54 88 44", 5, APAL.black) + l("M16 74 Q50 84 84 74", 5, APAL.black) +
    l("M30 40 L32 90 M50 42 L50 92 M70 40 L68 90", 2, APAL.brown2),

  "🥦": /* vegetables */
    l("M50 92 L50 60", 9, APAL.green2) +
    c(34, 46, 16, APAL.green) + c(66, 46, 16, APAL.green) + c(50, 32, 18, APAL.green) +
    c(50, 52, 14, APAL.green) +
    '<g transform="rotate(30 74 72)">' + p("M68 50 L80 50 L74 96 Z", APAL.orange) +
    l("M70 44 L68 36 M74 44 L74 34 M78 44 L80 36", 2.6, APAL.green2) + '</g>',

  "vase": /* vase with a flower */
    l("M50 52 L50 18", 3, APAL.green2) +
    p("M50 34 Q62 26 66 34 Q58 40 50 36 Z", APAL.green, 2) +
    c(50, 12, 6, APAL.yellow, 2) + c(42, 12, 5, APAL.pink, 2) + c(58, 12, 5, APAL.pink, 2) +
    c(50, 4, 5, APAL.pink, 2) + c(50, 20, 5, APAL.pink, 2) + c(50, 12, 5, APAL.yellow, 2) +
    p("M38 50 L62 50 L58 58 Q78 70 70 90 Q66 96 50 96 Q34 96 30 90 Q22 70 42 58 Z", APAL.teal) +
    l("M34 74 Q50 80 66 74", 2.4, APAL.white),

  "⛅": /* weather */
    r(6, 6, 42, 42, "#e8f6ff", 6) + r(52, 6, 42, 42, "#e8f6ff", 6) +
    r(6, 52, 42, 42, "#e8f6ff", 6) + r(52, 52, 42, 42, "#e8f6ff", 6) +
    c(27, 27, 10, APAL.yellow, 2.4) +
    l("M27 10 L27 14 M27 40 L27 44 M10 27 L14 27 M40 27 L44 27", 2.4) +
    p("M60 32 Q56 22 66 22 Q70 14 80 18 Q90 18 88 30 Z", APAL.grey, 2.2) +
    l("M64 38 L62 44 M72 38 L70 44 M80 38 L78 44", 2.2, APAL.blue) +
    p("M12 78 Q8 68 18 68 Q22 60 32 64 Q42 64 40 76 Z", APAL.grey, 2.2) +
    p("M26 78 L20 88 L26 88 L22 94 L32 84 L26 84 Z", APAL.gold, 1.6) +
    p("M58 70 Q56 62 66 62 Q72 56 80 60 Q90 60 88 70 Z", APAL.white, 2.2) +
    l("M66 78 L66 86 M62 82 L70 82 M80 78 L80 86 M76 82 L84 82", 2, APAL.blue),

  "wardrobe": /* wardrobe */
    r(16, 6, 68, 86, APAL.brown) + l("M50 6 L50 92", 3) +
    r(22, 14, 22, 70, "#b98652", 3, 2) + r(56, 14, 22, 70, "#b98652", 3, 2) +
    c(45, 50, 2.6, APAL.gold, 1.6) + c(55, 50, 2.6, APAL.gold, 1.6) +
    r(18, 92, 8, 6, APAL.brown2, 1, 2) + r(74, 92, 8, 6, APAL.brown2, 1, 2),

  "❌": /* a big X */
    l("M18 18 L82 82", 22) + l("M82 18 L18 82", 22) +
    l("M18 18 L82 82", 14, APAL.red) + l("M82 18 L18 82", 14, APAL.red),

  "🥣": /* yoghurt */
    p("M18 30 L82 30 L74 90 Q72 94 66 94 L34 94 Q28 94 26 90 Z", APAL.white) +
    r(14, 22, 72, 10, APAL.pink, 3) +
    r(24, 50, 52, 22, APAL.pink, 3, 2.2) + txt(50, 61, "yoghurt", 9, APAL.white) +
    l("M64 22 L80 4", 4, APAL.grey2) + e(82, 4, 5, 4, APAL.grey2, 1.6),

  "〽️": /* zigzag */
    l("M6 70 L24 30 L42 70 L60 30 L78 70 L94 34", 12) +
    l("M6 70 L24 30 L42 70 L60 30 L78 70 L94 34", 6, APAL.orange),

  "zipper": /* zipper */
    r(40, 4, 20, 92, "#c3c7cb", 2) +
    l("M40 12 L48 12 M52 18 L60 18 M40 24 L48 24 M52 30 L60 30 M40 36 L48 36 M52 42 L60 42", 3) +
    p("M50 50 L60 56 L60 92 L40 92 L40 56 Z", "#c3c7cb", 0) +
    l("M44 56 L44 92 M56 56 L56 92", 2.4) +
    r(36, 46, 28, 16, APAL.grey2, 4) +
    r(42, 60, 16, 26, APAL.grey, 6) + r(46, 70, 8, 10, "#ffffff", 3, 2),

  "⛪": /* church */
    '<g transform="translate(3 8) scale(0.92)">' +
    p("M8 92 L8 52 L36 34 L64 52 L64 92 Z", APAL.white) +
    p("M4 54 L36 30 L68 54", APAL.red, 3) +
    r(60, 30, 26, 62, APAL.cream) + p("M56 32 L73 6 L90 32 Z", APAL.red) +
    l("M73 6 L73 -4 M68 0 L78 0", 3) +
    r(26, 66, 20, 26, APAL.brown, 3) + r(66, 44, 14, 16, APAL.water, 6, 2.2) +
    r(14, 58, 8, 12, APAL.water, 4, 2) + r(50, 58, 8, 12, APAL.water, 4, 2) +
    l("M0 92 L100 92", 3) + '</g>',

  "🍱": /* lunch */
    r(8, 30, 84, 56, APAL.teal, 6) + r(14, 36, 34, 44, APAL.white, 4, 2.4) +
    r(52, 36, 34, 20, APAL.white, 4, 2.4) + r(52, 60, 34, 20, APAL.white, 4, 2.4) +
    p("M18 70 L30 44 L42 70 Z", APAL.sand, 2.2) +
    c(62, 46, 5, APAL.red, 2) + c(74, 46, 5, APAL.green, 2) +
    r(58, 64, 22, 12, APAL.yellow, 3, 2),

  "⛓️": /* chain */
    e(20, 62, 12, 8, APAL.grey, 3) + e(36, 54, 12, 8, APAL.grey2, 3) +
    e(52, 46, 12, 8, APAL.grey, 3) + e(68, 38, 12, 8, APAL.grey2, 3) +
    e(84, 30, 12, 8, APAL.grey, 3) +
    e(20, 62, 5, 2, "#ffffff", 0) + e(52, 46, 5, 2, "#ffffff", 0) + e(84, 30, 5, 2, "#ffffff", 0),

  "sharpener": /* pencil sharpener */
    p("M12 44 L64 30 L84 54 L84 80 L32 94 L12 70 Z", APAL.blue) +
    l("M12 44 L32 66 L84 54 M32 66 L32 94", 2.6) +
    c(22, 58, 6, APAL.black, 2.2) +
    r(40, 74, 30, 6, APAL.grey, 2, 2),

  "🏷️": /* price tag */
    p("M10 50 L40 18 L90 18 L90 82 L40 82 Z", APAL.yellow) +
    c(34, 50, 6, APAL.white, 2.4) +
    txt(66, 50, "$5", 20) +
    l("M28 50 Q14 40 6 20", 2.4),

  "rag": /* rag - an old cloth */
    p("M10 34 Q24 26 38 32 Q54 22 70 30 Q84 24 92 34 L86 58 Q92 72 84 84 Q66 76 50 84 Q32 76 16 84 Q8 70 14 58 Z", "#9fc8ea") +
    l("M14 46 Q30 40 46 46 T88 46 M12 62 Q30 56 48 62 T88 62", 2.4, APAL.blue) +
    l("M30 30 L28 82 M56 26 L54 82", 2.4, APAL.blue) +
    p("M70 30 Q84 24 92 34 L80 42 Z", APAL.white, 2.2) +
    r(60, 64, 12, 10, APAL.yellow, 1, 2),

  "🍖": /* ham */
    l("M70 30 L90 10", 9) + l("M70 30 L90 10", 5, APAL.cream) +
    c(92, 8, 5, APAL.cream, 2.2) + c(86, 4, 4, APAL.cream, 2.2) +
    p("M74 34 Q86 56 70 78 Q52 98 26 88 Q6 78 8 56 Q12 32 38 24 Q60 18 74 34 Z", "#c96f4a") +
    p("M66 40 Q74 58 62 72 Q48 86 30 80 Q16 72 18 56 Q22 40 40 34 Q56 30 66 40 Z", APAL.pink, 2.4) +
    l("M28 60 Q40 52 56 58 M34 70 Q46 66 58 68", 2, APAL.white),

  "dam": /* dam */
    r(0, 0, 100, 40, "#cfeaf7", 0, 0) +
    r(0, 30, 30, 70, APAL.water, 0, 2.4) +
    p("M30 22 L74 22 L84 98 L30 98 Z", APAL.stone) +
    l("M30 40 L78 40 M30 60 L80 60 M30 80 L82 80", 2, APAL.grey2) +
    p("M84 98 L100 98 L100 70 Q90 66 82 62 Z", APAL.water, 2) +
    l("M44 26 L44 98 M58 26 L60 98", 2, APAL.grey2) +
    p("M74 30 Q90 40 92 60 L88 60 Q86 42 74 38 Z", APAL.white, 1.8),

  "🎨": /* art - painting on an easel */
    l("M24 96 L40 20 M76 96 L60 20 M50 96 L50 70", 4, APAL.brown2) +
    r(18, 10, 64, 56, APAL.white) +
    c(66, 24, 7, APAL.yellow, 2) +
    p("M18 66 L36 40 L50 56 L60 46 L82 66 Z", APAL.green, 2.4) +
    r(14, 64, 72, 6, APAL.brown, 2, 2.4) +
    c(86, 82, 10, APAL.cream, 2.2) + c(83, 78, 2.6, APAL.red, 0) + c(89, 80, 2.6, APAL.blue, 0) + c(86, 86, 2.6, APAL.yellow, 0),

  "peg": /* clothes peg */
    '<g transform="rotate(-30 50 50)">' +
    r(32, 8, 14, 84, APAL.teal, 6) + r(54, 8, 14, 84, APAL.teal, 6) +
    r(30, 44, 40, 14, APAL.grey2, 4) + c(50, 51, 4, APAL.white, 2) +
    '</g>',

  "pen": /* pen for animals (a fence) */
    p("M10 46 L90 46 L90 90 L10 90 Z", APAL.green, 0) +
    r(6, 52, 88, 7, APAL.brown, 2, 2.4) + r(6, 72, 88, 7, APAL.brown, 2, 2.4) +
    p("M10 44 L14 36 L18 44 L18 92 L10 92 Z", APAL.sand, 2.4) +
    p("M30 44 L34 36 L38 44 L38 92 L30 92 Z", APAL.sand, 2.4) +
    p("M50 44 L54 36 L58 44 L58 92 L50 92 Z", APAL.sand, 2.4) +
    p("M70 44 L74 36 L78 44 L78 92 L70 92 Z", APAL.sand, 2.4) +
    p("M86 44 L90 36 L94 44 L94 92 L86 92 Z", APAL.sand, 2.4),

  "den": /* den - a cave */
    p("M2 96 Q8 30 46 18 Q86 10 98 60 L98 96 Z", APAL.stone) +
    p("M30 96 Q30 50 52 48 Q74 50 74 96 Z", "#3a3432") +
    dot(46, 70, 3) + dot(58, 70, 3) +
    l("M14 54 Q20 46 28 48 M70 30 Q78 28 84 36", 2.2, APAL.grey2) +
    l("M0 96 L100 96", 3),

  "tin": /* biscuit tin */
    r(12, 22, 76, 14, APAL.red, 4) +
    r(16, 34, 68, 56, APAL.blue, 4) +
    r(26, 46, 48, 32, APAL.white, 4, 2.2) +
    c(40, 62, 8, APAL.sand, 2) + c(60, 62, 8, APAL.brown, 2) +
    dot(38, 60, 1.6) + dot(42, 64, 1.6) + dot(58, 60, 1.6) + dot(62, 64, 1.6),

  "🌫️": /* fog */
    l("M8 30 Q30 22 50 30 T92 30", 6, APAL.grey) +
    l("M14 46 Q34 38 54 46 T96 46", 6, APAL.grey2) +
    l("M4 62 Q26 54 46 62 T88 62", 6, APAL.grey) +
    l("M12 78 Q32 70 52 78 T94 78", 6, APAL.grey2),

  "cot": /* baby's cot */
    r(10, 26, 6, 70, APAL.brown) + r(84, 26, 6, 70, APAL.brown) +
    r(14, 64, 72, 10, APAL.brown, 2, 2.4) + r(14, 30, 72, 6, APAL.brown, 2, 2.4) +
    r(18, 52, 64, 12, APAL.white, 4, 2.2) +
    l("M26 36 L26 64 M38 36 L38 64 M50 36 L50 64 M62 36 L62 64 M74 36 L74 64", 3, APAL.brown2) +
    c(10, 24, 4, APAL.brown) + c(90, 24, 4, APAL.brown),

  /* ---- redrawn so they match the book's pictures ---- */
  "🔝": /* spinning top */
    p("M50 96 L22 50 Q20 34 50 30 Q80 34 78 50 Z", APAL.red) +
    l("M22 50 Q50 60 78 50", 3) + l("M30 64 Q50 72 70 64", 2.4, APAL.white) +
    r(44, 10, 12, 22, APAL.yellow, 4) +
    l("M84 40 Q92 54 84 68 M14 40 Q6 54 14 68", 2.4),

  "🥅": /* net */
    l("M94 96 L60 56", 5, APAL.brown2) +
    e(36, 34, 32, 26, "none", 4) +
    p("M8 34 Q14 74 36 86 Q58 74 64 34", "#ffffff", 2.4) +
    l("M16 48 L56 48 M20 62 L52 62 M28 74 L44 74 M24 36 L32 80 M36 36 L36 86 M48 36 L40 80", 1.8) +
    e(36, 34, 32, 26, "none", 4),

  "🧹": /* mop */
    l("M80 4 L48 62", 5, APAL.brown) +
    r(36, 58, 26, 9, APAL.blue, 3) +
    p("M34 66 L64 66 Q76 80 74 94 Q60 100 50 92 Q40 100 26 94 Q20 80 34 66 Z", APAL.white) +
    l("M36 70 Q30 82 32 94 M44 70 Q42 84 44 96 M54 70 Q58 84 56 96 M62 70 Q70 82 68 94", 2.2, APAL.grey2),

  "🪔": /* lamp */
    p("M30 16 L70 16 L84 50 L16 50 Z", APAL.yellow) +
    l("M50 50 L50 82", 5, APAL.grey2) +
    e(50, 86, 22, 7, APAL.grey2) +
    l("M24 60 L16 70 M76 60 L84 70 M50 58 L50 66", 2.4, APAL.gold)
});


/* father with his daughter (for "her father" in the er unit) */
Object.assign(PIC, {
  "👨‍👧": /* father and daughter */
    '<g transform="translate(-6 0) scale(0.86 1)">' +
    torso(APAL.navy) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 38, 8) + smile(50, 46, 7) +
    l("M40 30 Q44 27 48 29", 2.4) + l("M60 30 Q56 27 52 29", 2.4) +
    '</g><g transform="translate(52 40) scale(0.6)">' +
    c(24, 48, 9, APAL.hairB) + c(76, 48, 9, APAL.hairB) +
    torso(APAL.pink) + neck() + head() + hairCap(APAL.hairB) +
    eyes2(50, 38, 8) + smile(50, 46, 8) + cheeks(50, 44, 16) +
    '</g>'
});

function artSvg(key) {
  const inner = PIC[key];
  if (!inner) return null;
  return '<svg class="art" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ' +
    'aria-hidden="true" focusable="false">' + inner + '</svg>';
}

if (typeof module !== "undefined") { module.exports = { PIC, artSvg }; }
