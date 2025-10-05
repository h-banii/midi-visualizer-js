export class WebsocketController extends EventTarget {
  constructor() {
    super();

    this.socket = new WebSocket("ws://localhost:8080");

    this.socket.addEventListener("message", (recv) => {
      const message = JSON.parse(recv.data);
      this.dispatchEvent(
        new CustomEvent(message.event, {
          detail: message.data,
        }),
      );
    });
  }
}

export default WebsocketController;
