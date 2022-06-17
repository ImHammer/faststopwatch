
import { app, BrowserWindow, ipcMain, nativeTheme, shell } from "electron";
import * as path from "path";

function createAboutWindow(): void {
    const aboutWindow: BrowserWindow = new BrowserWindow({
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
function appReady(): void {
    createAboutWindow();
}

// App activate
// function appActivate(): void {

// }

// App listen events
app.on("ready", appReady);
app.on("window-all-closed", () => console.log("App windows closed."));
// app.on("activate", appActivate);
