"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
function createAboutWindow() {
    var aboutWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
            preload: path.join(__dirname, "aboutPreload.js")
        }
    });
    aboutWindow.setTitle("About");
    aboutWindow.setMenuBarVisibility(false);
    aboutWindow.loadFile(path.join(__dirname, "About.html"));
}
// App ready
function appReady() {
    createAboutWindow();
}
// App activate
// function appActivate(): void {
// }
// App listen events
electron_1.app.on("ready", appReady);
electron_1.app.on("window-all-closed", function () { return console.log("App windows closed."); });
// app.on("activate", appActivate);
//# sourceMappingURL=index.js.map