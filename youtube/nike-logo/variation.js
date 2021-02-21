// https://editor.p5js.org/sosunnyproject/sketches/sHbVRpHbb
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
  createCanvas(600, 400);
  // colorMode(HSB)
}
// bezier(x1, y1, x2, y2, x3, y3, x4, y4)
// anchor1, control1, control2, anchor2
function draw() {
  background(0, 10);
  noFill()
  
  points = []
  let f = frameCount / 100
  let colorFrame = frameCount % 360
  if (mousePress) {
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
  points.push(control1)
  points.push(control2)
  points.push(anchor2)
  points.push(b_anchor1)
  points.push(b_control1)
  points.push(b_control2)
  points.push(b_anchor2)
  
  noFill()
  noStroke()
  stroke(`hsl(${colorFrame}, 100%, 80%)`)
  beginShape()
  vertex(anchor1.x + sin(f) * width, 
         anchor1.y + cos(f) * height)
  bezierVertex(
    control1.x + cos(f) * width,
    control1.y + cos(f*2) * mouseY,
    control2.x + sin(f) * width,
    control2.y - sin(f) * height,
    anchor2.x + tan(f*2) * width,
    anchor2.y - tan(f) * height)
  bezierVertex(
    b_control2.x + sin(f) * mouseX,
    b_control2.y - tan(f*2) * height,
    b_control1.x - cos(f) * width,
    b_control1.y + atan(f) * height,
    anchor1.x + tan(f) * mouseX,
    anchor1.y + tan(f) * height
  )
  endShape()
  
  stroke(255, 102, 0);
  strokeWeight(2)
  noFill()
  // if(!hideLines){
  //   line(anchor1.x, anchor1.y, control1.x, control1.y)
  //   line(control2.x, control2.y, anchor2.x, anchor2.y)
  //   for(let i = 0; i < points.length; i++) {
  //   ellipse(points[i].x, points[i].y, 10)
  //   }
  // }
  
  /*
  bezier(anchor1.x, anchor1.y,
    control1.x, control1.y,
    control2.x, control2.y,
    anchor2.x, anchor2.y);
  bezier(b_anchor1.x, b_anchor1.y,
    b_control1.x, b_control1.y,
    b_control2.x, b_control2.y,
    b_anchor2.x, b_anchor2.y);
  
  */
}

function mousePressed() {
  console.log(mouseX, mouseY)
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
    (point.x - 20 < mouseX) &&
    (mouseX < point.x + 20) &&
    (point.y - 20 < mouseY) &&
    (mouseY < point.y + 20)) {
    return true
  }
  return false
}

function keyPressed(){
  // if(keyCode === 32){
  //   hideLines = !hideLines
  // }
}