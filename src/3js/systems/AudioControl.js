class AudioControl {
  constructor(src) {
    // Load Audio Source and Create Audio Element
    this.src = src;
    this.audioContainer = document.querySelector(".audio-control");
    // Create Audio Element in AudioContainer
    this.audioContainer.innerHTML += `
      <audio id="audio" src="${this.src}"></audio>
    `;
    this.audio = this.audioContainer.querySelector("audio");
    this.audio.src = this.src;

    // Set Audio Properties
    this.audio.volume = 0.5;
    this.audio.loop = true;

    // Create Audio Context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.audioElement = document.getElementById("audio");
    this.audioSrc = this.audioCtx.createMediaElementSource(this.audioElement);
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
    this.audio.paused ? this.play() : this.pause();
  }
}

export { AudioControl };
