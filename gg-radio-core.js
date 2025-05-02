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
  audio.loop = true;
  audio.muted = true; // Start muted to avoid autoplay restrictions
  audio.volume = 1.0;
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

  // Start muted autoplay
  audio.play().then(() => {
    console.log("✅ Autoplay started (muted)");
  }).catch((e) => {
    console.warn("⚠️ Autoplay blocked:", e);
  });

  // Unmute after a small delay (for desktop and mobile)
  setTimeout(() => {
    audio.muted = false;
    audio.play().then(() => {
      console.log("🔊 Audio unmuted and playing.");
    }).catch((e) => {
      console.warn("⚠️ Error while unmuting:", e);
    });
  }, 1000); // 1 second delay after autoplay starts to unmute

  // Reset to beginning on full reload
  window.addEventListener("beforeunload", () => {
    audio.currentTime = 0;
  });
})();
