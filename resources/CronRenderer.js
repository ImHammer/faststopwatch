
let stopwatchStarted = false;
let totalTime = 0;

// Incremetation for total time in miliseconds and udpate html
function incrementTotalTime(value) {
    totalTime += value;
    updateHtml();
}

// To insert zero after value
function insertZeroLeft(value, aplications) {
    let numberStringify = `${value}`;

    aplications.forEach(apply => {
        const { under, left } = apply;
        if (under !== undefined && left !== undefined) {
            if (value < under) numberStringify = `${left}${value}`;
        }
    });

    return numberStringify;
}

function toggleState(parseState) {
    stopwatchStarted = parseState;
}

// For update values view in html
function updateHtml() {

    const convertedForSeconds = Math.floor(totalTime / 1000);

    const hours = Math.floor(convertedForSeconds / 3600);
    const minutes = Math.floor((convertedForSeconds / 60) - (60 * hours));
    const seconds = Math.floor(convertedForSeconds % 60);
    const msecond = Math.floor(totalTime % 1000);

    const houElem = document.getElementById("hou_text");
    const minElem = document.getElementById("min_text");
    const secElem = document.getElementById("sec_text");
    const mseElem = document.getElementById("mse_text");

    houElem.innerHTML = insertZeroLeft(hours, [ {  under: 10, left: "0" } ]).concat("h");
    minElem.innerHTML = insertZeroLeft(minutes, [ {  under: 10, left: "0" } ]).concat("m");
    secElem.innerHTML = insertZeroLeft(seconds,   [ {  under: 10, left: "0" } ]).concat("s");
    mseElem.innerHTML = insertZeroLeft(msecond, [ { under: 100, left: "0" }, { under: 10, left: "00" } ]).concat("ms");
}

// Reset the stopwatch
function reset() {
    totalTime = 0;
    updateHtml();
}

const playButton = document.getElementById("play_button");
const resetButton = document.getElementById("reset_button");
const pauseButton = document.getElementById("pause_button");

playButton.addEventListener("click", event => {
    if (stopwatchStarted === false) {
        toggleState(true);
    }
});
resetButton.addEventListener("click", event => {
    reset();
});
pauseButton.addEventListener("click", event => {
    if (stopwatchStarted === true) {
        toggleState(false);
    }
});

setInterval(() => {
    if (stopwatchStarted === true) {
        incrementTotalTime(48);
    }
}, 48);

function toggleToTheme(theme) {
    if (theme == "dark") {
        $("#background-container").addClass("bg-dark");
        $("#background-container").removeClass("bg-light");
    } else {
        $("#background-container").removeClass("bg-dark");
        $("#background-container").addClass("bg-light");
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) toggleToTheme("dark");
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => toggleToTheme(event.matches ? "dark" : "light"));
