let world;
let particles = [];
let surface;
// perlin noise
let cols, rows;
let zoff = 0;
let flowfield;
let scl = 10;
let inc = 0.1;

function setup() {
  createCanvas(640, 640);
  world = createWorld();
  surface = new Surface();

  //perlinNoise
  cols = floor(width/scl);
  rows = floor(height/scl);
  flowfield = new Array(cols*rows);
}

function draw() {
  background(0);

  let timeStep = 1.0/30;
  world.Step(timeStep, 10, 10);

  if(random(1) < 0.5) {
    let sz = random(10, 15);
    particles.push(new Particle(width / 2 + 80, 10, sz));
  }
  background(0);
  surface.display();
  /**
  for(let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
        particles.splice(i, 1);
    }
  }
  */
  //perlin
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      let v = p5.Vector.fromAngle(angle);  // "i want vector on every spot on the grid."05:10
      v.setMag(2); // full units, no limit..need to set maximum limit
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
    zoff += 0.00004;  // fixed flow field, if you comment this
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update();
    particles[i].display();
    particles[i].done();
  }

}
