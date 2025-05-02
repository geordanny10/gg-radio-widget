(function () {
  const audioPlayerContainer = document.createElement('div');
  audioPlayerContainer.id = 'audio-widget-container';
  document.body.appendChild(audioPlayerContainer);

  // Create player elements
  const audioElement = document.createElement('audio');
  const playButton = document.createElement('button');
  playButton.innerText = 'Play';

  audioPlayerContainer.appendChild(playButton);
  audioPlayerContainer.appendChild(audioElement);

  // Song info
  const songInfo = document.createElement('div');
  songInfo.id = 'song-title';
  audioPlayerContainer.appendChild(songInfo);

  const audioSource = document.createElement('source');
  audioElement.appendChild(audioSource);

  // Default audio URL and other properties
  const audioUrl = 'https://path-to-your-audio-file.mp3';
  audioElement.src = audioUrl;
  audioElement.loop = true; // Loop the song

  // Restore from localStorage
  const savedTime = localStorage.getItem('audioTime');
  const savedVolume = localStorage.getItem('audioVolume');
  const savedSong = localStorage.getItem('audioSong');
  const songTitle = savedSong || 'Default Song Title'; // If no song is saved, use default

  songInfo.innerText = songTitle;

  // Apply saved time and volume
  if (savedTime) audioElement.currentTime = savedTime;
  if (savedVolume) audioElement.volume = savedVolume;

  // Event listener for play button
  playButton.addEventListener('click', function () {
    // Ensure autoplay works by user interaction
    if (audioElement.paused) {
      audioElement.play().then(() => {
        // Unmute the audio when user clicks play
        audioElement.muted = false;
        playButton.innerText = 'Pause';
        // Save song info
        localStorage.setItem('audioSong', songTitle);
      }).catch((err) => {
        console.log('Autoplay failed: ' + err);
      });
    } else {
      audioElement.pause();
      playButton.innerText = 'Play';
    }
  });

  // Listen for audio time updates and save to localStorage
  audioElement.addEventListener('timeupdate', function () {
    localStorage.setItem('audioTime', audioElement.currentTime);
  });

  // Save the volume in localStorage
  audioElement.addEventListener('volumechange', function () {
    localStorage.setItem('audioVolume', audioElement.volume);
  });

  // Loop song behavior
  audioElement.addEventListener('ended', function () {
    audioElement.currentTime = 0;
    audioElement.play();
  });

  // Automatically start playing (if the user has already interacted before)
  if (savedTime > 0) {
    audioElement.play().catch((err) => {
      console.log('Autoplay failed: ' + err);
    });
  }
})();
