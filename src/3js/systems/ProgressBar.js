class ProgressBar {
  constructor(container) {
    this.container = container;
    this.progress = 0;
    this.array = container.querySelectorAll(".star");
  }

  updateProgress(progress) {
    this.progress = Math.floor(progress * this.array.length);
    for (let i = 0; i < this.array.length; i++) {
      if (i < this.progress) {
        this.array[i].classList.add("active");
      } else {
        this.array[i].classList.remove("active");
      }
    }
  }

  incrementProgress() {
    this.progress += 1;
    this.array[this.progress - 1].classList.add("active");
  }
}

export { ProgressBar };
