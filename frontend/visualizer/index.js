export class PianoVisualizer {
  constructor(renderer) {
    this.renderer = renderer;
    this.width = renderer.width / 88;
    this.height = 200; // height in pixels per second;
    this.baseY = renderer.height;
    this.direction = -1;
    this.radius = 5;
  }

  draw(note) {
    const length = note.startTime - note.endTime;
    this.renderer.begin();
    if (note.natural) {
      this.renderer.colorFromCss("--midi-white-fill", "--midi-white-stroke");
    } else {
      this.renderer.colorFromCss("--midi-black-fill", "--midi-black-stroke");
    }
    this.renderer.rect(
      note.position * this.renderer.width,
      this.baseY + this.direction * note.endTime * this.height,
      note.width * this.renderer.width,
      this.direction * length * this.height,
      this.radius,
    );
    this.renderer.fill();
    this.renderer.stroke();
  }
}

export class WaveVisualizer {
  constructor(renderer) {
    this.renderer = renderer;
    this.baseX = renderer.width >> 1;
    this.baseY = renderer.height >> 1;
    this.diameter = 400;
    this.speed = 50;
    this.radius = 5;
  }

  draw(note) {
    const length = note.startTime - note.endTime;
    const key = note.keyNumber - 21;
    this.renderer.begin();
    this.renderer.circle(
      this.baseX + this.diameter * Math.sin((key / 88) * 2 * Math.PI),
      this.baseY + this.diameter * Math.cos((key / 88) * 2 * Math.PI),
      (note.startTime + note.endTime ** 2) * this.speed,
    );
    this.renderer.lineWidth = length * this.speed;
    this.renderer.stroke();
  }
}
