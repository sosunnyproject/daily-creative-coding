//Leap Motion
// https://developer-archive.leapmotion.com/getting-started/javascript
let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}

controller.loop(function(frame) {
    frame.hands.forEach(function(handData, ind) {
  
      let x = map(handData.screenPosition()[0], -700, 1400, 0, width)
      let y = map(-handData.screenPosition()[1], 0, 1000, height , 0)
    
      if(handData.type === "left") {
        leftHand.set(x, y)
        handRad.left = -handData.roll()
      } else {
        rightHand.set(x, y)
        handRad.right = -handData.roll()
      }
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

let d = 5;
let n = 4;
let distance = 20;
let hue1, hue2, strokeW, angle, diff;
let sliderD, sliderN, sliderH, sliderW, sliderDistance, sliderA;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  leftHand = new p5.Vector(width/2 - 50, height/2 - 50)
  rightHand = new p5.Vector(width/2 + 50, height/2 + 50)
}

function draw() {
  background(hue1, 70, 10)

  // motion values
  d = map(handRad.left, -4, 4, 1, 18) || 1
  n = map(handRad.right, -4, 4, 1, 14) || 4
  distance = map(Math.abs(rightHand.x - leftHand.x), 20, width, 5, 80);
  count = map(Math.floor(distance), 0, 200, 1, 30);

  drawHandPos()

  // fixed values
  hue1 = Math.abs(cos(frameCount*0.003)*360)
  hue2 = (hue1+180)%360
  strokeW = 1
  angle = map(sin(frameCount*0.0008), 1, -1, 0.0, 1.5)

  textSize(12);
  fill(200);
  text('d:', 10, 30)
  text(d, 50, 30)
  text('n:', 10, 60)
  text(n, 50, 60)
  text('distance:', 10, 190)
  text(distance, 100, 190)
  text('angle', 10, 270)
  text(angle, 50, 270)

  let k = (n / d)
  push()
  translate(width/2, height/2);
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push();
    translate(distance, distance);
    beginShape(LINES);
    stroke(hue2, 100, 100);
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

function drawHandPos(){
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