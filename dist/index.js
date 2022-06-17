"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var aboutWindow;
function showAboutWindow() {
    if (aboutWindow != undefined) {
        aboutWindow.focus();
    }
    else {
        aboutWindow = new electron_1.BrowserWindow({
            width: 400,
            height: 400,
            webPreferences: {
                preload: path.join(__dirname, "aboutPreload.js")
            }
        });
        aboutWindow.setTitle("About");
        aboutWindow.setMenuBarVisibility(false);
        aboutWindow.loadFile(path.join(__dirname, "About.html"));
        aboutWindow.on("closed", function () { aboutWindow = undefined; });
    }
}
function showCronometerWindow() {
    console.log("Cronometer");
}
function showTimerWindow() {
    console.log("Timer");
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
    showAboutWindow();
    applyTray();
}
// App activate
// function appActivate(): void {
// }
// App listen events
electron_1.app.on("ready", appReady);
electron_1.app.on("window-all-closed", function () { return console.log("App windows closed."); });
// app.on("activate", appActivate);
//# sourceMappingURL=index.js.map