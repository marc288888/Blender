const { app, BrowserWindow, globalShortcut, Menu } = require("electron");
const path = require("path");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 640,
    backgroundColor: "#0f2a4a",
    title: "Blending Builder",
    icon: path.join(__dirname, "icon.ico"),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "index.html"));
  win.once("ready-to-show", () => {
    win.show();
    win.setFullScreen(true);
  });

  // Children press every key they can reach; keep them inside the app.
  win.webContents.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    const key = (input.key || "").toLowerCase();
    if (input.alt && key === "f4") event.preventDefault();
    if (key === "f11") {
      event.preventDefault();
      win.setFullScreen(!win.isFullScreen());
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  // Teacher exit: Ctrl+Shift+Q. Nothing a six-year-old lands on by accident.
  globalShortcut.register("CommandOrControl+Shift+Q", () => app.quit());
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    if (win) win.webContents.toggleDevTools();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => globalShortcut.unregisterAll());
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
