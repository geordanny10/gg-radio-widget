(function () {
  console.log('🎵 Core script running');

  // Check if the container for the widget exists
  const widgetContainer = document.getElementById('audio-widget-container');
  if (!widgetContainer) {
    console.log('❌ No #audio-widget-container found. Creating one...');
    // Create the container if not present
    const newContainer = document.createElement('div');
    newContainer.id = 'audio-widget-container';
    document.body.appendChild(newContainer);
  }

  // Create the player container
  const playerContainer = document.createElement('div');
  playerContainer.id = 'floating-audio-player';
  playerContainer.style.position = 'fixed';
  playerContainer.style.bottom = '16px';
  playerContainer.style.left = '50%';
  playerContainer.style.transform = 'translateX(-50%)';
  playerContainer.style.zIndex = '9999';
  playerContainer.style.background = 'rgba(161, 61, 45, .8)';
  playerContainer.style.padding = '10px 20px';
  playerContainer.style.borderRadius = '14px';
  playerContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  playerContainer.style.textAlign = 'center';
  playerContainer.style.fontFamily = "'Mate', serif";
  playerContainer.style.width = 'auto';
  playerContainer.style.marginBottom = '70px';

  // Song title
  const songTitle = document.createElement('div');
  songTitle.className = 'song-title';
  songTitle.textContent = 'Camilo - La Boda';

  // Create the audio element
  const audio = document.createElement('audio');
  audio.id = 'background-music';
  audio.controls = true;
  audio.autoplay = true;
  audio.preload = 'auto';
  audio.muted = true;  // Start muted (due to autoplay restrictions on mobile)

  // Attempt to start playback
  audio.play().then(() => {
    // Unmute after autoplay starts
    audio.muted = false;
    audio.volume = 1;  // Set volume to 100%
    console.log('✅ Autoplay started (unmuted)');
  }).catch(error => {
    console.error('Error with autoplay:', error);
  });

  // Create the audio source element
  const source = document.createElement('source');
  source.src = 'https://ggboda.com/wp-content/uploads/2025/03/Camilo-La-Boda.mp3'; // Update this with your audio file URL
  source.type = 'audio/mpeg';

  // Append the source to the audio element
  audio.appendChild(source);

  // Append the song title and audio player to the player container
  playerContainer.appendChild(songTitle);
  playerContainer.appendChild(audio);

  // Append the player container to the widget container
  widgetContainer.appendChild(playerContainer);

  console.log('🎧 Player container created');
  console.log('🎵 Song title created');
  console.log('🎧 Audio element created');
  console.log('🎧 Source element added');
  console.log('✅ Player added to DOM');

  // Remember the last playback position using localStorage
  const key = 'gg-radio-time';
  const savedTime = localStorage.getItem(key);
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // Save the current playback time
  audio.addEventListener('timeupdate', function () {
    localStorage.setItem(key, audio.currentTime);
  });
})();
