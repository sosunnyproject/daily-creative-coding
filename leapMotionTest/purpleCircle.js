//Leap Motion
let hand = new p5.Vector(), phand = new p5.Vector()
let leftHand = new p5.Vector(), rightHand = new p5.Vector();
var controller = new Leap.Controller()

controller.loop(function(frame) {
    phand = hand.copy()
    frame.hands.forEach(function(handData, ind) {
  
      let x = map(handData.screenPosition()[0], -700, 1400, 0, width)
      let y = map(-handData.screenPosition()[1], 0, 1000, height , 0)
    
      if(handData.type === "left") {
        console.log("left", handData.screenPosition()[0], handData.screenPosition()[1])
        leftHand.set(x, y)
      } else {
        console.log("right", handData.screenPosition()[0], handData.screenPosition()[1])
        rightHand.set(x, y)
      }
      drawHandPos()
    hand.set(x, y)
  })
}).use('screenPosition', { scale: 1 });   

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0, 10);
  noFill();
  let rand = sin(frameCount*0.01)*100
  stroke(148+rand,0+rand,211-rand);
  strokeWeight(Math.abs(rand)/3);

  singleEllipse();
}

function singleEllipse(){
  ellipse(width/2, height/2, rightHand.x-leftHand.x, rightHand.y - leftHand.y)
}

function drawHandPos(){
  strokeWeight(2);
  fill(255, 0, 0)
  // console.log("right", rightHand.x, rightHand.y)
  // console.log("left", leftHand.x, leftHand.y)

  ellipse(rightHand.x, rightHand.y, 10);

  fill(0, 0, 255)
  ellipse(leftHand.x, leftHand.y, 10);

}
