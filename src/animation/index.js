import { Stopwatch } from './stopwatch.js';

export class Animation {
  constructor(renderer) {
    this.renderer = renderer;
    this.actors = [];
    this.stopwatch = new Stopwatch;
    this.isRunning = false;
  }

  add(actor) {
    this.actors.push(actor);
  }

  start() {
    this.isRunning = true;
    this.update();
  }

  stop() {
    this.isRunning = false;
  }

  update() {
    const dt = this.stopwatch.measure();
    this.renderer.clear();
    this.actors.forEach(actor => actor.update(dt));
    if (this.isRunning) requestAnimationFrame(() => this.update());
  }
}
