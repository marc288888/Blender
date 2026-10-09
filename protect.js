/* protect.js — build a version of the program with the code scrambled.
 *
 *   npm run protect
 *
 * What it does, step by step:
 *   1. Copies the program into a scratch folder called  build-protected\
 *   2. Scrambles every .js file in there (names changed, all the text turned
 *      into coded lookups) so the stories, words and code are not readable.
 *   3. Runs electron-builder on the scrambled copy.
 *   4. The finished program lands in  dist\win-unpacked  exactly as usual,
 *      ready for  npm run installer.
 *
 * Your real source files are NEVER touched. Keep editing them normally.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const JavaScriptObfuscator = require("javascript-obfuscator");

const ROOT = __dirname;
const WORK = path.join(ROOT, "build-protected");
const NODE_MODULES = path.join(ROOT, "node_modules");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

// main.js runs in Electron's Node process; everything else runs in the page.
const NODE_FILES = new Set(["main.js"]);

const OBFUSCATOR_OPTIONS = {
  compact: true,
  // Top-level names are shared between the <script> tags in index.html.
  // Renaming them would break the program, so only local names change.
  renameGlobals: false,
  identifierNamesGenerator: "hexadecimal",
  stringArray: true,
  stringArrayThreshold: 1,
  stringArrayEncoding: ["base64"],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayIndexShift: true,
  splitStrings: true,
  splitStringsChunkLength: 8,
  numbersToExpressions: true,
  simplify: true,
  // These three are deliberately off: they slow the drawing code down and
  // can break it on classroom machines.
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  unicodeEscapeSequence: false
};

function log(message) {
  console.log(message);
}

function fail(message) {
  console.error("\n  protect.js stopped: " + message + "\n");
  process.exit(1);
}

/* ---------------------------------------------------------------- 1. clean */

function cleanWorkFolder() {
  if (fs.existsSync(WORK)) {
    // The junction to node_modules must go first or rmSync follows it.
    const linked = path.join(WORK, "node_modules");
    if (fs.existsSync(linked)) fs.rmSync(linked, { recursive: true, force: true });
    fs.rmSync(WORK, { recursive: true, force: true });
  }
  fs.mkdirSync(WORK, { recursive: true });
}

/* ----------------------------------------------------------------- 2. copy */

// package.json lists what ships, e.g. "app.js" or "pics/**/*". Strip the glob
// part and copy the plain file or folder it points at.
function shippedEntries() {
  const files = (pkg.build && pkg.build.files) || [];
  const names = new Set();
  for (const entry of files) {
    const name = String(entry).split("/")[0].split("*")[0].replace(/\/$/, "");
    if (name) names.add(name);
  }
  return [...names];
}

function copyEntries() {
  for (const name of shippedEntries()) {
    const from = path.join(ROOT, name);
    if (!fs.existsSync(from)) {
      fail('package.json lists "' + name + '" but it is not in this folder.');
    }
    fs.cpSync(from, path.join(WORK, name), { recursive: true });
  }
}

/* ------------------------------------------------------------ 3. scramble */

function jsFilesIn(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...jsFilesIn(full));
    else if (entry.name.toLowerCase().endsWith(".js")) found.push(full);
  }
  return found;
}

function scramble() {
  const files = jsFilesIn(WORK);
  if (!files.length) fail("no .js files were copied into build-protected.");

  for (const file of files) {
    const name = path.relative(WORK, file);
    const source = fs.readFileSync(file, "utf8");
    const options = Object.assign({}, OBFUSCATOR_OPTIONS, {
      target: NODE_FILES.has(name) ? "node" : "browser"
    });

    let result;
    try {
      result = JavaScriptObfuscator.obfuscate(source, options).getObfuscatedCode();
    } catch (err) {
      fail("could not scramble " + name + " — " + err.message);
    }

    fs.writeFileSync(file, result, "utf8");
    const before = Buffer.byteLength(source);
    const after = Buffer.byteLength(result);
    log("    scrambled  " + name + "  (" + before + " -> " + after + " bytes)");
  }
  return files.length;
}

/* ------------------------------------------------- 4. package.json + build */

function electronVersion() {
  try {
    const file = path.join(NODE_MODULES, "electron", "package.json");
    return JSON.parse(fs.readFileSync(file, "utf8")).version;
  } catch (err) {
    return undefined;
  }
}

function writeWorkPackageJson() {
  const copy = JSON.parse(JSON.stringify(pkg));
  delete copy.scripts;
  copy.build = Object.assign({}, copy.build, {
    // Put the finished program back in the real dist folder, so
    // npm run installer picks it up without any changes.
    directories: Object.assign({}, copy.build && copy.build.directories, {
      output: path.join(ROOT, "dist")
    })
  });

  const version = electronVersion();
  if (version) copy.build.electronVersion = version;

  fs.writeFileSync(
    path.join(WORK, "package.json"),
    JSON.stringify(copy, null, 2),
    "utf8"
  );
}

// electron-builder needs node_modules next to the app it is building.
// A junction costs nothing and needs no admin password.
function linkNodeModules() {
  if (!fs.existsSync(NODE_MODULES)) {
    fail("node_modules is missing. Run  npm install  first.");
  }
  const target = path.join(WORK, "node_modules");
  try {
    fs.symlinkSync(NODE_MODULES, target, "junction");
  } catch (err) {
    log("    could not link node_modules, copying instead (this is slow)");
    fs.cpSync(NODE_MODULES, target, { recursive: true });
  }
}

// Windows anti-virus often still has the last build's files open, which makes
// electron-builder give up. Clear the folder ourselves and keep trying.
function clearUnpackedFolder() {
  const unpacked = path.join(ROOT, "dist", "win-unpacked");
  if (!fs.existsSync(unpacked)) return;

  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      fs.rmSync(unpacked, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
      return;
    } catch (err) {
      if (attempt === 6) {
        fail(
          "could not clear dist\\win-unpacked — something still has it open.\n" +
          "  Close Blending Builder and any Explorer window showing that folder, then try again."
        );
      }
      log("       dist\\win-unpacked is in use, waiting (" + attempt + "/5)");
      spawnSync(process.execPath, ["-e", "setTimeout(()=>{},2000)"]);
    }
  }
}

function runElectronBuilder() {
  // Call electron-builder's own script with node. Going through a shell
  // breaks on Windows as soon as a folder name has a space in it.
  const cli = path.join(NODE_MODULES, "electron-builder", "cli.js");
  if (!fs.existsSync(cli)) {
    fail("electron-builder is missing. Run  npm install  first.");
  }

  clearUnpackedFolder();

  const result = spawnSync(
    process.execPath,
    [cli, "--win", "portable", "nsis"],
    { cwd: WORK, stdio: "inherit" }
  );

  if (result.error) fail("electron-builder would not start — " + result.error.message);
  if (result.status !== 0) fail("electron-builder failed with code " + result.status + ".");
}

/* ------------------------------------------------------------------- run */

log("\n  Blending Builder " + pkg.version + " — protected build\n");

log("  1/4  clearing build-protected");
cleanWorkFolder();

log("  2/4  copying the program");
copyEntries();

log("  3/4  scrambling the code");
const count = scramble();
log("       " + count + " file(s) scrambled");

log("  4/4  building");
writeWorkPackageJson();
linkNodeModules();
runElectronBuilder();

log("\n  Done. The protected program is in  dist\\win-unpacked");
log("  Next step:  npm run installer\n");
