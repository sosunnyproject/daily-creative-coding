let hand = new p5.Vector(), phand = new p5.Vector()
let leftHand = new p5.Vector(), rightHand = new p5.Vector();

//Leap Motion
var controller = new Leap.Controller()

controller.loop(function(frame) {
  // frame.hands.forEach(drawBrush);
  // console.log(frame.gestures.length)
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
}).use('screenPosition', {scale: 1});

function setup() {
  //fullScreen(); //or use createCanvas(250,250);
  createCanvas(800,800);
  background(0)
}

function draw() {
  background(0)
}
    
function drawBrush(hand){
  	
  // console.log(hand);
  stroke(255);
  strokeWeight(10);
  fill(255);
  ellipse(hand.thumb.tipPosition[0], -hand.thumb.tipPosition[1], 10);
  ellipse(hand.thumb.dipPosition[0], -hand.thumb.dipPosition[1], 10);
  ellipse(hand.thumb.pipPosition[0], -hand.thumb.pipPosition[1], 10);
  ellipse(hand.thumb.tipPosition[0], -hand.thumb.tipPosition[1], 10);
  ellipse(hand.thumb.mcpPosition[0], -hand.thumb.mcpPosition[1], 10);
  ellipse(hand.thumb.carpPosition[0], -hand.thumb.carpPosition[1], 10);

  ellipse(hand.indexFinger.tipPosition[0], -hand.indexFinger.tipPosition[1], 10);
  ellipse(hand.indexFinger.dipPosition[0], -hand.indexFinger.dipPosition[1], 10);
  ellipse(hand.indexFinger.pipPosition[0], -hand.indexFinger.pipPosition[1], 10);
  ellipse(hand.indexFinger.tipPosition[0], -hand.indexFinger.tipPosition[1], 10);
  ellipse(hand.indexFinger.mcpPosition[0], -hand.indexFinger.mcpPosition[1], 10);
  ellipse(hand.indexFinger.carpPosition[0], -hand.indexFinger.carpPosition[1], 10);

  ellipse(hand.middleFinger.tipPosition[0], -hand.middleFinger.tipPosition[1], 10);
  ellipse(hand.middleFinger.dipPosition[0], -hand.middleFinger.dipPosition[1], 10);
  ellipse(hand.middleFinger.pipPosition[0], -hand.middleFinger.pipPosition[1], 10);
  ellipse(hand.middleFinger.tipPosition[0], -hand.middleFinger.tipPosition[1], 10);
  ellipse(hand.middleFinger.mcpPosition[0], -hand.middleFinger.mcpPosition[1], 10);
  ellipse(hand.middleFinger.carpPosition[0], -hand.middleFinger.carpPosition[1], 10);

  ellipse(hand.ringFinger.tipPosition[0], -hand.ringFinger.tipPosition[1], 10);
  ellipse(hand.ringFinger.dipPosition[0], -hand.ringFinger.dipPosition[1], 10);
  ellipse(hand.ringFinger.pipPosition[0], -hand.ringFinger.pipPosition[1], 10);
  ellipse(hand.ringFinger.tipPosition[0], -hand.ringFinger.tipPosition[1], 10);
  ellipse(hand.ringFinger.mcpPosition[0], -hand.ringFinger.mcpPosition[1], 10);
  ellipse(hand.ringFinger.carpPosition[0], -hand.ringFinger.carpPosition[1], 10);

  ellipse(hand.pinky.tipPosition[0], -hand.pinky.tipPosition[1], 10);
  ellipse(hand.pinky.dipPosition[0], -hand.pinky.dipPosition[1], 10);
  ellipse(hand.pinky.pipPosition[0], -hand.pinky.pipPosition[1], 10);
  ellipse(hand.pinky.tipPosition[0], -hand.pinky.tipPosition[1], 10);
  ellipse(hand.pinky.mcpPosition[0], -hand.pinky.mcpPosition[1], 10);
  ellipse(hand.pinky.carpPosition[0], -hand.pinky.carpPosition[1], 10);

}