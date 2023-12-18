class AudioControl {
  constructor(src) {
    // Load Audio Source and Create Audio Element
    this.src = src;
    this.audioContainer = document.querySelector(".audio-control");
    this.audio = document.querySelector("audio");
    // Set Audio Properties
    this.audio.volume = 0.5;
    this.audio.loop = true;

    // Create Audio Context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.audioElement = this.audio;
    this.audioSrc = this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.audioCtx.createAnalyser();
    this.audioSrc.connect(this.analyser);
    this.audioSrc.connect(this.audioCtx.destination);
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    
  }

  play() {
    this.audio.play();
}

  pause() {
    this.audio.pause();
  }

  toggle() {

     if (this.audio.paused) {
      this.play();
    } else if(this.audioCtx.state === 'suspended') {
this.audioCtx.resume().then(() => {
      this.audio.play();
    });
    }else {
      this.pause();
    }
  }
}

export { AudioControl };
