export class HTML5CanvasRenderer {
  constructor(canvas) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = "#ffc4e3"
    this.ctx.strokeStyle = "#ff3b5b"
    this.ctx.globalAlpha = 0.6;
  }

  set lineWidth(value) {
    this.ctx.lineWidth = value;
  }

  begin() {
    this.ctx.beginPath();
  }

  rect(x, y, w, h, r) {
    if (r) {
      this.ctx.roundRect(x | 0, y | 0, w | 0, h | 0, r);
    } else {
      this.ctx.rect(x | 0, y | 0, w | 0, h | 0);
    }
  }

  circle(x, y, radius) {
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  }

  fillStyle(value) {
    this.ctx.fillStyle = value;
  }

  fill() {
    this.ctx.fill();
  }

  stroke() {
    this.ctx.stroke();
  }

  get width() {
    return this.ctx.canvas.width;
  }

  get height() {
    return this.ctx.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
