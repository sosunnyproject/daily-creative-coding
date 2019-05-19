let ps;
let imgs = [];

function preload(){
  imgs[0] = loadImage("sakuraCo2.png");
  // imgs[1] = loadImage("sakuraCo3.png");
  // imgs[2] = loadImage("sakuraCo4.png");

}
function setup() {
  createCanvas(640, 640);
  ps = new ParticleSystem(imgs);
}

function draw() {

  background(0);
  ps.addParticle(300, 640);

  let up = createVector(map(cos(frameCount), -1, 1, -2, 2), -0.2);
  ps.applyForce(up);
  ps.update();
}

//terminal command $ http-server -c-1
