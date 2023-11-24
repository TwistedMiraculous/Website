document.addEventListener('DOMContentLoaded', function() {
    const audioFileInput = document.getElementById('audioFile');
    const audioPlayer = document.getElementById('audioPlayer');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const trimButton = document.getElementById('trimButton');
  
    let audioSource = null;
  
    audioFileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      audioSource = URL.createObjectURL(file);
      audioPlayer.src = audioSource;
    });
  
    trimButton.addEventListener('click', function() {
      if (audioSource) {
        const start = parseFloat(startTimeInput.value) || 0;
        const end = parseFloat(endTimeInput.value) || audioPlayer.duration;
        
        if (start >= 0 && start < end && end <= audioPlayer.duration) {
          const trimmedBlob = trimAudio(audioSource, start, end);
          audioPlayer.src = URL.createObjectURL(trimmedBlob);
        } else {
          alert('Invalid start or end time.');
        }
      } else {
        alert('Please upload an audio file.');
      }
    });
  
    function trimAudio(audioSource, start, end) {
      const audio = new Audio(audioSource);
      const context = new AudioContext();
      const source = context.createMediaElementSource(audio);
      const destination = context.createMediaStreamDestination();
      const recorder = new MediaRecorder(destination.stream);
      const startTime = start;
      const endTime = end;
      audio.currentTime = startTime;
  
      source.connect(destination);
      audio.play();
  
      return new Promise(resolve => {
        recorder.ondataavailable = e => {
          const trimmedAudio = new Blob([e.data], { type: 'audio/mp3' });
          resolve(trimmedAudio);
        };
  
        recorder.onstop = () => {
          context.close();
        };
  
        setTimeout(() => {
          audio.pause();
          recorder.stop();
        }, (endTime - startTime) * 1000);
  
        recorder.start();
      });
    }
  });
  