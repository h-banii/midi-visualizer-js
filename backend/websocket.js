import { WebSocketServer } from "ws";
import midi from "@julusian/midi";
import readline from "readline-sync";

const wss = new WebSocketServer({ port: 8080 });
let clients = [];

wss.on("connection", function connection(client) {
  client.on("error", console.error);

  client.on("close", function close() {
    clients = clients.filter((c) => c != client);
  });

  clients.push(client);
});

const input = new midi.Input();

Array(input.getPortCount())
  .keys()
  .forEach((i) => console.log(`${i}: ${input.getPortName(i)}`));

const port = parseInt(readline.question("\nMIDI Input port: "));

input.on("message", (_dt, message) => {
  const status = message[0] >> 4; // ignoring channel
  // TODO: Check if < 128 ("running status", use previous status)

  switch (status) {
    case 8:
      clients.forEach((client) =>
        client.send(
          JSON.stringify({
            event: "noteOff",
            data: {
              keyNumber: message[1],
              velocity: message[2],
            },
          }),
        ),
      );
      break;
    case 9:
      clients.forEach((client) =>
        client.send(
          JSON.stringify({
            event: "noteOn",
            data: {
              keyNumber: message[1],
              velocity: message[2],
            },
          }),
        ),
      );
      break;
    default:
      console.log("Uncaught event:", message);
  }
});

input.openPort(port);
input.ignoreTypes(true, true, true);
