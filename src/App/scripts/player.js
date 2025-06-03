const player = document.getElementById('player');
const seekBar = document.getElementById('seek');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const playPauseBtn = document.getElementById('play-pause');

// Слушаем клик
playPauseBtn.addEventListener('click', () => {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

// Обновление длительности
player.addEventListener('loadedmetadata', () => {
    seekBar.max = player.duration;
    durationEl.textContent = formatTime(player.duration);
});

// Обновление положения трека
player.addEventListener('timeupdate', () => {
    seekBar.value = player.currentTime;
    currentTimeEl.textContent = formatTime(player.currentTime);
});

// Перемотка
seekBar.addEventListener('input', () => {
    player.currentTime = seekBar.value;
});

// Формат времени 00:00
function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

