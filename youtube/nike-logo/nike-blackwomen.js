// https://editor.p5js.org/sosunnyproject/sketches/kPNRwIF0V

let points = []
let mousePress = false
let hideLines = false
let sliderA, sliderB, aVal, bVal, f
let blackhistoryWomenBdays = [ 
  {x: '3', y: '10'}, // Harriet Tubman, activist
  {x: '7', y: '16'}, // Ida B. Wells, journalist
  {x: '1', y: '26'}, // Bessie Coleman, pilot
  {x: '9', y: '20'}, // Dorothy Vaughan, mathematician, Human Computer
  {x: '4', y: '4' }, // Maya Angelou, poet, author
  {x: '9', y: '26'}, // Serena Williams, tennis player
]
let anchor1 = {
  x: 160+200,
  y: 176+150
}
let control1 = {
  x: 110+200,
  y: 300+150
}
let control2 = {
  x: 285+200,
  y: 261+150
}
let anchor2 = {
  x: 570+200,
  y: 226+150
}

let b_anchor1 = {
  x: anchor1.x,
  y: anchor1.y
}
let b_control1 = {
  x: 48+200,
  y: 299+150
}
let b_control2 = {
  x: 76+200,
  y: 379+150
}
let b_anchor2 = {
  x: anchor2.x,
  y: anchor2.y
}

let blackFemaleFiguresImg = []
let imgOrder = 0
function preload(){
  let tennis = loadImage('serenaWilliams.jpg')
  let journalist =  loadImage('idabwells.jpg')
  let author = loadImage('mayaAngelou.jpg')
  let mathmatician = loadImage('dorothyVaughan.jpg')
  let pilot = loadImage('bessieColeman.jpg')
  let activist = loadImage('harrietTubman.jpeg')
  blackFemaleFiguresImg.push(tennis)
  blackFemaleFiguresImg.push(journalist)
  blackFemaleFiguresImg.push(author)
  blackFemaleFiguresImg.push(mathmatician)
  blackFemaleFiguresImg.push(pilot)
  blackFemaleFiguresImg.push(activist)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Benne')
  
  sliderA = createSlider(1, 40, 20)
  sliderB = createSlider(1, 20, 10)
}
// bezier(x1, y1, x2, y2, x3, y3, x4, y4)
// anchor1, control1, control2, anchor2
function draw() {
  
  renderPhotos()
  background(0,20);
  
  noFill()
  points = []
  aVal = sliderA.value()/10
  bVal = sliderB.value()/2
  
  f = frameCount / (10 * aVal)
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
  stroke(`hsl(${frameCount%360}, 90%, 80%)`);
  noFill()
  strokeWeight(2)
  drawBezierCurves()

  // stroke(255, 102, 0);
  noFill()
  textSize(100)
  strokeWeight(0.5)
  // drawPoints()
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
      noStroke()
      fill(255, 100, 0)
      ellipse(points[i].x, points[i].y, 30)
      
      // stroke(0)
      // text(`${blackhistoryWomenBdays[i].x}, ${blackhistoryWomenBdays[i].y}`, 
      //      points[i].x-30-5*i, 
      //      points[i].y+50+i*5)
    }
  }
}

function drawBezierCurves() {
  // bVal += random(10, 0.1)
  beginShape()
  vertex(anchor1.x - sin(f) * width/6,
    anchor1.y - cos(f) * height/6
      )
  bezierVertex(
    control1.x + cos(f)*width/bVal + 200,
    control1.y - tan(f)*height/bVal + 100,
    control2.x + sin(f)*width/6,
    control2.y - tan(f)*height/6 + 400,
    anchor2.x + sin(f) * width/bVal,
    anchor2.y - tan(f)* height/bVal+400
  )
  bezierVertex(
    b_control2.x  + noise(f) * width/bVal, 
    b_control2.y  - noise(f) * height/bVal,
    b_control1.x + cos(f) * width/bVal, 
    b_control1.y - cos(f) * height/bVal,
    anchor1.x + tan(f) * width/6 + random(width/2),
    anchor1.y - tan(f) * height/6 + random(height/2)
  )
  endShape()
}

function mousePressed() {
  // console.log(mouseX, mouseY)
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

function renderPhotos(){
  blackFemaleFiguresImg[imgOrder].resize(width, height)
  image(blackFemaleFiguresImg[imgOrder], 0, 0)
  
  if(frameCount%100===0){
    if(imgOrder < blackFemaleFiguresImg.length-1){
      imgOrder++
    } else {
      imgOrder = 0
    }
  }
}