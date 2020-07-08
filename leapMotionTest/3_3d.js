let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}
let hand3d = new p5.Vector()

controller.loop(function(frame) {
    frame.hands.forEach(function(handData, ind) {
  
      // console.log("original coord", handData.screenPosition())
      let x = map(handData.screenPosition()[0], -700, 1400, 0, width)
      let y = map(-handData.screenPosition()[1], 0, 1000, height , 0)
      let z = map(handData.screenPosition()[2], -400, 800, -width, width)
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

  counter++;
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colArray = [ color(204, 102, 0),  color(0,57,135)]

  // x = map(sliderX.value(), -10, 10, -0.1, 0.1)
  // y = map(sliderY.value(), -10, 10, -0.1, 0.1)
  // z = map(sliderZ.value(), -10, 10, -0.1, 0.1)
  x = map(hand3d.x, 0, width, -1.0, 1.0)
  y = map(hand3d.y, height, 0, -1.0, 1.0)
  z = map(hand3d.z, -width, width, -1.0, 1.0)

  for(i=0;i<colArray.length;i++){
    let lightPosx = sin(((TWO_PI/colArray.length)*i));
    let lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx*x*10,
      lightPosy*y*10, 
      z*10);
  }

  noStroke()
  specularMaterial(100);
  push()
  //frameCount * 0.005
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.005)
  rotateZ(frameCount * 0.005)
  torus(width/4, 100)
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