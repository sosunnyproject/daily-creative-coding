//Leap Motion
Leap.loop(function(frame) {
  phand = hand.copy();
  frame.hands.forEach(function(handData, index) {
    console.log(
      // parseInt(handData.screenPosition()[0]),
      parseInt(handData.screenPosition()[1]),
      parseInt(handData.palmPosition[1])
    );
    let x = map(handData.screenPosition()[0], 0, 500, -width/2,width/2);
    let y = map(handData.screenPosition()[1], -400, 400, -height/2 ,height/2);

    hand.set(x,y);
    // console.log(x,y);
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


//rose
let v;
let d = 85;

//나비 particle
let psArray =[];
// let repeller;
let attractor;
let img;
let wRatio;

let hand = new p5.Vector();
let phand = new p5.Vector();
let isDragged = false;

// 립모션 handGrab 에 따라 달라지는 변수
let size =  80; // 나비 사이즈
let smallest = 10; // 전체 로즈의 최소 사이즈
let biggest = 30; // 전체 로즈의 최대 사이즈

// 나비 이미지 로드
function preload(){
  img = loadImage("data/white_butterfly2.png");
}

function setup() {
  // webgl 세팅: 가로 세로 좌표 변경. -width/2 ~ width/2, -height/2 ~ height/2
  createCanvas(337, 600, WEBGL);
  wRatio = width/550;

  // 초기 생성
  v = new Vehicle(0, 0, 3, 4);
  // v = new Vehicle(mouseX - width/2, mouseY - height/2, 3, 4);
  // v = new Vehicle(x, y, vw, vy);

  // 화면 center에 안보이는 attractor 설정
  attractor = new Attractor();

  // 나비 파티클 나오는 particleSystem 여럿 혹은 하나만.
  psArray.push(new ParticleSystem(createVector(-width/2, height/2), img)); // 좌측 하단.
  // psArray.push(new ParticleSystem(createVector(-width/2, -height/2), img)); // 좌측 상단
  // psArray.push(new ParticleSystem(createVector(width/2, -height/2), img)); // 우측 상단
  // psArray.push(new ParticleSystem(createVector(width/2, height/2), img)); // 우측 하단
}

function draw() {
  // attractor: 파티클들이 중심으로 모이게.
  // attractor.display();

  // rose
  // if 위치, 속력 정보를 받으면 시작.
  v.boundaries();
  v.arrive(createVector(hand.x, hand.y)); // auto agent 알고리즘: 마우스 따라가도록.
  v.update();
  v.display();

  // 나비 파티클
  // let gravity = createVector(0, -0.001);
  for(i = 0; i < psArray.length; i++) {
    // 나비 파티클 개수 제한
    if(frameCount % 4 == 0) {
      psArray[i].addParticle();
    }
    // psArray[i].applyForce(gravity);
    psArray[i].applyRepeller(v);
    psArray[i].applyAttractor(attractor);
    psArray[i].run();
  }

  // 립모션 손 위치 및 grab 표시
  stroke(20, 100, 100);
  strokeWeight(3);
  if(isDragged) fill(20,100,100);
  else noFill();
  push();
  translate(hand.x, hand.y, -1);
  ellipse(0, 0, 10, 10);
  pop();
}

// 넘겨받은 위치, 속력 좌표에서 개체 로즈 생성
function create(posX, posY, velX, velY){
  // v = new Vehicle(mouseX - width/2, mouseY - height/2, 3, 4);
  v = new Vehicle(posX, posY, velX, velY);

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

// 아래는 서버 관련부분입니다 고치지 마세요
function receive(msg){

  var data = msg.split(',');

  if(data.length>=5 && parseInt(data[0]) == 0 ){
    create(float(data[1]), float(data[2]), float(data[3]), float(data[4]));
  }

}

function send(posX, posY, velX, velY){
  console.log(posX, posY, velX, velY);
  var msg = 0 + "," + posX + "," + ( posY>=height?0:height ) + "," + velX + "," + velY;
  // receive(msg);
}
