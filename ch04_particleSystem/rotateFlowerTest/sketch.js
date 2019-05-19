let p;
let img;

function preload(){
  img = loadImage("sakuraCo20.png");
  // imgs[1] = loadImage("sakuraCo3.png");
  // imgs[2] = loadImage("sakuraCo4.png");
}

function setup() {
  createCanvas(640, 640);
  // img = loadImage("sakuraCo20.png");
  p = new Particle(width/2, 300, img);
}

function draw() {
  background(0);
  p.run();

  if (p.isDead()) {
    p = new Particle(width/2, 300, img);
  }
  // push();
  // translate(300, 300);
  // rotate(map(sin(frameCount), -1, 1, 0, PI/3));
  // imageMode(CENTER);
  // image(img, 0, 0);
  // pop();
}
