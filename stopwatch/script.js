// script.js

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

// Add a class for pulse animation
function togglePulse() {
    display.classList.toggle('pulse');
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function updateDisplay() {
    const now = Date.now();
    const diff = now - startTime + elapsedTime;
    display.textContent = formatTime(diff);
}

function start() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    lapButton.disabled = false;
    togglePulse(); // Start pulse
}

function pause() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    togglePulse(); // Stop pulse
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    startTime = null;
    display.textContent = "00:00:00";
    lapsContainer.innerHTML = '';
    lapTimes = [];
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
    display.classList.remove('pulse'); // Ensure pulse is removed
}

function lap() {
    if (!isRunning) return;
    const lapTime = Date.now() - startTime + elapsedTime;
    lapTimes.push(lapTime);
    const lapElement = document.createElement("div");
    lapElement.classList.add('lap');
    lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapsContainer.prepend(lapElement); // Show latest lap on top
}

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
