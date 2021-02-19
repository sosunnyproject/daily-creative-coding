let points = []
let mousePress = false
let hideLines = false


let anchor1 = {
  x: 179,
  y: 166 
}
let control1 = {
  x: 110, 
  y: 300
}
let control2 = {
  x: 221,
  y: 278
}
let anchor2 = {
  x: 570, 
  y: 191
}

let b_anchor1 = {
 x: anchor1.x,
  y: anchor1.y
}
let b_control1 = {
  x: 42, 
  y: 316
}
let b_control2 = {
  x: 79,
  y: 421
}
let b_anchor2 = {
 x: anchor2.x,
  y: anchor2.y
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  points = []
  
  let f = frameCount/10
  // if mouse click and drag, change coord
  if(mousePress) {
    if(checkRange(anchor1)) {
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
  
  stroke(255)
  noStroke()
  strokeWeight(2)
  noFill()
  fill(0)
  drawBezierCurves()
  
  drawPoints() 
}
function mouseReleased(){
  // save last mouse position as point's
  // new coordinate
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
}
function drawPoints() {
  if (!hideLines) {
    for (let i = 0; i < points.length; i++) {
      noFill()
      noStroke()
      fill(255, 100, 0)
      ellipse(points[i].x, points[i].y, 30)
    }
  }
}

function checkRange(point){
  if (
    (point.x - 40 < mouseX) &&
    (mouseX < point.x + 30) &&
    (point.y - 40 < mouseY) &&
    (mouseY < point.y + 30)) {
    return true
  }
  return false
}

function mousePressed(){
  console.log(mouseX, mouseY)
  mousePress=true
}

function keyPressed() {
  if(keyCode === 32) {
    hideLines = !hideLines
  }
}

function drawBezierCurves() {
  beginShape()
  vertex(anchor1.x, anchor1.y)
  bezierVertex(control1.x, control1.y,
              control2.x, control2.y,
              anchor2.x, anchor2.y)
  bezierVertex(b_control2.x, b_control2.y,
              b_control1.x, b_control1.y,
              anchor1.x, anchor1.y)
  endShape()
}