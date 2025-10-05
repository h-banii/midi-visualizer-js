export default class Controller extends EventTarget {
  send(data) {
    const status = data[0] >> 4;
    const noteOn = (status === 9) - (status === 8);

    if (noteOn === 0) return;

    const note = data[1];
    const velocity = data[2];

    this.dispatchEvent(
      new CustomEvent(noteOn == 1 ? "noteOn" : "noteOff", {
        detail: {
          keyNumber: note,
          velocity: velocity,
        },
      }),
    );
  }
}
