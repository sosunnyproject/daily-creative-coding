//Leap Motion
var controller = new Leap.Controller();
controller.use('handEntry').on('handFound', function(hand){
  console.log("////handEntry///", hand)
});
controller.connect();


controller.loop(function(frame) {
    phand = hand.copy();
    frame.hands.forEach(drawThumb);
    /*
      function(handData, index) {
      console.log("////thumb////", handData.type)
      console.log(handData.thumb.tipPosition[0], -handData.thumb.tipPosition[1]);
      
      // console.log(
      //   parseInt(handData.screenPosition()[0]),
      //   parseInt(handData.screenPosition()[1]),
      // );
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
  */
    }).use('screenPosition', {scale: 1});
    
  
let hand = new p5.Vector();
let phand = new p5.Vector();
let isDragged = false;

// colors
let counter = 0.00;
let radius = 80;
let slider, s2, btn;
let btnVal = 0;
let c1, c2;
let Y_AXIS = 1;

// 립모션 handGrab 에 따라 달라지는 변수
let size =  80; // 나비 사이즈
let smallest = 10; // 전체 로즈의 최소 사이즈
let biggest = 30; // 전체 로즈의 최대 사이즈

function setup() {
  // webgl 세팅: 가로 세로 좌표 변경. -width/2 ~ width/2, -height/2 ~ height/2

  createCanvas(800, 800, WEBGL);
  // background(0, 102, 153);
  background(0)
  
  // the slider make move the light from behind (1) to front (1);
  slider = createSlider(4, 10, 6, 0.05);
  s2 = createSlider(0.005, 0.03, 0.015, 0.005);
  wRatio = width/550;

  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);  
  // btn = createButton('breathe');
  // btn.mousePressed(drawGradient);
}

function draw(){
  
}

function drawThumb(hand){
 
  // console.log("ScreenPosition...", "hand.type.....", 
  // parseInt(hand.screenPosition()[0]),
  // parseInt(hand.screenPosition()[1]),
  // );

  // console.log("hand.type...", hand.type, "....", 
  // parseInt(hand.screenPosition()[0]), parseInt(hand.screenPosition()[1]));

  let x = map(hand.screenPosition()[0], 0, 1000, -width/2,width/2);
  let y = map(-hand.screenPosition()[1], -200, 800, height/2 ,-height/2);

  noStroke();
  fill(random(0, 255), 0, random(0, 150))

  // if (hand.type === 'left') {

  // } else {
    // fill(255, 255, 0)

  // }
  ellipse(x, y, random(5, 30));

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
// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6

function setGradient(x, y, w, h, c1, c2, axis){
  // noFill();
  for(let i = y; i <= y+h; i++){ // 0 ~ height
    let inter = map(i, y, y+h, 0, 1);
    // console.log(i, y, y+h); // i : -300 ~ 300, 
    let c = lerpColor(c1, c2, inter*(frameCount*s2.value()*0.5));
    stroke(c);
    line(x, i, x+w, i);
  }
}

function drawGradient(){
  btnVal += 1;
  for(let i = -height/2; i <= -height/2+height; i++){ // 0 ~ height
    let inter = map(i, -height/2, -height/2+height, 0, 1);
    let c = lerpColor(c2, c1, inter*(btnVal*0.05));
    stroke(c);
    line(-width/2, i, -width/2 + width, i);
  }
}