let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}
let hand3d = new p5.Vector()
var noHands = false
var fingersData
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
      // console.log(handData.screenPosition()[0])
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
          console.log(swipeDirection)
       }
     }
  }
  }
}).use('screenPosition', { scale: 1 });   


let font1;
let rightImg, rightYellowImg, enterBtnImg, leap1, leap2, numFingersImg;
let handsMerge = false;
let introGraphics;
let enterHover = 0; // false
let enterX, enterY;
const enterBtnSize = 500

function preload() {
  font1 = loadFont('fonts/Sam3KRFont.ttf');
  rightImg = loadImage('images/right.png');
  rightYellowImg = loadImage('images/rightHandYellow.png');
  enterBtnImg = loadImage('images/enterButton.png');

  leap1 = loadImage('images/leapmotion1.png');
  leap2 = loadImage('images/leapmotion2.png');
  numFingersImg = loadImage('images/numFingers.png');
}
function setup() {
  // scene 0
  createCanvas(windowWidth, windowHeight, WEBGL);
  pg = createGraphics(windowWidth, windowHeight);
  rightYellowImg.resize(200, 200)
  rightImg.resize(200, 200)
  leap1.resize(500, 500)
  leap2.resize(500, 500)
  numFingersImg.resize(400, 80)
  enterBtnImg.resize(enterBtnSize, enterBtnSize)
  enterX = width/2 + 300, enterY = 140;

  leftHand = new p5.Vector(50,  50)
  rightHand = new p5.Vector(50, 50)
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  // background(20);
}

function draw() {
  switch(sceneNum.textContent) {
    case '0':
      clear();
      renderIntro();
      pressEnter();
      image(rightYellowImg, rightHand.x, rightHand.y)
      break;
    case '1':
      clear();
      renderButterflies();
      rightImg.resize(50, 50);
      image(rightImg, rightHand.x, rightHand.y)

      break;
    case '2':
      clear();
      renderDonuts();
      rightImg.resize(50, 50);
      image(rightImg, rightHand.x, rightHand.y)

      break;
  }
}

function pressEnter() {
  // pressing enter
  if(rightHand.x + width/2 >= enterX && rightHand.x + width/2 <= enterX + enterBtnSize) {
    if(rightHand.y + height/2 >= enterY && rightHand.y + height/2 <= enterY + enterBtnSize) {
      enterHover++;
      if(enterHover > 150) {
        document.querySelector('#scene').textContent = 1
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
  pg.text('기계는 직접 만지지 마시고, 손이 잘 인식되는지 확인해주세요. Please do not touch the device, but check your hands on the screen.', 50, height-300, width-100, 200)
  pg.image(leap1, 20, 120)
  pg.image(leap2, width/3, 120)
  pg.image(enterBtnImg, enterX, enterY)

  image(pg, -width/2, -height/2)
}

// scene 1
// 나는 하나이자 여럿입니다.
let psArray = [] // 생성할 파티클s
const numParticles = 30
let isRock = 0;

function renderButterflies() {
  frameRate(20);
  background(0);
  
  textSize(50);
  textFont(font1);
  text('나는 하나이자 여럿입니다. I am alone and together', -width/2+50, -height/2+20, width, 400);

  for (let i = 0; i < psArray.length; i++){
    psArray[i].addParticle();
    psArray[i].run();
  }

  if(frameCount%5==0) {
    if(psArray.length > 0) {
      psArray.shift() // remove first ele
    }
  }
  // 주먹 쥐면 ps 생성. 손은 있지만 손가락은 0
  if(!noHands && !currFingers) {
    console.log('here')
    isRock++;
    if(isRock < 20) {
      psArray.push(new ButterflyPS(rightHand.x + width/2, rightHand.y + height/2))
    }
  } else if (currFingers) {
    isRock = 0;
  }
}

// scene 2
// 나는 당신의 과거이고 미래입니다.

// scene 3
// 나는 당신의 쌍둥이이자 모순입니다.

// scene 4
// 조금 천천히 숨쉰다면, 내가 느껴질지도...

// scene 5
// 나의 형태는 당신의 손가락에 달렸습니다.
let detailX = 24
let detailY = 16

function renderDonuts(){
  background(0);
  orbitControl();
  noStroke();

  textSize(50);
  textFont(font1);
  text('나의 형태는 당신의 손가락에 달려있습니다.', -width/2+50, -height/2+20, width, 400);
  text('My shape depends on your fingers. ', -width/2+50, -height/2+80, width, 400);
  image(numFingersImg, width/2-500, -height/2+10)

  x = map(hand3d.x, 0, width, -1.0, 1.0)
  y = map(hand3d.y, height, 0, -1.0, 1.0)
  z = map(hand3d.z, -width, width, -1.0, 1.0)
  
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colSin = 154 + sin(frameCount/200)*100
  let colCos = 135 + cos(frameCount/200)*100
  let colArray = [ color(colSin, 102, 255-colSin),  color(colCos,107,255-colCos)] // 0, 57, 135
  const size = 50 + sin(frameCount*0.005)*50

  for(i=0;i<colArray.length;i++){
    lightPosx = tan(((TWO_PI/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx * x * 25,
      lightPosy * y * 30, 
      z*30);
  }

  
  sphere(width/12)
  specularMaterial(250);

  // normalMaterial()
  push()
  //frameCount * 0.005
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.005)
  rotateZ(frameCount * 0.007)
  if(!noHands) {
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
    default:
      detailX = 24
  }

}

// scene 7
// 이제 내가 보이나요?
// frameCount = 3000
// fadeout 
// back to scene 1