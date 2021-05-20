
const video = document.getElementById('videoInput')


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(start)

  function start() {
      document.body.append('Models Loaded')
      
      navigator.getUserMedia(
          { video:{} },
          stream => video.srcObject = stream,
          err => console.error(err)
      )
      
  }

video.addEventListener('play', () => {
  //create the canvas from video element as we have created above
  const canvas = faceapi.createCanvasFromMedia(video);
  //append canvas to body or the dom element where you want to append it
  document.body.append(canvas)
  // displaySize will help us to match the dimension with video screen and accordingly it will draw our detections
  // on the streaming video screen
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})