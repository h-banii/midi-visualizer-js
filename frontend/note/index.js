export class Note {
  static cache = {};

  constructor({ keyNumber, velocity }, dismiss) {
    this.keyNumber = keyNumber;
    this.velocity = velocity;
    this.startTime = 0;
    this.endTime = 0;
    this.dismiss = dismiss;

    if (!(keyNumber in Note.cache)) {
      Note.save(keyNumber);
    }

    Object.assign(this, Note.cache[keyNumber]);
  }

  static isNatural(key) {
    let keyIndex = key - 21;
    let chromatic_note = keyIndex % 12;

    return [
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
    ][chromatic_note];
  }

  static save(key) {
    let keyIndex = key - 21;

    let chromatic_note = keyIndex % 12;
    let octave = (keyIndex / 12) | 0;
    let white_width = 1;
    let black_width = 3 / 5;

    let [position, natural] = [0, true];

    if (chromatic_note == 0) [position, natural] = [0, true];
    else if (chromatic_note == 1) [position, natural] = [4 / 5, false];
    else if (chromatic_note == 2) [position, natural] = [1, true];
    else if (chromatic_note == 3) [position, natural] = [2, true];
    else if (chromatic_note == 4)
      [position, natural] = [2 + black_width, false];
    else if (chromatic_note == 5) [position, natural] = [3, true];
    else if (chromatic_note == 6) [position, natural] = [3 + 4 / 5, false];
    else if (chromatic_note == 7) [position, natural] = [4, true];
    else if (chromatic_note == 8) [position, natural] = [5, true];
    else if (chromatic_note == 9)
      [position, natural] = [5 + black_width, false];
    else if (chromatic_note == 10) [position, natural] = [6, true];
    else if (chromatic_note == 11) [position, natural] = [6 + 4 / 5, false];

    const total = 49 + 3;

    Note.cache[key] = {
      position: (position + octave * 7) / total,
      width: (natural ? white_width : black_width) / total,
      natural,
    };
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
    const update = (keyNumber) => {
      const notes = this.notes[keyNumber];
      for (let i = notes.length - 1; i >= 0; --i) {
        const note = notes[i];
        note.update(dt);
        this.visualizer.draw(note);
        if (note.endTime > this.ttl) {
          notes.splice(i, 1);
        }
      }
    };

    for (const keyNumber in this.notes) {
      if (Note.isNatural(keyNumber)) {
        update(keyNumber);
      }
    }

    for (const keyNumber in this.notes) {
      if (!Note.isNatural(keyNumber)) {
        update(keyNumber);
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
