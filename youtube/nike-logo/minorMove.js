let points = []
let mousePress = false
let hideLines = false
let anchor1 = {
  x: 160,
  y: 176
}
let control1 = {
  x: 110,
  y: 300
}
let control2 = {
  x: 285,
  y: 261
}
let anchor2 = {
  x: 570,
  y: 226
}

let b_anchor1 = {
  x: anchor1.x,
  y: anchor1.y
}
let b_control1 = {
  x: 48,
  y: 299
}
let b_control2 = {
  x: 76,
  y: 379
}
let b_anchor2 = {
  x: anchor2.x,
  y: anchor2.y
}

function setup() {
  createCanvas(600, 600);
}
// bezier(x1, y1, x2, y2, x3, y3, x4, y4)
// anchor1, control1, control2, anchor2
function draw() {
  background(0, 20);
  noFill()
  points = []
  let f = frameCount / 10
  if (mousePress) {
    if (checkRange(anchor1)) {
      anchor1.x = mouseX
      anchor1.y = mouseY
    }
    if (checkRange(anchor2)) {
      anchor2.x = mouseX
      anchor2.y = mouseY
    }
    if (checkRange(control1)) {
      control1.x = mouseX
      control1.y = mouseY
    }
    if (checkRange(control2)) {
      control2.x = mouseX
      control2.y = mouseY
    }
    if (checkRange(b_control1)) {
      b_control1.x = mouseX
      b_control1.y = mouseY
    }
    if (checkRange(b_control2)) {
      b_control2.x = mouseX
      b_control2.y = mouseY
    }
  }
  points.push(anchor1)
  points.push(anchor2)
  points.push(control1)
  points.push(control2)
  points.push(b_control1)
  points.push(b_control2)

  changePointCoords()
 
  fill(`hsl(${frameCount%360}, 90%, 80%)`);
  // fill(255)
  noStroke()
  drawBezierCurves()

  stroke(255, 102, 0);
  strokeWeight(2)
  noFill()
  drawPoints()
}
function changePointCoords(){
  // anchor1.x += tan(frameCount / 50)
  // anchor1.y += tan(frameCount / 50)
  control1.x += sin(frameCount / 10)
  control1.y += sin(frameCount / 50)
  b_control2.x += sin(frameCount / 30)
  b_control2.y += cos(frameCount / 50)
  b_control1.x += cos(frameCount / 10)
  b_control1.y += sin(frameCount / 10)
  
}
function drawPoints() {
  if (!hideLines) {
    // line(anchor1.x, anchor1.y, control1.x, control1.y)
    // line(control2.x, control2.y, anchor2.x, anchor2.y)
    for (let i = 0; i < points.length; i++) {
      ellipse(points[i].x, points[i].y, 30)
    }
  }
}

function drawBezierCurves() {
  beginShape()
  vertex(anchor1.x + sin(frameCount / 50),
    anchor1.y + sin(frameCount / 50))
  bezierVertex(
    control1.x,
    control1.y,
    control2.x + sin(frameCount / 120),
    control2.y + sin(frameCount / 120),
    anchor2.x + cos(frameCount / 50),
    anchor2.y + cos(frameCount / 50))
  bezierVertex(
    b_control2.x, b_control2.y,
    b_control1.x, b_control1.y,
    anchor1.x + cos(frameCount / 50),
    anchor1.y + cos(frameCount / 50))
  endShape()
}

function mousePressed() {
  mousePress = true
}

function mouseReleased() {
  if (checkRange(anchor1)) {
    anchor1.x = mouseX
    anchor1.y = mouseY
  }
  if (checkRange(control1)) {
    control1.x = mouseX
    control1.y = mouseY
  }
  if (checkRange(control2)) {
    control2.x = mouseX
    control2.y = mouseY
  }
  if (checkRange(b_control2)) {
    b_control2.x = mouseX
    b_control2.y = mouseY
  }
  if (checkRange(b_control1)) {
    b_control1.x = mouseX
    b_control1.y = mouseY
  }

  mousePress = false
  return false
}

function checkRange(point) {
  if (
    (point.x - 30 < mouseX) &&
    (mouseX < point.x + 30) &&
    (point.y - 30 < mouseY) &&
    (mouseY < point.y + 30)) {
    return true
  }
  return false
}

function keyPressed() {
  if (keyCode === 32) {
    hideLines = !hideLines
  }
}