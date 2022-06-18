"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var aboutWindow;
var cronWindow;
var timerWindow;
// Used to show about window
// About window contains informations from app and the creator
function showAboutWindow() {
    if (aboutWindow != undefined) {
        aboutWindow.focus();
    }
    else {
        aboutWindow = new electron_1.BrowserWindow({
            width: 400,
            height: 400
        });
        aboutWindow.setTitle("About");
        aboutWindow.setMenuBarVisibility(false);
        aboutWindow.loadFile(path.join(__dirname, "About.html"));
        aboutWindow.on("closed", function () { aboutWindow = undefined; });
    }
}
// Used to show window of cronometer
function showCronometerWindow() {
    if (cronWindow != undefined) {
        cronWindow.focus();
    }
    else {
        cronWindow = new electron_1.BrowserWindow({
            width: 400,
            height: 400
        });
        cronWindow.setTitle("Cronometer");
        cronWindow.setMenuBarVisibility(false);
        cronWindow.loadFile(path.join(__dirname, "Cron.html"));
        cronWindow.on("closed", function () { cronWindow = undefined; });
    }
}
// Used to show window of cronometer
function showTimerWindow() {
    if (timerWindow != undefined) {
        timerWindow.focus();
    }
    else {
        timerWindow = new electron_1.BrowserWindow({
            width: 400,
            height: 400
        });
        timerWindow.setTitle("Timer");
        timerWindow.setMenuBarVisibility(false);
        timerWindow.loadFile(path.join(__dirname, "Timer.html"));
        timerWindow.on("closed", function () { timerWindow = undefined; });
    }
}
// Create app Tray
function applyTray() {
    var trayMenu = electron_1.Menu.buildFromTemplate([
        { label: "Cronometer", type: "normal", click: showCronometerWindow },
        { label: "Timer", type: "normal", click: showTimerWindow },
        { label: "About", type: "normal", click: showAboutWindow },
        { label: "Quit", type: "normal", click: function () { return electron_1.app.quit(); } }
    ]);
    var tray = new electron_1.Tray(path.join(__dirname, "assets/iconTemplate.png"));
    tray.setTitle("FastStopwatch");
    tray.setToolTip("FastStopwatch");
    tray.setContextMenu(trayMenu);
}
// App ready
function appReady() {
    // showAboutWindow();
    // showCronometerWindow();
    showTimerWindow();
    applyTray();
}
// App listen events
electron_1.app.on("ready", appReady);
electron_1.app.on("window-all-closed", function () { return console.log("App windows closed."); });
// app.on("activate", appActivate);
//# sourceMappingURL=index.js.map