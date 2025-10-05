# midi-visualizer-js

Basic web midi visualizer.

# Browser

Just open it in a browser with [MIDI API
support](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API) and it
should work.

# OBS

Since OBS doesn't allow browser sources to use the web MIDI API, we can use OBS
websockets as a workaround for now:

- Add a browser source in OBS with this url:
- Start the OBS websocket server: `npm start`

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
