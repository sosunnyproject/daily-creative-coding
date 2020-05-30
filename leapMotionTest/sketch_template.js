//Leap Motion
var controller = new Leap.Controller();
controller.use('handEntry').on('handFound', function(hand){
  console.log("////handEntry///", hand)
});
controller.connect();


controller.loop(function(frame) {
    phand = hand.copy();
    frame.hands.forEach(function(handData, index) {
      console.log(
        parseInt(handData.screenPosition()[0]),
        parseInt(handData.screenPosition()[1]),
      );
      let x = map(handData.screenPosition()[0], 0, 500, -width/2,width/2);
      let y = map(handData.screenPosition()[1], -400, 400, -height/2 ,height/2);
  
      hand.set(x,y);
      if(isDragged) handDragged();
      if(handData.grabStrength >= 0.98){
        isDragged = true;
        handGrab();
      }
      else if(isDragged){
        isDragged = false;
        handReleased();
      }
    });
  
    }).use('screenPosition', {scale: 1});
  
let hand = new p5.Vector();
let phand = new p5.Vector();
let isDragged = false;

// 립모션 handGrab 에 따라 달라지는 변수
let size =  80; // 나비 사이즈
let smallest = 10; // 전체 로즈의 최소 사이즈
let biggest = 30; // 전체 로즈의 최대 사이즈

function setup() {
  // webgl 세팅: 가로 세로 좌표 변경. -width/2 ~ width/2, -height/2 ~ height/2
  createCanvas(337, 600, WEBGL);
  wRatio = width/550;
}

function draw(){

}

function handGrab(){
  size = 40;
  smallest = 40;
  biggest = 80;
}

function handReleased(){
  size = 80;
  smallest = 30;
  biggest = 50;
}

function handDragged(){ }

// Leap.loopController.setBackground(true)
// controller.setBackground(true);
