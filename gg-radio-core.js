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
  audio.preload =
