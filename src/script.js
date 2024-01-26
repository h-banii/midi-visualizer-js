import { Animation } from './animation';
import { HTML5CanvasRenderer } from './renderer';
import { SocketIoController, MockController } from './controller';
import { NoteGroup } from './note';
import { PianoVisualizer, WaveVisualizer } from './visualizer';

function main() {
  const renderer = new HTML5CanvasRenderer;
  const animation = new Animation(renderer);
  const controller = new SocketIoController("midi");
  const visualizer = new PianoVisualizer(renderer, 30);
  const notes = new NoteGroup(controller, visualizer);

  animation.add(notes);
  animation.start();
}

window.addEventListener("load", main);
