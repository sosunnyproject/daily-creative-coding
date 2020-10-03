let font;
function preload() {
  font = loadFont('Anton-Regular.ttf');
}

let points;
let bounds;
let text = 'EnOLA'
function setup() {
  createCanvas(100, 100);
  stroke(0);
  fill(255, 104, 204);

  points = font.textToPoints(text, 0, 0, 10, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(text, 0, 0, 30);
}

function draw() {
  background(255);
  beginShape();
  translate(-bounds.x * width / bounds.w, -bounds.y * height / bounds.h);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    vertex(
      p.x * width / bounds.w +
        sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
      p.y * height / bounds.h
    );
  }
  endShape(CLOSE);
}