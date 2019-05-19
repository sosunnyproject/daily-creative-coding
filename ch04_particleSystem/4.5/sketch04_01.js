
let psArray = [];

function setup() {
  createCanvas(640, 640);
}

function mousePressed() {
  psArray.push(new ParticleSystem(mouseX, mouseY));
}

function draw() {
  background(0);
  for (let i = 0; i < psArray.length; i++){
    psArray[i].addParticle();
    psArray[i].run();
  }
  // p.run();
  // if (p.isDead()) {
  //   console.log("particle is dead");
  // }
}
