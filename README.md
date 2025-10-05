# midi-visualizer-js

Basic web midi visualizer.

# Browser

Just open https://h-banii.github.io/midi-visualizer-js/ in a browser with
[MIDI API
support](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) and it
should work.

# OBS

Since OBS doesn't allow browser sources to use the web MIDI API, we can use OBS
websockets as a workaround for now:

- Add a browser source in OBS with this url: `https://h-banii.github.io/midi-visualizer-js/`
- Start the OBS websocket server: `npm start` (then type the MIDI port and press `enter`)

```console
$ npm start

0: Midi Through:Midi Through Port-0 14:0
1: Digital Piano:Digital Piano MIDI 1 24:0
2: Digital Piano:Digital Piano MIDI 2 24:1

MIDI Input port: 1 # type the port number (1 in my case) and press ENTER
```

# Customizing

You can use CSS variables to customize it.

```css
:root {
  /* white keys */
  --midi-white-fill: #ffe06e;
  --midi-white-stroke: #ffa530;

  /* black keys */
  --midi-black-fill: #ffc06e;
  --midi-black-stroke: #d16928;

  /* transparency */
  --midi-alpha: 0.9;
}
```

# Developing

Web frontend

```sh
npm run dev
```

OBS websocket server

```sh
npm start
```
