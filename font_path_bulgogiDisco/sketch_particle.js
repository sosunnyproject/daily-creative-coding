let font;
function preload() {
  font = loadFont('PermanentMarker-Regular.otf');
}

let points1, points2;
let bounds;
let count = 0, count2 = 0, number = 0;
let particles = [];

function setup() {
  createCanvas(700, 500);
  fill(255, 104, 204);
  createPoints();
}

function draw() {
  background(0, 10);
  strokeWeight(0.25);
  stroke(255, 0, 0);
  translate(100, 300);

  // 빨리 그리기.
  for(let i=0; i<10; i++){
    let p = points1[floor(random(points1.length))];
    if(p)particles.push(new Particle(p.x, p.y, random(3, 5)));
  }

  // 글자 그리기 (1회)
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
  }

  // 오래된 애들 삭제. 용량 차지.
  for(let i = particles.length-1; i>=0; i--) {
    if (particles[i].life < 0) particles.splice(i, 1);
  }

  // 글자 내부.
  if (frameCount % 60 == 1) {
     createPoints();
  }

}

function createPoints(){
  points1 = font.textToPoints("ON", 0, 0, 300, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
}
