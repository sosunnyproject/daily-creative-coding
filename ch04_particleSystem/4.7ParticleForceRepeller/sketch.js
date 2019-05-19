let ps;
let repeller;
let variance;
let power;

function preload() {
  img = loadImage("redbul.png");
}

function setup() {
  createCanvas(640, 640);
  ps = new ParticleSystem(createVector(width/2, 280));
}

function draw() {
  background(0);
  ps.addParticle();
  power = random(50, 400);
  variance = random(-5, 5);
  repeller = new Repeller(width/2, height/2, power, variance, img);

  let gravity = createVector(0, 0.01);
  ps.applyForce(gravity);
  repeller.display();
  ps.applyRepeller(repeller);
  ps.run();

}
