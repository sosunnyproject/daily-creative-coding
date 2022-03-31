// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let pops = [];

function setup() {
  createCanvas(640, 360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  boundaries.push(new Boundary(width, height - 5, width*2, 10, 0));
  // boundaries.push(new Boundary(3 * width / 4, height - 5, width, 10, 0));
  // boundaries.push(new Boundary(width - 5, height / 2, 10, height, 0));
  // boundaries.push(new Boundary(5, height / 2, 10, height, 0));
}

function draw() {
  background(51);	

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = pops.length - 1; i >= 0; i--) {
    pops[i].display();
    if (pops[i].done()) {
      pops.splice(i, 1);
    }
  }
}

function mousePressed() {
  let p = new Lollipop(mouseX, mouseY);
  pops.push(p);
}