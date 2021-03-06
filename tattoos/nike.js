let points = []
let mousePress = false
let hideLines = false
let blackhistoryWomenBdays = [ 
  {x: '3', y: '10'},  // Harriet Tubman
  {x: '4', y: '4'}, // maya angelou
  {x: '9', y: '26'}, //serena williams
  {x: '8', y: '26'}, // catherine johnson
  {x: '1', y: '26'}, // bessie coleman
  {x: '9', y: '20'}, // dorothy vaughan
]
let anchor1 = {
  x: 160+120,
  y: 176
}
let control1 = {
  x: 110+100,
  y: 300
}
let control2 = {
  x: 285+100,
  y: 261
}
let anchor2 = {
  x: 570+100,
  y: 226
}

let b_anchor1 = {
  x: anchor1.x,
  y: anchor1.y
}
let b_control1 = {
  x: 48+100,
  y: 299
}
let b_control2 = {
  x: 76+100,
  y: 379
}
let b_anchor2 = {
  x: anchor2.x,
  y: anchor2.y
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Benne')
}
// bezier(x1, y1, x2, y2, x3, y3, x4, y4)
// anchor1, control1, control2, anchor2
function draw() {
  background(255);
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
  // changePointCoords()
  // stroke(`hsl(${frameCount%360}, 90%, 80%)`);
  // fill(255)
  noFill()
  stroke(0)
  strokeWeight(4)
  drawBezierCurves()

  // stroke(255, 102, 0);
  noFill()
  textSize(150)
  strokeWeight(0.5)
  drawPoints()
}
function changePointCoords(){
  anchor1.x += sin(frameCount / 20) * 10
  anchor1.y += sin(frameCount / 20) * 10
  control1.x += cos(frameCount / 50) * width/10
  control1.y += sin(frameCount / 50) * height/10  
  control2.x += cos(frameCount / 50) * width/10
  control2.y += sin(frameCount / 50) * height/10  
  b_control2.x += cos(frameCount / 100) * width/10
  b_control2.y += cos(frameCount / 10) * height/10
  b_control1.x += cos(frameCount / 50) * width/30
  b_control1.y += sin(frameCount / 50) * height/30
  
}

function drawPoints() {
  if (!hideLines) {
    // line(anchor1.x, anchor1.y, control1.x, control1.y)
    // line(control2.x, control2.y, anchor2.x, anchor2.y)
    for (let i = 0; i < points.length; i++) {
      noFill()
      ellipse(points[i].x, points[i].y, 10)
      fill(0)

      text(`${blackhistoryWomenBdays[i].x}, ${blackhistoryWomenBdays[i].y}`, 
           points[i].x, 
           points[i].y)
    }
  }
}

function drawBezierCurves() {
  beginShape()
  vertex(anchor1.x , //+ sin(frameCount / 50) * width/4,
    anchor1.y //+ sin(frameCount / 50) * height/4
      )
  bezierVertex(
    control1.x,
    control1.y,
    control2.x,
    control2.y,
    anchor2.x, // + cos(frameCount / 50) * width,
    anchor2.y //+ cos(frameCount / 50) * height
  )
  bezierVertex(
    b_control2.x, b_control2.y,
    b_control1.x, b_control1.y,
    anchor1.x , //+ sin(frameCount / 50) * width,
    anchor1.y //+ sin(frameCount / 50) * height
  )
  endShape()
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
  if (keyCode === 83) {
    saveCanvas('nike', 'png')
  }
}