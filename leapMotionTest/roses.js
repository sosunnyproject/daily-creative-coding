//Leap Motion
// https://developer-archive.leapmotion.com/getting-started/javascript
let hand = new p5.Vector(), phand = new p5.Vector()
let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()
let handRad = {}

controller.loop(function(frame) {
    phand = hand.copy()
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
      drawHandPos()
      hand.set(x, y)
  })
}).use('screenPosition', { scale: 1 });   

let d = 9;
let n = 4;
let hue1, hue2, strokeW, distance, angle, diff;
let sliderD, sliderN, sliderH, sliderW, sliderDistance, sliderA;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);

  // sliderD = createSlider(1, 18, 5, 1);
  // sliderD.position(10, 40)
  // sliderN = createSlider(5, 14, 5, 1);
  // sliderN.position(10, 70)

  // combined counts of roses + distance (translate origin)
  // sliderDistance = createSlider(0, 200, 0, 1)
  // sliderDistance.position(10, 200)

  // fixed
  // sliderH =  createSlider(0, 360, 5, 0.5);
  // sliderH.position(10, 100)
  // sliderW =  createSlider(0.5, 5, 1, 0.5);
  // sliderW.position(10, 130)
  // sliderA = createSlider(0.1, 3, 2, 0.05);
  // sliderA.position(10, 280)
}

function draw() {
  background(hue1, 70, 10)

  // mark position 
  /*
  strokeWeight(2);
  fill(0, 100, 100)
  ellipse(rightHand.x + width/2, rightHand.y, 100);
  fill(100,  100, 100)
  ellipse(leftHand.x + width/2 , leftHand.y, 50);
  */

  // motion values
  d = map(handRad.left, -4, 4, 1, 18)
  n = map(handRad.right, -4, 4, 1, 14)
  distance = map(Math.abs(rightHand.x - leftHand.x), 20, width, 5, 80);
  count = map(Math.floor(distance), 0, 200, 1, 30);

  // fixed values
  hue1 = Math.abs(cos(frameCount*0.003)*360)
  hue2 = (hue1+180)%360
  strokeW = 1
  angle = map(sin(frameCount*0.00008), 1, -1, 0.1, 2.5)

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
  translate(width/2, height/2);
  push()
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

}