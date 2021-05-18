let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}
let hand3d = new p5.Vector()
var noHands = true
var currFingers = 0
var prevFingers = 0

let sceneNum = document.querySelector('#scene');
// sceneNum.addEventListener('DOMSubtreeModified', checkScene)

controller.loop(function(frame) {
  if(frame.hands.length == 0) {
    noHands = true
  } else {
    noHands = false

    frame.hands.forEach(function(handData, ind) {
      // console.log("original coord", handData.screenPosition())
      let x = map(handData.screenPosition()[0], 0, 2000, -width/2, width/2)
      let y = map(-handData.screenPosition()[1], -500, 1000, height/2 , -height/2)
      let z = map(handData.screenPosition()[2], -400, 800, -width/2, width/2)
  
      // let x = map(handData.screenPosition()[0], -700, 1400, 0, width)
      // let y = map(-handData.screenPosition()[1], 0, 1000, height , 0)
      // let z = map(handData.screenPosition()[2], -400, 800, -width, width)

      prevFingers = currFingers
      var fingersNum = 0
      handData?.fingers?.forEach(finger => finger.extended && fingersNum++ )
      if(prevFingers !== fingersNum) {
        currFingers = fingersNum
        // console.log(currFingers)
      }

      if(handData.type === "left") {
        leftHand.set(x, y)
        handRad.left = -handData.roll()
      } else {
        rightHand.set(x, y)
        handRad.right = -handData.roll()
      }
      hand3d.set(x, y, z)
  })
 
  // swipe
  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      if(gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
              } else {
                  swipeDirection = "left";
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
              } else {
                  swipeDirection = "down";
              }                  
          }
          // console.log(swipeDirection)
       }
     }
  }
  }
}).use('screenPosition', { scale: 1 });   


let font1;
let rightImg, leftImg, rightYellowImg, enterBtnImg, nextBtnImg, leap1, leap2, numFingersImg;
let handsMerge = false;
let introGraphics;
let enterHover = 0; // false
let enterX, enterY;
const enterBtnSize = 500
let balls = []

function preload() {
  font1 = loadFont('fonts/Sam3KRFont.ttf');
  rightImg = loadImage('images/right.png');
  leftImg = loadImage('images/left.png');
  rightYellowImg = loadImage('images/rightHandYellow.png');
  enterBtnImg = loadImage('images/enterButton.png');
  nextBtnImg = loadImage('images/nextBtn.png');

  leap1 = loadImage('images/leapmotion1.png');
  leap2 = loadImage('images/leapmotion2.png');
  numFingersImg = loadImage('images/numFingers.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(windowWidth, windowHeight);
  rightYellowImg.resize(200, 200)
  rightImg.resize(100, 100)
  leftImg.resize(200, 200)
  leap1.resize(500, 500)
  leap2.resize(500, 500)
  nextBtnImg.resize(100, 100);
  numFingersImg.resize(400, 80)
  enterBtnImg.resize(enterBtnSize, enterBtnSize)
  enterX = width/2 + 300, enterY = 140;

  // leftHand = new p5.Vector(50,  50)
  // rightHand = new p5.Vector(50, 50)
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);

  for(let i = 0; i < 40; i++) {
    let b = new Ball();
    balls.push(b);
  }
}

let beginTime = 0;
let isTimeOver = false;
let seconds = 0;
function draw() {
  switch(sceneNum.textContent) {
    case '0':
      clear();
      renderIntro();
      pressNext(enterX, enterY, enterBtnSize, 1, width/2, height/2);
      image(rightYellowImg, rightHand.x, rightHand.y)
      break;
    case '1':
      clear();
      renderWaterdrop();
      image(rightImg, rightHand.x, rightHand.y);
      checkTime(500, 2);
      pressNext(width/2 - 350, height/2 - 250, 200, 2, 0, 0)
      break;
    case '2':
      clear();
      renderWaterdrop();
      image(rightImg, rightHand.x, rightHand.y);
      checkTime(500, 2);
      pressNext(width/2 - 350, height/2 - 250, 200, 3, 0, 0)
      break;
    case '3':
      clear();
      renderDonut();
      image(rightImg, rightHand.x, rightHand.y);
      checkTime(500, 3);
      pressNext(width/2 - 350, height/2 - 250, 200, 4, 0, 0)
      break;
    case '4':
      clear();
      renderShapes();
      image(rightImg, rightHand.x, rightHand.y);
      pressNext(width/2 - 350, height/2 - 250, 200, 5, 0, 0);
      checkTime(500, 4);
      break;
    case '5':
      clear();
      renderBounce();
      checkTime(200, 0);
      break;
  }
}

function checkTime(rate, nextNum){
  if(frameCount % rate === 0) {
    seconds++;
  } 
  if(seconds >= 20) {
    console.log('next scene')
    isTimeOver = true;
    seconds = 0;
    nextScene(nextNum)
  }
}

function mouseClicked(){
  let currScene = Number(sceneNum.textContent) + 1;
  if(currScene === 6) {
    currScene = 0;
  }
  nextScene(currScene)
}
function nextScene(nextNum) {
  document.querySelector('#scene').textContent = nextNum
}

function pressNext(btnX, btnY, btnSize, nextNum, offsetX, offsetY) {
  // pressing enter
  if(rightHand.x + offsetX >= btnX && rightHand.x + offsetX <= btnX + btnSize) {
    if(rightHand.y + offsetY >= btnY && rightHand.y + offsetY <= btnY + btnSize) {
      enterHover++;
      if(enterHover > 100) {
        nextScene(nextNum)
        enterHover = 0;
      }
    }
  }
}

// scene 0
function renderIntro() {
  pg.background(0);
  pg.fill(255)
  pg.textFont(font1)
  pg.textSize(50)
  pg.text('의식의 방에 온 것을 환영합니다.', 50, 20, width, 400)
  pg.text('Welcome to the Room of Cognition', 50, 80, width, 400)
  pg.text('센서를 직접 만지지 마시고, 손이 잘 인식되는지 확인해주세요.', 50, height-300, width-100, 200)
  pg.text('Please do not touch the device, but check your hands on the screen.', 50, height-200, width-100, 200)

  pg.image(leap1, 20, 120)
  pg.image(leap2, width/3, 120)
  pg.image(enterBtnImg, enterX, enterY)

  image(pg, -width/2, -height/2)
}

// scene 1
// 나는 하나이자 여럿입니다.

// scene 2
// 나는 심연이자 바람입니다.
let psArray = [] // 생성할 파티클s
const numParticles = 30
let isRock = 0;

function renderWaterdrop() {
  background(0);
  specularMaterial(255);
  shininess(5);

  let colArray = [color(254, 102, 0),  color(0,107,255), color(70, 73, 224)]
  // color(237, 188, 50),  color(59, 247, 52), 
  for(i=0;i<colArray.length;i++){
    lightPosx = sin(((TWO_PI/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx * cos(frameCount/30) * 25,
      lightPosy * sin(frameCount/50) * 30, 
      sin(frameCount/100) * 30);
  }

  textSize(50);
  textFont(font1);
  text('나는 심연이자 바람입니다. I am an abyss and a wind.', -width/2+50, height/2-250, width, 400);
  text('손을 접었다 펴보세요', -width/2+50, height/2-150, width, 400);
  text('NEXT', width/2 - 300, height/2 - 100)
  for (let i = 0; i < psArray.length; i++){
    psArray[i].addParticle();
    psArray[i].run();
  }

  if(frameCount%50==0) {
    if(psArray.length > 0) {
      psArray.shift() // remove first ele
    }
  }
  // 주먹 쥐면 ps 생성. 손은 있지만 손가락은 0
  if(!noHands && !currFingers) {
    isRock++;
    if(isRock < 5) {
      psArray.push(new ParticleSystem(rightHand.x + width/2, rightHand.y + height/2))
    }
  } else if (currFingers) {
    isRock = 0;
  }
}

// scene 2
// 나는 당신의 쌍둥이이자 모순입니다.

// scene 3
// 조금 천천히 숨쉰다면, 내가 느껴질지도...
function renderDonut() {
  renderLights();
  specularMaterial(250);
  noStroke();
  shininess(1);

  textSize(40);
  textFont(font1);
  text('조금 천천히 숨쉰다면 내가 보일지도...', -width/2+50, -height/2+10, width, 400);
  text('Breathe slower and you may find me.', -width/2+50, -height/2+60, width, 400);
  textSize(50);
  text('x, y, z 모든 방향으로 손을 움직여보세요.', -width/2+60, height/2-100, width, 400);
  text('NEXT', width/2 - 300, height/2 - 100)

  const size = 150 + sin(frameCount*0.005)*50
  const detailX = 6 + Math.floor(sin(frameCount/50)*2)
  const detailY = 8 + Math.floor(sin(frameCount/100)*2)
  push()
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.005)
  rotateZ(frameCount * 0.005)
  torus(width/10, size, 24, 16)
  pop()
}

// scene 4
// 나의 형태는 당신의 손가락에 달렸습니다.
let detailX = 24
let detailY = 16

function renderLights() {
  background(0);
  orbitControl();

  x = map(hand3d.x, 0, width, -1.0, 1.0)
  y = map(hand3d.y, height, 0, -1.0, 1.0)
  z = map(hand3d.z, -width, width, -1.0, 1.0)
  
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colSin = 154 + sin(frameCount/200)*100
  let colCos = 135 + cos(frameCount/200)*100
  let colArray = [ color(colSin, 102, 255-colSin),  color(colCos,107,255-colCos)] // 0, 57, 135

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
  shininess(3);

  textSize(50);
  textFont(font1);
  text('나의 형태는 당신의 손가락에 달려있습니다.', -width/2+50, -height/2+20, width, 400);
  text('My shape depends on your fingers. ', -width/2+50, -height/2+80, width, 400);
  text('5, 4, 3, 2, 1, 0...', -width/2+50, -height/2+140, width, 400);

  text('NEXT', width/2 - 300, height/2 - 100);
  image(numFingersImg, -width/2+50, -height/2+200)
  const size = 50 + sin(frameCount*0.005)*50

  sphere(width/12)
  specularMaterial(250);

  push()
  //frameCount * 0.005
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.005)
  rotateZ(frameCount * 0.007)
  if(!noHands && currFingers) {
    donutFingers()
    torus(width/6, size, detailX, detailY)
  }
  pop()
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


function renderBounce() {
  textSize(40);
  textFont(font1);
  fill(255)
  text('이제 내가 보이나요?', 0, 0, width, 400);
  text('Do you see me now?', 0, 200, width, 400);

  let locX = rightHand.x ;
  let locY = rightHand.y ;
  ambientLight(1, 1, 1);
  pointLight(59, 147, 52, locX, locY, 50);
  // pointLight(70, 73, 224, locX - 100, locY - 100, -50);
  pointLight(254, 102, 0, locX + 100, locY + 100, -250);

  // 237, 188, 50),  color(59, 247, 52), 
  //color(254, 102, 0),  color(0,107,255), color(70, 73, 224)
  specularMaterial(255);
  shininess(20);
  for(let i = 0; i < balls.length; i++){
    push();
    translate(balls[i].loc.x, balls[i].loc.y, balls[i].loc.z);
    balls[i].display();
    balls[i].update();
    balls[i].bound();
    pop();
  }
}


/*
// scene 7
// 이제 내가 보이나요?
// frameCount = 3000
// fadeout 
// back to scene 1

const pointS = {
  x: -300,  //+ random(150),
  y: -100, // + random(200),
  z: 10
}
const pointE = {
  x: 200  ,//+ random(100),
  y: -50 ,//+ random(-150, 150),
  z: 10
}
const anchorS = {
  x: 10,
  y: -200,
  z: 200
}
const anchorE = {
  x: 200 ,//+ random(-50, 50),
  y: 0 ,// + random(-125, 125),
  z: 0
}
const newPointS = { x: pointS.x-10, y: pointS.y - 10, z: pointS.z }
const newPointE = { x: pointE.x , y: pointE.y - 40, z: pointE.z}
const newAnchorS = {x: anchorS.x-100, y: anchorS.y + 400, z: anchorS.z  }
const newAnchorE = {x: anchorE.x, y: anchorE.y + 200, z: anchorE.z  }

function lastScene() {
  background(0);
  textSize(40);
  textFont(font1);
  fill(255)
  text('이제 내가 보이나요?', 0, 0, width, 400);
  text('Do you see me now?', 0, 200, width, 400);

  const t = frameCount / 150.0
  orbitControl();
  push()
  camera(50 + rightHand.x/100 * 250, 50+sin(t) * 150, 10 + sin(t) * 200, 0, 0, 0, 0, 1, 0);
  stroke(255)
  noFill()
  // bezierDetail(50)

  push()
  rotateX(t)
  rotateZ(t*sin(t))
  rotateY(t*tan(t))
  strokeWeight(0.3)
  drawBezier(pointS, anchorS, anchorE, pointE)    
  drawBezier(newPointS, newAnchorS, newAnchorE, newPointE)    
  pop()

  push()
  rotateX(t)
  // rotateY(t / 5)
  rotateZ(t)
  // stroke(sin(millis()/1000) * 200)
  strokeWeight(0.25)
  torus(60, 20, 24, 16)
  pop()

  pop()
}

function drawBezier(pointS, anchorS, anchorE, pointE) {
  bezier(pointS.x, pointS.y, pointS.z,
    anchorS.x, anchorS.y, anchorS.z,
    anchorE.x, anchorE.y, anchorE.z,
    pointE.x, pointE.y, pointE.z)
}
*/