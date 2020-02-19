let font;
function preload() {
  font = loadFont('PermanentMarker-Regular.otf');
}

let points;
let bounds;
let count = 0, count2 = 0;
function setup() {
  createCanvas(700, 500);
  fill(255, 104, 204);

  points1 = font.textToPoints('BULGOGI', 0, 0, 100, {
    sampleFactor: 0.15,
    simplifyThreshold: 0
  });
  points2 = font.textToPoints('DISCO', 0, 0, 100, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });
}

function draw() {
  background(0, 10); // 전 프레임의 애니메이션 궤적이 남느냐 안남느냐 결정.
  translate(50, 150);
  strokeWeight(5);

  // animation
  // for 문 안으로 다 들이밀면, 더 빠르게
  stroke(255, 0, 0);

  for (let i = 0; i < 10; i++) {
    let p = points1[count];
    point(p.x, p.y);
    count++;
    if (count > points1.length-1) {
      count = 0;
    }
  }

/*
  beginShape();
  for (let i = 0; i < points1.length; i++) {
    let p = points1[i];
    point(p.x, p.y);
  }
  endShape(CLOSE);
  */

  translate(100, 200);
  stroke(255);
  for (let i = 0; i < 10; i++) {
    let p2 = points2[count2];
    point(p2.x, p2.y);
    count2++;
    if (count2 > points2.length-1) {
      count2 = 0;
    }
  }
}
