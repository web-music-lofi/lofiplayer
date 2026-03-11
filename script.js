const audio = document.getElementById('audioPlayer');
const playPause = document.getElementById('playPause');
const seekBar = document.getElementById('seekBar');
const currentTime = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

function formatTime(seconds) {
  if (!seconds || isNaN(seconds) || seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {});
    playPause.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playPause.innerHTML = '<i class="fas fa-play"></i>';
  }
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration && !isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100;
    seekBar.value = progress;
    currentTime.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

seekBar.addEventListener('input', () => {
  if (audio.duration && !isNaN(audio.duration)) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  audio.play();
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});
