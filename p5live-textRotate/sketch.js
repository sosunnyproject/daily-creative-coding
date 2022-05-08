// let pointS, anchorS, anchorE, point;
let points = []
let anchors = []
let t;
let off = 0.001
let camSlider;
let speedSlider;
let distanceSlider;
let inputBox, inputBox2, textInput = 'one', textInput2 = 'two'

function preload() {
  fontRegular = loadFont('assets/Recursive.ttf');
}

function setup() {
  createCanvas(400, 400, WEBGL);
  camSlider = createSlider(0, 10, 5, 1)
  speedSlider = createSlider(200, 800, 300, 10)
  distanceSlider = createSlider(0, 100, 1)
  colorMode(HSB)
  textFont(fontRegular)
  inputBox = createInput('one');
  inputBox.input(myInputEvent);
  inputBox2 = createInput('two');
  inputBox2.input(myInputEvent2);

}

function setPoints(off) {
  
}

function draw() {
  let speed = speedSlider.value()
  let dist = map(distanceSlider.value(), 0, 100, 0.1, 10)
  t = frameCount / speed
  background(0)
  orbitControl();

  let camVar = camSlider.value()
  camera(100 + camVar * 25, 50 + camVar * 150, 200 + camVar * 100, 0, 0, 0, 0, 1, 0);
  stroke(255)
  noFill()
  

  if (points.length > 80) {
    off = 0.001
    setPoints(off)
  }

  off += 0.05

  textSize(100);
  stroke(255)
  fill(255)
  bezierDetail(20)
  for (let i = 0; i < 30; i += 0.1) {
    strokeWeight(4)
    // rotateX(t)
    translate(0, 0, i)
    rotateX(sin(t) * 5)
    rotateZ(sin(t) * 10)
    
    push()
    text(textInput, 10, 20)
    pop()
  }
  
    translate(200, 200, 100)
    push()
    text(textInput2, 10, 20)
    pop()
}


function myInputEvent() {
  console.log('you are typing: ', this.value());
  textInput = this.value()
}
function myInputEvent2() {
  console.log('you are typing: ', this.value());
  textInput2 = this.value()
}
function mouseClicked() {
  console.log(mouseX, mouseY)

}