
import { app, BrowserWindow, ipcMain, nativeTheme, shell, Tray, nativeImage, Menu } from "electron";
import * as path from "path";

let aboutWindow: BrowserWindow;

function showAboutWindow(): void {
    if (aboutWindow != undefined) {
        aboutWindow.focus();
    } else {
        aboutWindow = new BrowserWindow({
            width: 400,
            height: 400,
            webPreferences: {
                preload: path.join(__dirname, "aboutPreload.js")
            }
        });

        aboutWindow.setTitle("About");
        aboutWindow.setMenuBarVisibility(false);

        aboutWindow.loadFile(path.join(__dirname, "About.html"));

        aboutWindow.on("closed", () => { aboutWindow = undefined; });
    }
}

function showCronometerWindow(): void {
    console.log("Cronometer");
}

function showTimerWindow(): void {
    console.log("Timer");
}

// Create app Tray
function applyTray(): void {
    const trayMenu: Menu = Menu.buildFromTemplate([
        { label: "Cronometer", type: "normal", click: showCronometerWindow },
        { label: "Timer", type: "normal", click: showTimerWindow },
        { label: "About", type: "normal", click: showAboutWindow },
        { label: "Quit", type: "normal", click: () => app.quit() }
    ]);

    const tray: Tray = new Tray(path.join(__dirname, "assets/iconTemplate.png"));
    tray.setTitle("FastStopwatch");
    tray.setToolTip("FastStopwatch");
    tray.setContextMenu(trayMenu);
}

// App ready
function appReady(): void {
    showAboutWindow();
    applyTray();
}

// App activate
// function appActivate(): void {

// }

// App listen events
app.on("ready", appReady);
app.on("window-all-closed", () => console.log("App windows closed."));
// app.on("activate", appActivate);
