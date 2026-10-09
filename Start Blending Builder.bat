@echo off
rem ------------------------------------------------------------------
rem  Blending Builder - double-click this file to start the program.
rem  It opens in Microsoft Edge (already on every Windows 10/11 PC),
rem  full screen, with no address bar. Nothing needs installing and
rem  it works without the internet.
rem
rem  To close: the Exit button on the letters page, or Alt+F4.
rem ------------------------------------------------------------------
set "HERE=%~dp0"
start "" msedge --app="%HERE%index.html" --start-fullscreen --user-data-dir="%LOCALAPPDATA%\BlendingBuilder" --no-first-run --disable-features=Translate
if errorlevel 1 start "" "%HERE%index.html"
