let vectorArray = [];
let baliImg;

function preload() {
  baliImg = loadImage('bali-beach1.jpg');
}

function setup() {
  baliImg.resize(400, 400);
  createCanvas(400, 400);
  background(baliImg);
}

function draw() {
}

function mousePressed(){
  pickPoint();
}

function pickPoint() {
  stroke(0);
  strokeWeight(3);
  point(mouseX, mouseY);

  // sea
  // sun 210, 330
  // sk

  let v = createVector(mouseX, mouseY);
  vectorArray.push(v);
  drawCurve();
}

function drawCurve() {
  noFill();
  beginShape();
  for(let i = 0 ; i < vectorArray.length; i++) {
    let col =
        baliImg.get(vectorArray[i].x, vectorArray[i].y);
    stroke(col);
    strokeWeight(1);
    curveVertex(vectorArray[i].x, vectorArray[i].y);
  }
  endShape();
}
