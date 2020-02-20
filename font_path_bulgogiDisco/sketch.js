let font;
function preload() {
  font = loadFont('PermanentMarker-Regular.otf');
}

let bounds;
let count = 0, count2 = 0, count3 = 0;

// audioReact
let micLevel;
let loopNum = 20;      // red particles: speed change; i loop limit
let strokeSize = 10;  // white particles: particle size; strokeWeight
let pointGap = 0.08;
let t1 = ["DO U", "KNOW", "BULGOGI"];
let t2 = ["DO U", "KNOW", "D I S C O"];
let t3 = ["B U L", " G O G I", "D I S C O"];
let txtList = [t1, t2, t3];
let txtCount = 0;

function mouseClicked(){
  console.log("mouse ", txtCount);
  if (txtCount < 2) {
    txtCount++;
  } else {
    txtCount = 0;
  }
}

function setup() {
  createCanvas(800, 500);
  fill(255, 104, 204);

  // sound
  mic = new p5.AudioIn()
  mic.start();
  getAudioContext().resume();
  micLevel = 0.5;
}

function draw() {
  //sound
  micLevel = mic.getLevel() * 10; // 0 ~ 10 range
  strokeSize = map(micLevel, 0, 10, 5, 45);
  // pointGap = map(micLevel, 0, 10, 0.1, 0.05);

  background(0, 50); // opacity: 전 프레임의 애니메이션 궤적이 남느냐 안남느냐 결정.
  points1 =  createPoints(txtList[txtCount][0]);
  points2 = createPoints(txtList[txtCount][1]);
  points3 = font.textToPoints(txtList[txtCount][2], 0, 0, 100, {
    sampleFactor: 0.15,
    simplifyThreshold: 0
  });


  // animation
  // for 문 안으로 다 들이밀면, 더 빠르게
  translate(30, 150);
  strokeWeight(strokeSize);
  stroke(255, 0, 0);
  for (let i = 0; i < loopNum; i++) {
    let p = points1[count];
    point(p.x, p.y);
    count++;
    if (count > points1.length-1) {
      count = 0;
    }
  }

  translate(280, 0);
  for (let i = 0; i < loopNum; i++) {
    let p2 = points2[count2];
    point(p2.x, p2.y);
    count2++;
    if (count2 > points2.length-1) {
      count2 = 0;
    }
  }

  translate(-170, 200);
  stroke(255);
  for (let i = 0; i < loopNum; i++) {
    strokeWeight(strokeSize-3);
    let p3 = points3[count3];
    // console.log(points3[count3])
    // console.log(p3);
    point(p3.x, p3.y);
    count3++;
    if (count3 > points3.length-1) {
      count3 = 0;
    }
  }
}

function createPoints(txt){
  points = font.textToPoints(txt, 0, 0, 100, {
    sampleFactor: pointGap,
    simplifyThreshold: 0
  });
  return points;
}

function mouseMoved() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
