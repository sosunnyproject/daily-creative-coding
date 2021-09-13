// bezier pattern with webcam
// let pointS, anchorS, anchorE, point;
let points = []
let anchors = []
let t;
let capture, c;
let xoff = 0.1
// let stepSize = 30;

function setup() {
  c = createCanvas(800, 640);
  setPoints()
  // capture = createCapture(VIDEO);
  // capture.size(320, 240)

  let constraints = {
    video: {
      mandatory: {
        minWidth: 320,
        minHeight: 240
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
        y: pointS.y + random(-50, 50),
      }
      let anchorE = {
        x: pointE.x + sin(off)*25,
        y: pointE.y + sin(off)*10,
      }
      // anchors.push(anchorS)
      // anchors.push(anchorE)
  let vertices = [pointS, anchorS, anchorE, pointE]
  // console.log(vertices)

  return vertices
}

function draw() {
  t = frameCount / 200.0
  background(255)
  
  noFill()
  // image(capture, 0, 0, width, width * capture.height / capture.width);

  capture.loadPixels()
  const stepSize = round(constrain(width / 100, 12, 32));
  // const stepSize = 10;
  for (let y = 0; y < capture.height; y += stepSize) {
    for (let x = 0; x < capture.width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - capture.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      if(darkness > 0.7) {
        xoff += 0.001
        let v = setPoints(x, y, xoff)

        strokeWeight(2+sin(t)*1)
        // noFill()
        var index = i;
        var r = capture.pixels[index+0];
        var g = capture.pixels[index+1];
        var b = capture.pixels[index+2];
        noFill();
        stroke(r, g, b);
        drawBezier(v[0], v[1], v[2], v[3])
        // ellipse(x, y, radius, radius);

        // fill(r, g, b);
        // noStroke();
        // ellipse(x, y, radius);
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
  // saveCanvas(c, 'bezierCam', 'png');
}