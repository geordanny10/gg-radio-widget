// Guard: Prevent multiple instances
if (window.GGRadioPlayerInitialized) {
  console.log("🔁 Player already initialized. Skipping...");
  return;
}
window.GGRadioPlayerInitialized = true;

console.log("🎵 Core script running");

// Check for or create the container
let container = document.getElementById("audio-widget-container");
if (!container) {
  console.log("❌ No #audio-widget-container found. Creating one...");
  container = document.createElement("div");
  container.id = "audio-widget-container";
  document.body.appendChild(container);
} else {
  console.log("✅ Found #audio-widget-container");
}

// Create player wrapper
const player = document.createElement("div");
player.id = "floating-audio-player";
console.log("🎧 Player container created.");

// Song title
const songTitle = document.createElement("div");
songTitle.className = "song-title";
songTitle.textContent = "Camilo - La Boda";
player.appendChild(songTitle);
console.log("🎵 Song title created.");

// Audio element
const audio = document.createElement("audio");
audio.id = "background-music";
audio.controls = true;
audio.preload = "auto";
audio.loop = true; // 🔁 Repeat the song
audio.volume = 1.0; // Set volume to max
console.log("🎧 Audio element created.");

// Audio source
const source = document.createElement("source");
source.src = "https://ggboda.com/wp-content/uploads/2025/03/Camilo-La-Boda.mp3";
source.type = "audio/mpeg";
audio.appendChild(source);
console.log("🎧 Source element added.");

// Append to DOM
player.appendChild(audio);
container.appendChild(player);
console.log("✅ Player added to DOM");

// Autoplay logic
const startPlayback = async () => {
  try {
    audio.muted = true;
    await audio.play();
    console.log("✅ Autoplay started (muted)");

    setTimeout(() => {
      audio.muted = false;
      audio.volume = 1.0;
      console.log("🔊 Volume unmuted after autoplay.");
    }, 500);
  } catch (err) {
    console.warn("⚠️ Autoplay failed", err);
  }
};
startPlayback();

// Clear saved
