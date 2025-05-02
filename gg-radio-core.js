document.addEventListener("DOMContentLoaded", function () {
  const widgetContainer = document.getElementById("audio-widget-container");
  if (!widgetContainer) return;

  const player = document.createElement("div");
  player.id = "floating-audio-player";

  const songTitle = document.createElement("div");
  songTitle.className = "song-title";
  songTitle.textContent = "Camilo - La Boda";

  const audio = document.createElement("audio");
  audio.id = "background-music";
  audio.controls = true;
  audio.preload = "auto";
  audio.muted = true;

  // Try to autoplay and unmute later
  const attemptPlay = () => {
    audio.play().then(() => {
      audio.muted = false;
    }).catch(() => {
      // Wait for user interaction
      const userStart = () => {
        audio.muted = false;
        audio.play();
        document.removeEventListener('click', userStart);
        document.removeEventListener('touchstart', userStart);
      };
      document.addEventListener('click', userStart);
      document.addEventListener('touchstart', userStart);
    });
  };

  attemptPlay();

  const source = document.createElement("source");
  source.src = "https://ggboda.com/wp-content/uploads/2025/03/Camilo-La-Boda.mp3";
  source.type = "audio/mpeg";
  audio.appendChild(source);

  player.appendChild(songTitle);
  player.appendChild(audio);
  widgetContainer.appendChild(player);

  const key = "gg-radio-time";
  const savedTime = localStorage.getItem(key);
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  audio.addEventListener("timeupdate", function () {
    localStorage.setItem(key, audio.currentTime);
  });
});