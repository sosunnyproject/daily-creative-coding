let hand = new p5.Vector(), phand = new p5.Vector()
let leftHand = new p5.Vector(), rightHand = new p5.Vector();

//Leap Motion
var controller = new Leap.Controller()
// controller.use('handEntry').on('handFound', function(hand){
//   // console.log("////handEntry///", hand)
// });
// controller.connect()

controller.loop(function(frame) {
    phand = hand.copy()
    frame.hands.forEach(function(handData, ind) {
  
      let x = map(handData.screenPosition()[0], -800, 1200, -width/2,width/2)
      let y = map(-handData.screenPosition()[1], -400, 1000, height/2 ,-height/2)
    
      if(handData.type === "left") {
        leftHand.set(x, y)
        // console.log("////left: ", leftHand)
      } else {
        rightHand.set(x, y)
        // console.log("////right: ", rightHand)
      }

    drawHandPos()
    hand.set(x, y)
  })
}).use('screenPosition', { scale: 1 });
    

// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let slider, s2;
let c1, c2;
let Y_AXIS = 1;

function setup() {
  createCanvas(800, 800, WEBGL);
  background(0, 102, 153);
  
  // the slider make move the light from behind (1) to front (1);
   slider = createSlider(4, 10, 6, 0.05);
   s2 = createSlider(0.005, 0.03, 0.015, 0.005);
  
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);  
}

function draw() {
//   drawYGradient()
}


function drawHandPos(){
  background(c2, 0.1)
    noStroke();
    fill( 255, 0, 0)
    ellipse(rightHand.x, rightHand.y, 20);

    fill(0, 0, 255)
    ellipse(leftHand.x, leftHand.y, 20);

}
