export class WebsocketController extends EventTarget {
  constructor(service = "midi") {
    super()

    this.socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
    });
  }
}

export default SocketIoController;
