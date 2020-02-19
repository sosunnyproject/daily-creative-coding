let font;
function preload() {
  font = loadFont('PermanentMarker-Regular.otf');
}

let points1, points2;
let bounds;
let count = 0, count2 = 0;
function setup() {
  createCanvas(700, 500);
  fill(255, 104, 204);
  createPoints();
}

function draw() {
  background(0, 10);
  strokeWeight(0.25);
  stroke(255, 0, 0);

  for (let i = 0; i < points1.length; i++) {
    let p = points1[i];
    line(p.x+100,p.y+300,mouseX,mouseY);
  }
}

function createPoints(){
  points1 = font.textToPoints("BULGOGI", 0, 0, 100, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
}
