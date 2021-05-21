var controller = new Leap.Controller()
var currFingers = 6
var prevFingers = 0

let sceneNum = document.querySelector('#scene');
// sceneNum.addEventListener('DOMSubtreeModified', checkScene)

let font1;
let rightImg, leftImg, rightYellowImg, enterBtnImg, nextBtnImg, leap1, leap2, numFingersImg;
let introGraphics;
let enterHover = 0; // false
let enterX, enterY;
const enterBtnSize = 500
let balls = []
let repeller, repelBalls = []

function preload() {
  font1 = loadFont('fonts/Sam3KRFont.ttf');

}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // leftHand = new p5.Vector(50,  50)
  // rightHand = new p5.Vector(50, 50)
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);

  for(let i = 0; i < 40; i++) {
    let b = new Ball();
    balls.push(b);
  }
  for(let i = 0; i < 60; i++) {
    let b = new Ball(0, 0);
    repelBalls.push(b);
  }
}

let beginTime = 0;
let isTimeOver = false;
let seconds = 0;
function draw() {
  // renderDonut();
  renderShapes();
}

function mouseClicked(){
  console.log(currFingers);
  if(currFingers < 6) {
    currFingers++;
  } else {
    currFingers = 0;
  }
}


// scene 3
// 조금 천천히 숨쉰다면, 내가 느껴질지도...
function renderDonut() {
  renderLights();
  specularMaterial(250);
  noStroke();
  shininess(2);

  const size = 150 + sin(frameCount*0.005)*5
  const detailX = 6 + Math.floor(sin(frameCount/50)*2)
  const detailY = 8 + Math.floor(sin(frameCount/100)*2)
  push()
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.015)
  rotateZ(frameCount * 0.005)
  torus(width/6, size, 24, 16)
  pop()
}

// scene 4
// 나의 형태는 당신의 손가락에 달렸습니다.
let detailX = 24
let detailY = 16

function renderLights() {
  background(0);
  orbitControl();

  x = map(mouseX, -width/2, width, -1.0, 1.0)
  y = map(mouseY, -height/2, height, -1.0, 1.0)
  z = map(mouseX, -width/2, width, -1.0, 1.0)
  
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colSin = 154 + sin(frameCount/50)*100
  let colCos = 135 + cos(frameCount/50)*100
  let colArray = [ color(colSin, 67, 255-colCos),  color(255-colCos,87,15)] // 0, 57, 135

  for(i=0;i<colArray.length;i++){
    lightPosx = tan(((TWO_PI/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx * x * 25,
      lightPosy * y * 30, 
      z*30);
  }
  
}
function renderShapes(){
  renderLights();
  noStroke();
  shininess(1);

  const size = 50 + sin(frameCount/50)*50

  specularMaterial(200);

  if(currFingers < 6) {
    sphere(width/20)   
    push()
    //frameCount * 0.005
    rotateX(frameCount * 0.005)
    rotateY(frameCount * 0.005)
    rotateZ(frameCount * 0.007)
    donutFingers()
    torus(width/6, size, detailX, detailY)
    pop()

    push()
    translate(-width/2+ 200, 0)
    //frameCount * 0.005
    rotateX(frameCount * 0.005)
    rotateY(frameCount * 0.005)
    rotateZ(frameCount * 0.007)
    donutFingers()
    torus(width/6, size, detailX, detailY)
    pop()

    push()
    translate(width/2 - 200, 0)
    //frameCount * 0.005
    // rotateX(frameCount * 0.005)
    // rotateY(frameCount * 0.005)
    // rotateZ(frameCount * 0.007)
    donutFingers()
    torus(width/6, size, detailX, detailY)
    pop()
  }
  
  // waterdrop shape
  if(currFingers === 6) {
    push();
    translate(0, 0)
    rotateX(PI)
    // rotateY(cos(frameCount/150) * TWO_PI )
    rotateZ(sin(frameCount/20) * PI/2)
    // cone(30, 38, 10, 4, false);
    // translate(0, -40)
    // sphere(36, 10, 7)
    torus(200, 15, 24, 16)
    cone(30*2, 38*2, 24, 16, false);
    translate(0, -80)
    sphere(36*2, 24, 16)
    pop()

    push();
    translate(-width/2 + 200, 0)
    rotateX(PI)
    // rotateY(cos(frameCount/150) * TWO_PI )
    rotateZ(sin(frameCount/20) * PI/2)
    // cone(30, 38, 10, 4, false);
    // translate(0, -40)
    // sphere(36, 10, 7)
    torus(200, 15, 24, 16)
    cone(30*2, 38*2, 24, 16, false);
    translate(0, -80)
    sphere(36*2, 24, 16)
    pop()

    push();
    translate(width/2 - 200, 0)
    rotateX(PI)
    // rotateY(cos(frameCount/150) * TWO_PI )
    rotateZ(sin(frameCount/20) * PI/2)
    // cone(30, 38, 10, 4, false);
    // translate(0, -40)
    // sphere(36, 10, 7)
    torus(200, 15, 24, 16)
    cone(30*2, 38*2, 24, 16, false);
    translate(0, -80)
    sphere(36*2, 24, 16)
    pop()
  }
}

function donutFingers() {
  switch(currFingers) {
    case 0: 
      detailX = 24;
      detailY = 3;
      break;
    case 1:
      detailX = 3
      detailY = 3;
      break;
    case 2:
      detailX = 4
      detailY = 4
      break;
    case 3: 
      detailX = 5
      detailY = 4
      break;
    case 4:
      detailX = 6
      detailY = 14
      break;
    case 5:
      detailX = 24;
      detailY = 3;
  }
}

