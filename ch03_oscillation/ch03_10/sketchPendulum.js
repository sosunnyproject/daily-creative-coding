let pArr = [];

function setup() {
  createCanvas(640, 640);
  for(let i = 0; i <= 100; i++) {
    pArr[i] = new Pendulum(createVector(width/2, 0), random(50, 600));
  }
}

function draw() {
  background(0);
  for(let i = 0; i <= 100; i++) {
    pArr[i].go();
  }
}

function mousePressed() {
  for(let i = 0; i <= 100; i++) {
    pArr[i].clicked(mouseX, mouseY);
  }
}

function mouseReleased() {
  for(let i = 0; i <= 100; i++) {
    pArr[i].stopDragging();
  }
}
