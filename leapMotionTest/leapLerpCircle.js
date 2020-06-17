let hand = new p5.Vector(), phand = new p5.Vector()
let leftHand = new p5.Vector(), rightHand = new p5.Vector();

//Leap Motion
var controller = new Leap.Controller()

controller.loop(function(frame) {
    phand = hand.copy()
    frame.hands.forEach(function(handData, ind) {
  
      let x = map(handData.screenPosition()[0], -800, 1200, -width/2,width/2)
      let y = map(-handData.screenPosition()[1], -400, 1000, height/2 ,-height/2)
    
      if(handData.type === "left") {
        leftHand.set(x, y)
      } else {
        rightHand.set(x, y)
      }
    hand.set(x, y)
  })
}).use('screenPosition', { scale: 1 });
    

// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let c1, c2;
let Y_AXIS = 1;
let dim = 30

function setup() {
  createCanvas(800, 800, WEBGL);
  background(0, 102, 153);
  colorMode(RGB)
  
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);  
}

function draw() {
  for(let x = -width/2; x <= width/2; x += 10) {
    drawCircleGradient(x, height/2)
  }
}

function drawCircleGradient(x, y) {
  let radius = 30;
  for (let r = -height/2; r < radius + height/2; r++) {
    let lerpCol = lerpColor(c1, c2, r*0.01)
    fill(lerpCol)
    ellipse(x, y, r, r)
  }
}

function drawYGradient(){
  for(let i = -height/2; i <= height/2; i++){ // -height/2 ~ height/2
    const interY = map(i, -height/2, height/2, 0, 1)  // 0 ~ 1 : blue at top, 1 ~ 0: orange at top
    const coordY = (height - Math.abs(phand.Y)) + 100
    const ratioY =  interY*coordY*0.005 
    const borderY = lerpColor(c2, c1, ratioY)
    stroke(c1)
    // x1, y1, x2, y2
    line(rightHand.x, rightHand.y, leftHand.x, leftHand.y);
  }
}
