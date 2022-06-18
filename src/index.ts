
import { app, BrowserWindow, ipcMain, nativeTheme, shell, Tray, nativeImage, Menu } from "electron";
import * as path from "path";

let aboutWindow: BrowserWindow;
let cronWindow: BrowserWindow;
let timerWindow: BrowserWindow;

// Used to show about window
// About window contains informations from app and the creator
function showAboutWindow(): void {
    if (aboutWindow != undefined) {
        aboutWindow.focus();
    } else {
        aboutWindow = new BrowserWindow({
            width: 400,
            height: 400
        });
        aboutWindow.setTitle("About");
        aboutWindow.setMenuBarVisibility(false);
        aboutWindow.loadFile(path.join(__dirname, "About.html"));
        aboutWindow.on("closed", () => { aboutWindow = undefined; });
    }
}

// Used to show window of cronometer
function showCronometerWindow(): void {
    if (cronWindow != undefined) {
        cronWindow.focus();
    } else {
        cronWindow = new BrowserWindow({
            width: 400,
            height: 400
        });
        cronWindow.setTitle("Cronometer");
        cronWindow.setMenuBarVisibility(false);
        cronWindow.loadFile(path.join(__dirname, "Cron.html"));
        cronWindow.on("closed", () => { cronWindow = undefined; });
    }
}

// Used to show window of cronometer
function showTimerWindow(): void {
    if (timerWindow != undefined) {
        timerWindow.focus();
    } else {
        timerWindow = new BrowserWindow({
            width: 400,
            height: 400
        });
        timerWindow.setTitle("Timer");
        timerWindow.setMenuBarVisibility(false);
        timerWindow.loadFile(path.join(__dirname, "Timer.html"));
        timerWindow.on("closed", () => { timerWindow = undefined; });
    }
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
    // showAboutWindow();
    // showCronometerWindow();
    showTimerWindow();
    applyTray();
}

// App listen events
app.on("ready", appReady);
app.on("window-all-closed", () => console.log("App windows closed."));
// app.on("activate", appActivate);
