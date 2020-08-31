let gap = 20

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  for (let i = 0; i < width; i += gap) {
    fill(255)
    noStroke()
    rect(i, i, 40, 10)
    rect(i, height-i, 40, 10)
  }
}