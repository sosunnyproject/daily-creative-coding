//Leap Motion
var controller = new Leap.Controller()
controller.use('handEntry').on('handFound', function(hand){
  console.log("////handEntry///", hand)
});
controller.connect()

controller.loop(function(frame) {
    phand = hand.copy()
    frame.hands.forEach(function(handData, ind) { 
      if(handData.type === "left") {
        leftHand = handData.copy()
        console.log("////left: ", leftHand)
      } else {
        rightHand = handData.copy()
        console.log("////right: ", rightHand)
      }
      drawHandPos()
    })
    let x = map(hand.screenPosition()[0], 0, 1000, -width/2,width/2)
    let y = map(-hand.screenPosition()[1], -200, 800, height/2 ,-height/2)
  
    hand.set(x, y)

}).use('screenPosition', { scale: 1 });
    
  
let hand, phand, leftHand, rightHand = new p5.Vector();

// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let mouse;
let slider, s2;
let c1, c2;
let Y_AXIS = 1;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(0, 102, 153);
  
  // the slider make move the light from behind (1) to front (1);
   slider = createSlider(4, 10, 6, 0.05);
   s2 = createSlider(0.005, 0.03, 0.015, 0.005);
  
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);  
}

function draw() {
  background(c2, 10)
  mouse = createVector(mouseX, mouseY)
//   drawYGradient()
}


function drawHandPos(){
    noStroke();
    fill(random(0, 255), 0, random(0, 150))
    ellipse(rightHand.x, rightHand.y, 20);

    fill(random(0, 255), 0, random(0, 150))
    ellipse(leftHand.x, leftHand.y, 40);
}

function drawYGradient(){
  for(let i = -height/2; i <= height/2; i++){ // -height/2 ~ height/2
    const interY = map(i, -height/2, height/2, 0, 1)  // 0 ~ 1 : blue at top, 1 ~ 0: orange at top
    const coordY = (height - Math.abs(phand.Y)) + 100
    const ratioY =  interY*coordY*0.005 
    const borderY = lerpColor(c2, c1, ratioY)
    stroke(borderY)
    // x1, y1, x2, y2
    line(rightHand.x, rightHand.y, leftHand.x, leftHand.y);
  }
}

function drawXGradient(){
  for(let j = -width/2; j <= width/2; j++){ 
    const interX = map(j, -width/2, width/2, 0, 1)
    const coordX = width - Math.abs(mouseX)
    const ratioX = interX*coordX*0.005
    const borderX = lerpColor(c2, c1, ratioX)
    stroke(borderX)
    line(j, -height/2, j, height/2)
  }
}
