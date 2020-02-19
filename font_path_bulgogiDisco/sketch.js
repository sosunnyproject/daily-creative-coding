let font;
function preload() {
  font = loadFont('PermanentMarker-Regular.otf');
}

let points;
let bounds;
function setup() {
  createCanvas(800, 500);
  stroke(0);
  fill(255, 104, 204);

  points1 = font.textToPoints('BULGOGI', 0, 0, 100, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });
  points2 = font.textToPoints('DISCO', 0, 0, 100, {
    sampleFactor: 0.5,
    simplifyThreshold: 0
  });
}

function draw() {
  background(255);
  beginShape();
  translate(50, 150);

  strokeWeight(5);
  for (let i = 0; i < points1.length; i++) {
    let p = points1[i];
    point(p.x, p.y);
  }
  endShape(CLOSE);

  beginShape();

  translate(100, 200);
  strokeWeight(5);
  for (let i = 0; i < points2.length; i++) {
    let p = points2[i];
    point(p.x, p.y);
  }
  endShape(CLOSE);
}
