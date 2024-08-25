import { Animation } from './animation';
import { HTML5CanvasRenderer as Renderer } from './renderer';
import { NativeController as Controller } from './controller';
import { NoteGroup } from './note';
import { PianoVisualizer as Visualizer } from './visualizer';

function main() {
  const renderer = new Renderer;
  const animation = new Animation(renderer);
  const visualizer = new Visualizer(renderer, 30);
  const controller = new Controller;
  const notes = new NoteGroup(controller, visualizer);

  animation.add(notes);
  animation.start();
}

window.addEventListener("load", main);
