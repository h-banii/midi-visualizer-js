import { OBSWebSocket } from "obs-websocket-js";
import midi from "@julusian/midi";
import readline from "readline-sync";

class Server {
  constructor(midiListener) {
    this.socket = new OBSWebSocket();

    this.socket.connect(
      process.env?.OBS_WS_URL ?? "ws://127.0.0.1:4455",
      process.env?.OBS_WS_PASSWORD,
      {},
    );

    midiListener.addEventListener("midi-event", (event) => {
      this.socket.call("CallVendorRequest", {
        vendorName: "obs-browser",
        requestType: "emit_event",
        requestData: {
          event_name: "midi-event",
          // It fails to send arrays (for whatever reason), so let's send a string.
          event_data: {
            dt: event.detail.dt,
            data: JSON.stringify(event.detail.data),
          },
        },
      });
    });
  }
}

class MidiListener extends EventTarget {
  constructor() {
    super();

    this.input = new midi.Input();

    this.input.on("message", (dt, data) => {
      this.dispatchEvent(
        new CustomEvent("midi-event", {
          detail: {
            dt,
            data,
          },
        }),
      );
    });
  }

  connect() {
    Array(this.input.getPortCount())
      .keys()
      .forEach((i) => console.log(`${i}: ${this.input.getPortName(i)}`));

    const port = parseInt(readline.question("\nMIDI Input port: "));

    this.input.openPort(port);
    this.input.ignoreTypes(true, true, true);
  }
}

const midiListener = new MidiListener();
new Server(midiListener);
midiListener.connect();
