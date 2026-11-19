# AI Face Detection

Real-time face detection in the browser using [face-api.js](https://github.com/justadudewhohacks/face-api.js).
It draws boxes around faces found in your webcam feed. A small Express server hosts the page and models.

## Run it

```bash
npm install
node src/app.js
```

Open http://localhost:3000 and allow camera access.

## Project layout

- `src/app.js`: Express server that serves `public/`.
- `public/index.html`, `public/js/`: the page and detection script.
- `public/models/`: pre-trained face-api.js model weights.

See also [AI-FaceRecognition](https://github.com/SriharshaShesham/AI-FaceRecognition), which builds on this to
recognize specific people and track attendance.
