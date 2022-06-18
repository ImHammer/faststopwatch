
let startedTimer = false;
let totalTimeCopyString = "";

let currentTimeStamp = -1;

let intervalStarted = undefined;

function initInterval() {
    intervalStarted = setInterval(() => {
        if (startedTimer == true && currentTimeStamp > 0) {
            currentTimeStamp--;
            updateCounterWithTimestamp();
        } else if (currentTimeStamp < 0) {
            stopTimer();
            currentTimeStamp = -1;
        }
    }, 1000);
}

function playTimer() {
    if (currentTimeStamp == -1) resetTimestamp();
    updateCounterWithTimestamp();

    startedTimer = true;
    initInterval();
}

function resetTimer() {
    resetTimestamp();
    updateCounterWithTimestamp();

    if (startedTimer == false) {
        currentTimeStamp = -1;
    } else {
        clearInterval(intervalStarted);
        initInterval();
    }
}

function stopTimer() {
    startedTimer = false;

    if (intervalStarted != undefined) clearInterval(intervalStarted);
}

// Actions handle
function resetTimestamp() {
    // Convert totalTimeCopyString to separated hours, minutes and seconds
    let generatedTimeStamp = 0;

    const correctStr = getCorrectTotalTimeStr();

    const hours = parseInt(correctStr.substr(0, 2));
    const minutes = parseInt(correctStr.substr(2, 2));
    const seconds = parseInt(correctStr.substr(4, 2));

    if (hours > 0) generatedTimeStamp += (3600 * hours);
    if (minutes > 0) generatedTimeStamp += (60 * minutes);
    if (seconds > 0) generatedTimeStamp += seconds;

    currentTimeStamp = generatedTimeStamp;
}

function zeroLeft(value) {
    return (value < 10 ? `0${value}` : value.toString());
}

function updateCounterWithTimestamp() {
    const hours = Math.floor(currentTimeStamp / 3600);
    const minutes = Math.floor((currentTimeStamp / 60) - (60 * hours));
    const seconds = Math.floor(currentTimeStamp % 60);

    changeTextOfCounters(zeroLeft(hours), zeroLeft(minutes), zeroLeft(seconds));
}

function keyNumberClicked(event) {
    const keyElem = event.currentTarget;
    const keyValue = keyElem.getAttribute("data-number");
    if (keyValue !== null) {
        const keyNumber = parseInt(keyValue);

        insertNumber(keyValue, keyNumber);
    }
}

function insertNumber(keyStr, keyNumber) {
    if (startedTimer == true) return;

    const numbers = "00123456789";

    if (numbers.includes(keyStr)) {
        console.log("Slapow");
        if (totalTimeCopyString.length < 6) {
            totalTimeCopyString = totalTimeCopyString.concat(keyStr);
            currentTimeStamp = -1;

            handleSetHtmlOnCounter();
        }
    }

    updateShowTimerWithNumber(parseInt(totalTimeCopyString));
}

function removeLastNumber() {
    if (startedTimer == true) return;

    if (totalTimeCopyString.length > 0) {
        totalTimeCopyString = totalTimeCopyString.slice(0, totalTimeCopyString.length - 1);
        currentTimeStamp = -1;

        handleSetHtmlOnCounter();
    }
}

function updateShowTimerWithNumber(timestamp) {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp / 60) - (60 * hours));
    const seconds = Math.floor(timestamp % 60);
}

function getCorrectTotalTimeStr(totalTimeStr) {
    let currentForUse = totalTimeStr;

    if (totalTimeStr == undefined || totalTimeStr == null) currentForUse = totalTimeCopyString;

    let correctStr = currentForUse;

    const strActualLen = currentForUse.length;
    const needZeros = 6 - strActualLen;
    if (needZeros > 0) {
        correctStr = ("0".repeat(needZeros)).concat(currentForUse);
    }

    return correctStr;
}

function handleSetHtmlOnCounter() {
    const correctStr = getCorrectTotalTimeStr();

    const houStr = correctStr.substr(0, 2);
    const minStr = correctStr.substr(2, 2);
    const secStr = correctStr.substr(4, 2);

    changeTextOfCounters(houStr, minStr, secStr);
    // $("#valor-show").text(correctStr);
}

// Change render texts to counters
function changeTextOfCounters(hours, minutes, seconds) {
    const houElem = $("#hou_text");
    const minElem = $("#min_text");
    const secElem = $("#sec_text");

    if (houElem !== undefined && houElem !== null) houElem.text(hours.concat("h"));
    if (minElem !== undefined && minElem !== null) minElem.text(minutes.concat("m"));
    if (secElem !== undefined && secElem !== null) secElem.text(seconds.concat("s"));
}

// Inits
function KeyBoardNumbersInit() {
    $(".keyboard_number").on("click", keyNumberClicked);

    $("#keyboard_del").on("click", event => {
        console.log("PRESSED", "DEL LAST NUMBER");
        removeLastNumber();
    });
}

function ActionsButtonInit() {
    $("#play_button").on("click", playTimer);
    $("#reset_button").on("click", resetTimer);
    $("#pause_button").on("click", stopTimer);
}

KeyBoardNumbersInit();
ActionsButtonInit();

$(function () {
  $('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
});

function toggleToTheme(theme) {
    if (theme == "dark") {
        $("#lightColors").removeClass("bg-light");
        $("#lightColors").addClass("bg-dark");

        $("#keyboard_del").removeClass("btn-dark");
        $(".keyboard_number").removeClass("btn-dark");

        $("#keyboard_del").addClass("btn-light");
        $(".keyboard_number").addClass("btn-light");
    } else {
        $("#lightColors").addClass("bg-light");
        $("#lightColors").removeClass("bg-dark");

        $("#keyboard_del").addClass("btn-dark");
        $(".keyboard_number").addClass("btn-dark");

        $("#keyboard_del").removeClass("btn-light");
        $(".keyboard_number").removeClass("btn-light");
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) toggleToTheme("dark");
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => toggleToTheme(event.matches ? "dark" : "light"));
