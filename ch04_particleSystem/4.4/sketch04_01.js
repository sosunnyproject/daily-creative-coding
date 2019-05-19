let p;
let ps;

function setup() {
  createCanvas(640, 640);
  // p = new Particle(width/2, 30);
  ps = new ParticleSystem(width/2, 30);
}

function draw() {
  background(0);
  ps.origin.set(mouseX, mouseY, 0);
  ps.addParticle();
  ps.run();
  
  // p.run();
  // if (p.isDead()) {
  //   console.log("particle is dead");
  // }
}
