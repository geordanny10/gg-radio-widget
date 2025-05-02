console.log("🎧 Widget script loaded!");

// Loader script: Injects style and logic dynamically
(function () {
  const head = document.head;

  // Load CSS
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://gg-radio-widget.vercel.app/gg-radio-style.css";
  head.appendChild(styleLink);

  // Load core JS after CSS loads
  const script = document.createElement("script");
  script.src = "https://gg-radio-widget.vercel.app/gg-radio-core.js?v=" + Date.now();
  script.defer = true;
  script.onload = () => console.log("🎧 Core audio player loaded!");
  script.onerror = () => console.error("❌ Failed to load core audio player.");
  head.appendChild(script);
})();
