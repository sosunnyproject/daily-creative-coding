let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}
let hand3d = new p5.Vector()
var noHands = false
var fingersData
var currFingers = 0
var prevFingers = 0

controller.loop(function(frame) {
  if(frame.hands.length == 0) {
    noHands = true
  } else {
    noHands = false

    frame.hands.forEach(function(handData, ind) {
      // console.log("original coord", handData.screenPosition())
      let x = map(handData.screenPosition()[0], -700, 1400, 0, width)
      let y = map(-handData.screenPosition()[1], 0, 1000, height , 0)
      let z = map(handData.screenPosition()[2], -400, 800, -width, width)

      prevFingers = currFingers
      var fingersNum = 0
      handData?.fingers?.forEach(finger => finger.extended && fingersNum++ )
      if(prevFingers !== fingersNum) {
        currFingers = fingersNum
        console.log(currFingers)
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


// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let sliderX, sliderY, sliderZ;
let x, y, z;
let c1, c2;
let reachedEdge = false;
let font;

function preload() {
  font = loadFont('./BMEuljiro.ttf')
}
function setup() {
  createCanvas(windowHeight, windowHeight, WEBGL);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  background(20);

  // the slider make move the light from behind (1) to front (1);
  //  sliderX = createSlider(-10, 10, 1);
  //  sliderY = createSlider(-10, 10, 1);
  //  sliderZ = createSlider(-10, 10, 1);
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);
  
}

function draw() {
  orbitControl();
  background(0)
  // reachedEdge ? drawDownGradient() : drawUpGradient()

  // test 2d
  ellipse(30, 30, 30, 0)

  // x = map(sliderX.value(), -10, 10, -0.1, 0.1)
  // y = map(sliderY.value(), -10, 10, -0.1, 0.1)
  // z = map(sliderZ.value(), -10, 10, -0.1, 0.1)
  x = map(hand3d.x, 0, width, -1.0, 1.0)
  y = map(hand3d.y, height, 0, -1.0, 1.0)
  z = map(hand3d.z, -width, width, -1.0, 1.0)
  
  counter++;
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colSin = 154 + sin(frameCount/200)*100
  let colCos = 135 + cos(frameCount/200)*100
  // let colTan = 57 + tan(frameCount*0.04)/100
  let colArray = [ color(colSin, 102, 255-colSin),  color(colCos,107,255-colCos)] // 0, 57, 135

  // if(currFingers === 0) {
  //   colArray = [ color(0, 102, 255-colSin),  color(200,57,5)]
  // }
  for(i=0;i<colArray.length;i++){
    lightPosx = tan(((TWO_PI/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx * x * 25,
      lightPosy * y * 30, 
      z*30);
  }

  stroke(0)
  strokeWeight(sin(frameCount/100)-0.3)
  if(noHands) {
    fill(255)
    textFont(font)
    textSize(100)
    text('의식에 방에 온 것을 환영합니다.', -width/2, 0)
    push()
    specularMaterial(250);
    rotateX(frameCount * 0.01)
    rotateY(frameCount * 0.005)
    rotateZ(frameCount * 0.07)
    translate(0, 0, -300)
    sphere(200)
    pop()
  } else {
    yesHands()
  }
}

function yesHands() {
  noStroke()
  var size = 100 + sin(frameCount*0.005)*50
  let detailX = 24
  let detailY = 16
  switch(currFingers) {
    case 0: 
      detailX = 24;
      break;
    case 1:
      detailX = 3
      detailY = 3
      break;
    case 2:
      detailX = 4
      detailY = 4
      break;
    case 3: 
      detailX = 5
      detailY = 8
      break;
    case 4:
      detailX = 6
      detailY = 10
      break;
    default:
      detailX = 24
  }
  specularMaterial(250);
  // normalMaterial()
  push()
  //frameCount * 0.005
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.005)
  rotateZ(frameCount * 0.007)
  torus(width/4, size, detailX, detailY)
  pop()
}