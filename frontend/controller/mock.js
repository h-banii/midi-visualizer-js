export class MockController extends EventTarget {
  constructor() {
    super();
    let i = 0;
    setInterval(() => {
      const note = 75 + 10 * i;
      this.dispatchEvent(new CustomEvent("noteOn", {
        detail: {
          keyNumber: note,
          velocity: 30
        }
      }))
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent("noteOff", {
          detail: {
            keyNumber: note,
            velocity: 30
          }
        }))
      }, 2000);
      i = (i + 1) % 50
    }, 6000);
  }
}

export default MockController;
