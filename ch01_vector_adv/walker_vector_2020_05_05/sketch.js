let w;

function setup() {
  createCanvas(400, 400);
  background(0);
  w = new Walker(width/2, height/2);
  // colorMode(HSB);
}

function draw() {
  w.step(random(1, 30));
  w.display();
  w.bounce();
}