// random bezier curves on x, y plane

let points = []
let anchors = []
let t;
let stepSize = 20;

function setup() {
  createCanvas(500, 500);
  setPoints()
}

function setPoints() {
  
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
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
  }
}

function draw() {
  t = frameCount / 100.0
  background(0)
  colorMode(HSB)
  
  noFill()
  stroke(sin(t)*300, 40, 80)

  for (let i = 0; i < points.length; i += 2) {
    strokeWeight(random(5))
    drawBezier(points[i], anchors[i], anchors[i + 1], points[i + 1])    
  }
  
  if((frameCount % 100) === 0 ) {
    background(0)
    points = []
    anchors = []
    setPoints()
    redraw()
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