import Controller from './Controller.js'

export class NativeController extends Controller {
  constructor() {
    super();
    navigator.requestMIDIAccess().then(
      (midiAccess) => {
        this.midi = midiAccess;
        this.midi.inputs.forEach((entry) => {
          entry.onmidimessage = (event) => this.send(event.data);
        });
      },
      (error) => {
        console.error(`Failed to get MIDI access - ${error}`);
      },
    );
  }
}

export default NativeController;
