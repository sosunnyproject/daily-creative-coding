// create bezier curves on mouseClicked coordinates

// bezier pattern with webcam
// let pointS, anchorS, anchorE, point;
let points = []
let anchors = []
let t, c;

function setup() {
  c = createCanvas(400, 400);
  
}

function setPoints(x, y) {
      let pointS = { x: x, y: y}
      let pointE = {
        x: pointS.x + random(-25, 25),
        y: pointS.y + random(-25, 25)
      }
      points.push(pointS)
      points.push(pointE)

      let anchorS = {
        x: pointS.x + random(25, 50),
        y: pointS.y + random(-100, 100),
      }
      let anchorE = {
        x: pointE.x + random(-25, -50),
        y: pointE.y + random(-100, 100),
      }
      anchors.push(anchorS)
      anchors.push(anchorE)
}

function draw() {
  t = frameCount / 100.0
  background(255)
  
  noFill()
  stroke(0)
  // stroke(sin(t)*300, 40, 80)
  strokeWeight(2)
  for (let i = 0; i < points.length; i += 2) {
    drawBezier(points[i], anchors[i], anchors[i + 1], points[i + 1])    
  }
}

function drawBezier(pointS, anchorS, anchorE, pointE) {
  bezier(pointS.x, pointS.y,
    anchorS.x, anchorS.y,
    anchorE.x, anchorE.y,
    pointE.x, pointE.y)
}

function mouseClicked() {
  setPoints(mouseX, mouseY)
}

function keyPressed() {
  saveCanvas(c, 'bezierPattern', 'png');
}