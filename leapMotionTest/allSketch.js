//Leap Motion
// https://developer-archive.leapmotion.com/getting-started/javascript
let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}
let hand3d = new p5.Vector()

controller.loop(function(frame) {
    frame.hands.forEach(function(handData, ind) {
  
      let x = map(handData.screenPosition()[0], -700, 1400, -width/2, width/2)
      let y = map(-handData.screenPosition()[1], 0, 1000, height/2 , -height/2)
      let z = map(handData.screenPosition()[2], -400, 800, -width/2, width/2)

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
  /*
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
  */
}).use('screenPosition', { scale: 1 });   

let d = 5;
let n = 4;
let distance = 20;
let hue1, hue2, strokeW, angle, diff;
let sliderD, sliderN, sliderH, sliderW, sliderDistance, sliderA;
let sceneNum = 1;
let pg;

function setup() {
  createCanvas(windowHeight, windowHeight, WEBGL);
  leftHand = new p5.Vector(50,  50)
  rightHand = new p5.Vector(50, 50)
  pg = createGraphics(width, height);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
}

function draw() {

  switch(sceneNum){
    case 1:
      clear()
      drawCircle();
      break;
    case 2:
      clear()
      drawRose();
      break;
    case 3:
      clear()
      drawTorus();
      break;
  }
}

function mouseClicked() {
  if(sceneNum === 3) {
    sceneNum = 0
  }
  sceneNum++

}
function keyPressed() {
  if (keyCode === 49) {
    sceneNum = 1
  } else if (keyCode === 50) {
    sceneNum = 2
  } else if (keyCode === 51) {
    sceneNum = 3
  }
}

// circle
function drawCircle() {
  pg.background(0, 10);
  pg.noFill();
  let rand = sin(frameCount*0.01)*100
  pg.stroke(148+rand,0+rand,211-rand)
  pg.strokeWeight(Math.abs(rand)/10)
  singleEllipse()
  colorMode(RGB)
  drawHandPos()
  image(pg, -width/2, -height/2)
}

function singleEllipse(){
  pg.ellipse(width/2, height/2, rightHand.x-leftHand.x, rightHand.y - leftHand.y)
}

function drawHandPos(){
  pg.strokeWeight(1)
  pg.stroke(255)
  pg.ellipse(rightHand.x+width/2, rightHand.y+height/2, 10);
  pg.ellipse(leftHand.x+width/2, leftHand.y+height/2, 10);
}

// Rose

function drawRose() {
  background(0)
  colorMode(HSB);
  // motion values
  d = map(handRad.left, -4, 4, 1, 18) || 1
  n = map(handRad.right, -4, 4, 1, 14) || 4
  distance = map(Math.abs(rightHand.x - leftHand.x), 20, width, 5, 80);
  count = map(Math.floor(distance), 0, 200, 1, 30);
  drawRectHandPos()

  // fixed values
  hue1 = Math.abs(cos(frameCount*0.003)*200)
  strokeW = 1.25
  angle = map(sin(frameCount*0.0008), 1, -1, 0.0, 2.5)

  let k = (n / d)
  push()
  translate(0, 0);
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push();
    translate(distance, distance);
    beginShape(LINES);
    stroke(hue1, 100, 100);
    noFill();
    strokeWeight(strokeW);
    for (let a = 0; a < TWO_PI * d; a += angle) {
      let r = 150 * cos(k * a);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape();
    pop();
    diff += 0.25
  }
  pop()
}

function drawRectHandPos(){
  // mark hand coordinates 
  noStroke();
  push()
  fill(200, 20, 20)
  translate(rightHand.x, rightHand.y);
  rotate(n);
  rect(0, 0, 10, 50);
  pop()

  push()
  fill(200,  20, 20)
  translate(leftHand.x, leftHand.y);
  rotate(d);
  rect(0, 0, 10, 50);
  pop()
}

function drawTorus() {  

  colorMode(RGB)

  background(0)
  let colArray = [ color(204, 102, 0),  color(0,57,135)]

  x = map(hand3d.x, 0, width, -1.0, 1.0)
  y = map(hand3d.y, height, 0, -1.0, 1.0)
  z = map(hand3d.z, -width, width, -1.0, 1.0)

  for(i=0;i<colArray.length;i++){
    let lightPosx = sin((TWO_PI/colArray.length)*i)
    let lightPosy = cos((TWO_PI/colArray.length)*i)

    directionalLight(colArray[i], 
      lightPosx*x*10,
      lightPosy*y*10, 
      z*10);
  }
  noStroke()
  specularMaterial(100);
  push()
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.005)
  rotateZ(frameCount * 0.005)
  torus(width/4, 100)
  pop()
}