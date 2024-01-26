export class Stopwatch {
  time = 0;

  restart() {
      this.time = Date.now();
  }

  measure() {
      let previousTime = this.time;
      this.time = Date.now();
      return (this.time - previousTime) * 1e-3;
  }

  check() {
      return (Date.now() - this.time) * 1e-3;
  }
}
