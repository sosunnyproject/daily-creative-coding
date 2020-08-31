// create bezier curves on mouseClicked coordinates

// bezier pattern with webcam
// let pointS, anchorS, anchorE, point;
let points = []
let anchors = []
let t, c;
let colors = []

function setup() {
  c = createCanvas(500, 500);
  colorMode(HSB)
  for(let i=0; i<10000; i++){
    colors.push(random(360))
  }
}

function setPoints(x, y) {
      let pointS = { x: x, y: y}
      let pointE = {
        x: pointS.x + random(-20, 20),
        y: pointS.y + random(-20, 20)
      }
      points.push(pointS)
      points.push(pointE)

      let anchorS = {
        x: pointS.x + random(20, 20),
        y: pointS.y + random(-70, 70),
      }
      let anchorE = {
        x: pointE.x + random(-20, -20),
        y: pointE.y + random(-70, 70),
      }
      anchors.push(anchorS)
      anchors.push(anchorE)
}

function draw() {
  t = frameCount / 100.0
  background(255)
  
  noFill()
  // stroke(0)
  // stroke(sin(t)*300, 40, 80)
  strokeWeight(2)
  stroke(0)
  
  for (let i = 0; i < points.length; i += 2) {
    // stroke(colors[i], 100, 100)
    drawBezier(points[i], anchors[i], anchors[i + 1], points[i + 1])    
  }
}

function drawBezier(pointS, anchorS, anchorE, pointE) {
  bezier(pointS.x, pointS.y,
    anchorS.x, anchorS.y,
    anchorE.x, anchorE.y,
    pointE.x, pointE.y)
}

// function mouseClicked() {
//   setPoints(mouseX, mouseY)
// }

function mouseDragged() {
  setPoints(mouseX, mouseY)
}

function keyPressed() {
  saveCanvas(c, 'bezierPattern', 'png');
}