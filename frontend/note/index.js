export class Note {
  constructor({ keyNumber, velocity }, dismiss) {
    this.keyNumber = keyNumber;
    this.velocity = velocity;
    this.startTime = 0;
    this.endTime = 0;
    this.dismiss = dismiss;
  }

  off() {
    this.update = (dt) => {
      this.endTime += dt;
      this.startTime += dt;
    };
  }

  update(dt) {
    this.startTime += dt;
  }
}

export class NoteGroup {
  constructor(controllers, visualizer) {
    this.controllers = controllers;
    this.visualizer = visualizer;
    this.notes = {};
    this.ttl = 6;

    this.controllers.forEach((controller) =>
      controller.addEventListener("noteOn", (event) => {
        const data = event.detail;
        if (!(data.keyNumber in this.notes)) this.notes[data.keyNumber] = [];
        const index = this.notes[data.keyNumber].length;
        const note = new Note(data, () => {
          this.notes[data.keyNumber].slice(index, 1);
        });
        this.notes[data.keyNumber].push(note);
      }),
    );

    this.controllers.forEach((controller) =>
      controller.addEventListener("noteOff", (event) => {
        const data = event.detail;
        const notes = this.notes[data.keyNumber];
        if (notes) notes[notes.length - 1].off();
      }),
    );
  }

  clear(interval = 10) {
    console.log("f");
    for (const keyNumber in this.notes) {
      const notes = this.notes[keyNumber];
      for (let i = notes.length - 1; i >= 0; --i) {
        const note = notes[i];
        if (note.endTime > interval) {
          notes.splice(i, 1);
        }
      }
    }
  }

  update(dt) {
    for (const keyNumber in this.notes) {
      const notes = this.notes[keyNumber];
      for (let i = notes.length - 1; i >= 0; --i) {
        const note = notes[i];
        note.update(dt);
        this.visualizer.draw(note);
        if (note.endTime > this.ttl) {
          notes.splice(i, 1);
        }
      }
    }
  }

  forEach(callback) {
    for (const keyNumber in this.notes) {
      for (const note of this.notes[keyNumber]) {
        callback(note);
      }
    }
  }
}
