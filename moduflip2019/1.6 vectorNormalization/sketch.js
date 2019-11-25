// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-5: Vector magnitude

function setup() {
  createCanvas(640,360);
}

function draw() {
  background(51);

  let mouse = createVector(mouseX,mouseY);
  let center = createVector(width/2,height/2);
  mouse.sub(center);

  // 1.6 normalization
  mouse.normalize(); // 마우스 까지의 벡터를 정규화
  mouse.mult(150); // 마우스 유닛 벡터 사이즈 (1) * 150

  translate(width/2,height/2);
  strokeWeight(2);
  stroke(255);
  line(0,0,mouse.x,mouse.y);
}
