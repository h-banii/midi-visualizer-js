import Controller from "./Controller.js";

export class OBSWebsocketController extends Controller {
  constructor() {
    super();
    window.addEventListener("midi-event", event => {
      // TODO: OBS websocket fails to send arrays (for whatever reason), so
      // for now we receive it as a string then parse it to an array.
      this.send(JSON.parse(event.detail.data));
    });
  }
}

export default OBSWebsocketController;
