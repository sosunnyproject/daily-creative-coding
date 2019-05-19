let world;
let particles = [];
let surface;

function setup() {
  createCanvas(640, 640);
  world = createWorld();
  surface = new Surface();
}

function draw() {
  background(0);

  let timeStep = 1.0/30;
  world.Step(timeStep, 10, 10);

  if(random(1) < 0.5) {
    let sz = random(10, 15);
    particles.push(new Particle(width / 2 + 80, 10, sz));
  }

  surface.display();

  for(let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
        particles.splice(i, 1);
    }
  }
}
