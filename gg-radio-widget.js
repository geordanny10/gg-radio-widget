// Loader script: Injects style and logic dynamically
(function () {
  const head = document.head;

  // Load CSS
  const styleLink = document.createElement("link");
  styleLink.rel = "stylesheet";
  styleLink.href = "https://gg-radio-widget.vercel.app/gg-radio-style.css"; // Replace with final CDN if needed
  head.appendChild(styleLink);

  // Load core JS
  const script = document.createElement("script");
  script.src = "https://gg-radio-widget.vercel.app/gg-radio-core.js"; // Replace with final CDN if needed
  script.defer = true;
  head.appendChild(script);
})();