console.log("🎵 Core script running");

(function () {
  const existingContainer = document.getElementById("audio-widget-container");
  let container = existingContainer;

  if (!container) {
    console.warn("❌ No #audio-widget-container found. Creating one...");
    container = document.createElement("div");
    container.id = "audio-widget-container";
    document.body.appendChild(container);
  } else {
    console.log("✅ Found #audio-widget-container");
  }

  // Clear any previous player
  const existingPlayer = document.getElementById("floating-audio-player");
  if (existingPlayer) {
    existingPlayer.remove();
  }

  const player = document.createElement("div");
  player.id = "floating-audio-player";
  console.log("🎧 Player container created.");

  const title = document.createElement("div");
  title.className = "song-title";
  title.textContent = "Camilo - La Boda";
  console.log("🎵 Song title created.");

  const audio = document.createElement("audio");
  audio.controls = true;
  audio.autoplay = true;
  audio.preload = "auto";
  audio.loop = true; // Loop the song
  audio.muted = false; // Unmuted from the start
  audio.volume = 1.0; // Full volume
  console.log("🎧 Audio element created.");

  const source = document.createElement("source");
  source.src = "https://ggboda.com/wp-content/uploads/2025/03/Camilo-La-Boda.mp3";
  source.type = "audio/mpeg";
  audio.appendChild(source);
  console.log("🎧 Source element added.");

  player.appendChild(title);
  player.appendChild(audio);
  container.appendChild(player);
  console.log("✅ Player added to DOM");

  // Start playback if not blocked
  audio.play().then(() => {
    console.log("✅ Audio started playing (unmuted)");
  }).catch((e) => {
    console.warn("⚠️ Autoplay blocked. User interaction required:", e);
  });

  // Save and restore the playback position
  const key = "gg-radio-time";
  const savedTime = localStorage.getItem(key);
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
    console.log(`🎧 Resuming from saved time: ${savedTime} seconds`);
  }

  // Save current time to localStorage every time it updates
  audio.addEventListener("timeupdate", () => {
    localStorage.setItem(key, audio.currentTime);
  });

  // Reset to beginning on full reload
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem(key); // Optionally clear saved time on page reload
    audio.currentTime = 0;
  });
})();
