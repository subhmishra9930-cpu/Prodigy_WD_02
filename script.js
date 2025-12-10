// ========== STOPWATCH VARIABLES ==========
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 0;
let lapTimes = [];
let soundEnabled = true;
let isDarkMode = true;

// ========== DOM ELEMENTS ==========
const timeDisplay = document.querySelector('.time-display');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapSection = document.getElementById('lapSection');
const lapList = document.getElementById('lapList');
const clearLapsBtn = document.getElementById('clearLapsBtn');

// Additional controls
const saveBtn = document.getElementById('saveBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const soundBtn = document.getElementById('soundBtn');
const themeBtn = document.getElementById('themeBtn');

// ========== EVENT LISTENERS ==========
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
clearLapsBtn.addEventListener('click', clearLaps);

// Additional controls
saveBtn.addEventListener('click', saveTime);
fullscreenBtn.addEventListener('click', toggleFullscreen);
soundBtn.addEventListener('click', toggleSound);
themeBtn.addEventListener('click', toggleTheme);

// ========== CORE FUNCTIONS ==========

// Start the stopwatch
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        
        // Update UI
        timeDisplay.classList.add('running');
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        
        // Visual feedback
        animateButton(startBtn);
        playBeep();
    }
}

// Pause the stopwatch
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // Update UI
        timeDisplay.classList.remove('running');
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        
        // Visual feedback
        animateButton(pauseBtn);
        playBeep();
    }
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    
    // Reset display
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    
    // Clear all laps
    lapCounter = 0;
    lapTimes = [];
    displayLaps();
    lapSection.classList.remove('show');
    
    // Update UI
    timeDisplay.classList.remove('running');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    
    // Visual feedback
    animateButton(resetBtn);
}

// Update time display
function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    
    const time = formatTime(elapsedTime);
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
    millisecondsDisplay.textContent = time.milliseconds;
}

// Format time into minutes, seconds, and milliseconds
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return {
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        milliseconds: String(ms).padStart(2, '0')
    };
}

// ========== LAP FUNCTIONS ==========

// Record a lap time
function recordLap() {
    if (isRunning) {
        lapCounter++;
        const currentTime = elapsedTime;
        
        lapTimes.push({
            lapNumber: lapCounter,
            time: currentTime
        });
        
        displayLaps();
        animateButton(lapBtn);
        playBeep();
        
        // Show lap section if first lap
        if (lapCounter === 1) {
            lapSection.classList.add('show');
        }
    }
}

// Display all lap times
function displayLaps() {
    if (lapTimes.length === 0) {
        lapList.innerHTML = `
            <div class="no-laps">
                <i class="fas fa-info-circle"></i>
                <p>No lap times recorded yet</p>
            </div>
        `;
        return;
    }
    
    // Find fastest and slowest laps
    const times = lapTimes.map(lap => lap.time);
    const fastestTime = Math.min(...times);
    const slowestTime = Math.max(...times);
    
    // Generate lap items HTML
    lapList.innerHTML = lapTimes
        .map(lap => {
            const time = formatTime(lap.time);
            const timeString = `${time.minutes}:${time.seconds}:${time.milliseconds}`;
            
            let badgeHTML = '';
            let itemClass = 'lap-item';
            
            // Add badges for fastest/slowest (only if more than 1 lap)
            if (lapTimes.length > 1) {
                if (lap.time === fastestTime) {
                    badgeHTML = '<span class="lap-badge fastest"><i class="fas fa-bolt"></i> Fastest</span>';
                    itemClass += ' fastest';
                } else if (lap.time === slowestTime) {
                    badgeHTML = '<span class="lap-badge slowest"><i class="fas fa-turtle"></i> Slowest</span>';
                    itemClass += ' slowest';
                }
            }
            
            return `
                <div class="${itemClass}">
                    <span class="lap-number">Lap ${lap.lapNumber}</span>
                    <span class="lap-time">
                        ${timeString}
                        ${badgeHTML}
                    </span>
                </div>
            `;
        })
        .reverse()
        .join('');
    
    // Auto scroll to top of lap list
    lapList.scrollTop = 0;
}

// Clear all lap times
function clearLaps() {
    lapCounter = 0;
    lapTimes = [];
    displayLaps();
    
    // Visual feedback
    animateButton(clearLapsBtn);
    
    // Optionally hide lap section if no laps
    setTimeout(() => {
        if (lapTimes.length === 0) {
            lapSection.classList.remove('show');
        }
    }, 300);
}

// ========== UTILITY FUNCTIONS ==========

// Button animation feedback
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);
}

// Play beep sound
function playBeep() {
    if (soundEnabled) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// ========== ADDITIONAL FEATURES ==========

// Save current time
function saveTime() {
    const time = formatTime(elapsedTime);
    const timeString = `${time.minutes}:${time.seconds}:${time.milliseconds}`;
    const timestamp = new Date().toLocaleString();
    
    // Create downloadable file
    const content = `Stopwatch Time

Time: ${timeString}
Saved: ${timestamp}

Lap Times:
${lapTimes.map((lap, i) => {
        const lapTime = formatTime(lap.time);
        return `Lap ${lap.lapNumber}: ${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}`;
    }).join('\n')}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stopwatch-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    playBeep();
    animateButton(saveBtn);
    showNotification('Time saved successfully!', 'success');
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
        fullscreenBtn.querySelector('i').className = 'fas fa-compress';
        fullscreenBtn.querySelector('span').textContent = 'Exit Full';
    } else {
        document.exitFullscreen();
        fullscreenBtn.querySelector('i').className = 'fas fa-expand';
        fullscreenBtn.querySelector('span').textContent = 'Fullscreen';
    }
    animateButton(fullscreenBtn);
}

// Toggle sound
function toggleSound() {
    soundEnabled = !soundEnabled;
    soundBtn.classList.toggle('muted');
    
    if (soundEnabled) {
        soundBtn.querySelector('i').className = 'fas fa-volume-up';
        soundBtn.querySelector('span').textContent = 'Sound On';
        playBeep();
    } else {
        soundBtn.querySelector('i').className = 'fas fa-volume-mute';
        soundBtn.querySelector('span').textContent = 'Sound Off';
    }
    animateButton(soundBtn);
}

// Toggle theme (light/dark mode)
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('light-mode');
    themeBtn.classList.toggle('light-mode');
    
    if (isDarkMode) {
        themeBtn.querySelector('i').className = 'fas fa-moon';
        themeBtn.querySelector('span').textContent = 'Dark Mode';
    } else {
        themeBtn.querySelector('i').className = 'fas fa-sun';
        themeBtn.querySelector('span').textContent = 'Light Mode';
    }
    animateButton(themeBtn);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${type === 'success' ? '#00e676' : '#ff5252'}, ${type === 'success' ? '#00d4ff' : '#ff1744'});
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 2500);
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Space bar: Start/Pause
    if (e.code === 'Space') {
        e.preventDefault();
        if (!isRunning && !startBtn.disabled) {
            start();
        } else if (isRunning && !pauseBtn.disabled) {
            pause();
        }
    }
    
    // R key: Reset
    if (e.code === 'KeyR' && !isRunning) {
        reset();
    }
    
    // L key: Lap
    if (e.code === 'KeyL' && isRunning && !lapBtn.disabled) {
        recordLap();
    }
});

// ========== WELCOME MESSAGE ==========
window.addEventListener('DOMContentLoaded', () => {
    console.log('%c⏱️ Stopwatch Application Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c⌨️ Keyboard Shortcuts:', 'color: #764ba2; font-size: 14px; font-weight: bold;');
    console.log('%c  Space - Start/Pause', 'color: #10b981; font-size: 12px;');
    console.log('%c  R - Reset', 'color: #ef4444; font-size: 12px;');
    console.log('%c  L - Record Lap', 'color: #667eea; font-size: 12px;');
});
