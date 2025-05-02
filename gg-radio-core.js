document.addEventListener("DOMContentLoaded", function () {
  console.log("🎵 Core script running");

  // Check if the widget container exists
  let widgetContainer = document.getElementById("audio-widget-container");
  if (!widgetContainer) {
    console.warn("❌ No #audio-widget-container found. Creating one...");
    widgetContainer = document.createElement("div");
    widgetContainer.id = "audio-widget-container";
    document.body.appendChild(widgetContainer);
  } else {
    console.log("✅ Found #audio-widget-container");
  }

  // Create the audio player container
  const player = document.createElement("div");
  player.id = "floating-audio-player";

  // Create song title
  const songTitle = document.createElement("div");
  songTitle.className = "song-title";
  songTitle.textContent = "Camilo - La Boda";

  // Create audio element
  const audio = document.createElement("audio");
  audio.id = "background-music";
  audio.controls = true;
  audio.autoplay = true;
  audio.preload = "auto";
  audio.muted = true;
  audio.setAttribute("playsinline", ""); // Important for mobile devices

  // Create source element
  const source = document.createElement("source");
  source.src = "https://ggboda.com/wp-content/uploads/2025/03/Camilo-La-Boda.mp3";
  source.type = "audio/mpeg";
  audio.appendChild(source);

  // Attempt to autoplay
  audio.play().then(() => {
    console.log("✅ Autoplay started (muted)");
  }).catch((e) => {
    console.warn("⚠️ Autoplay failed, waiting for user interaction...");
    audio.muted = false;
    const resumeOnTap = () => {
      audio.play().then(() => {
        console.log("✅ Playback started after user tap");
        document.body.removeEventListener("click", resumeOnTap);
      });
    };
    document.body.addEventListener("click", resumeOnTap);
  });

  // Remember playback position using localStorage
  const key = "gg-radio-time";
  const savedTime = localStorage.getItem(key);
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // Save current playback time
  audio.addEventListener("timeupdate", function () {
    localStorage.setItem(key, audio.currentTime);
  });

  // Append the elements to the container
  player.appendChild(songTitle);
  player.appendChild(audio);
  widgetContainer.appendChild(player);

  console.log("✅ Player added to DOM");
});
