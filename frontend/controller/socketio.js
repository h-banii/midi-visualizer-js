export class SocketIoController extends EventTarget {
  constructor(service = "midi") {
    super()

    this.socket = io("http://localhost:13140", {
      extraHeaders: {
        name: "midi-visualizer-app",
        author: "h-banii"
      },
      autoConnect: false
    });

    this.socket.on('connect', (message) => {
      this.socket.emit("subscribe", service)
    })

    this.socket.on(service, (msg) => {
      this.dispatchEvent(new CustomEvent(msg.event, {
        detail: msg.data
      }))
    })

    this.socket.connect()
  }
}

export default SocketIoController;
