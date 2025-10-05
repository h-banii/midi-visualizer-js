export class NativeController extends EventTarget {
  constructor() {
    super();
    navigator.requestMIDIAccess().then((midiAccess) => {
      this.midi = midiAccess;
      this.midi.inputs.forEach((entry) => {
        entry.onmidimessage = this.send.bind(this);
      });
    }, (error) => {
      console.error(`Failed to get MIDI access - ${error}`);
    });
  }

  send(event) {
    const data = event.data;
    const status = data[0] >> 4;
    const noteOn = (status === 9) - (status === 8);

    if (noteOn === 0) return;

    const note = data[1];
    const velocity = data[2];

    this.dispatchEvent(new CustomEvent(noteOn == 1 ? "noteOn" : "noteOff", {
      detail: {
        keyNumber: note,
        velocity: velocity
      }
    }))
  }
}

export default NativeController;
