// bezier pattern with webcam
// let pointS, anchorS, anchorE, point;
let points = []
let anchors = []
let t;
let capture, c;
let xoff = 0.1
// let stepSize = 30;

function setup() {
  c = createCanvas(800, 800);
  setPoints()
  // capture = createCapture(VIDEO);
  // capture.size(320, 240)

  let constraints = {
    video: {
      mandatory: {
        minWidth: 720,
        minHeight: 480
      },
      optional: [{ maxFrameRate: 10 }]
    },
  };
  capture = createCapture(constraints, function(stream) {
    console.log(stream);
  });
  capture.hide()
}

function setPoints(x, y, off) {
      let pointS = { x: x, y: y}
      let pointE = {
        x: pointS.x +  random(-25, 25),
        y: pointS.y +  sin(off)*25
      }
      // points.push(pointS)
      // points.push(pointE)

      let anchorS = {
        x: pointS.x + random(-25, 25), //(off)*25,
        y: pointS.y + random(-50, 100),
      }
      let anchorE = {
        x: pointE.x + sin(off)*25,
        y: pointE.y + sin(off)*100,
      }
      // anchors.push(anchorS)
      // anchors.push(anchorE)
  let vertices = [pointS, anchorS, anchorE, pointE]
  // console.log(vertices)

  return vertices
}

function draw() {
  t = frameCount / 100.0
  background(255)
  
  noFill()
  
  capture.loadPixels()
  const stepSize = round(constrain(width / 8, 12, 32));
  // const stepSize = 30;
  for (let y = 50; y < height; y += stepSize) {
    for (let x = 50; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - capture.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      if(darkness < 0.5 ) {
        xoff += 0.001
        let v = setPoints(x, y, xoff)

        strokeWeight(5+sin(t)*3)
        drawBezier(v[0], v[1], v[2], v[3])
        // ellipse(x, y, radius, radius);
      }
    }
  }

}

function drawBezier(pointS, anchorS, anchorE, pointE) {
  bezier(pointS.x, pointS.y,
    anchorS.x, anchorS.y,
    anchorE.x, anchorE.y,
    pointE.x, pointE.y)
}

function mouseClicked() {
  console.log(mouseX, mouseY)

}

function keyPressed() {
  saveCanvas(c, 'bezierCam', 'png');
}