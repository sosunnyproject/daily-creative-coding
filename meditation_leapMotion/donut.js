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
  }
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

  if(noHands) {
    fill(255)
    textFont(font)
    textSize(100)
    text('한 손을 기계 위에서 위아래로 움직여보세요', -width/2, 0)
  }

  // x = map(sliderX.value(), -10, 10, -0.1, 0.1)
  // y = map(sliderY.value(), -10, 10, -0.1, 0.1)
  // z = map(sliderZ.value(), -10, 10, -0.1, 0.1)
  x = map(hand3d.x, 0, width, -1.0, 1.0)
  y = map(hand3d.y, height, 0, -1.0, 1.0)
  z = map(hand3d.z, -width, width, -1.0, 1.0)
  
  counter++;
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colSin = 154 + x*100
  // let colTan = 57 + tan(frameCount*0.04)/100
  let colArray = [ color(colSin, 102, 255-colSin),  color(0,57,135)] // 0, 57, 135

  for(i=0;i<colArray.length;i++){
    lightPosx = tan(((TWO_PI/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx * x * 5,
      lightPosy * y * 10, 
      z*10);
  }
  // console.log(lightPosx, lightPosy)

  var size = 100 + sin(frameCount*0.005)*50
  noStroke()
  specularMaterial(100);
  push()
  //frameCount * 0.005
  rotateX(frameCount * 0.007)
  rotateY(frameCount * 0.007)
  rotateZ(frameCount * 0.007)
  torus(width/4, size)
  pop()

}

function drawUpGradient(){

    for(let i = -height/2; i <= height/2; i++){ // 0 ~ height
      let inter = map(i, -height/2, height/2, 0, 1);
      let c = lerpColor(c2, c1, inter*(frameCount*0.005));
      stroke(c);
      line(-width/2, i, -width/2 + width, i);
      if(c._array[0] === 1) {
        console.log(c._array[0])
        reachedEdge = true
      }
    }
}

function drawDownGradient(){

    for(let i = height/2; i >= -height; i--){ // 0 ~ height
      let inter = map(i, height/2, -height/2, 0, 1);
      let c = lerpColor(c1, c2, inter*(frameCount*0.005));
      stroke(c);
      line(-width/2, i, -width/2 + width, i);
      if(c._array[0] === 0) {
        console.log(c._array[0])
      }
    }
}