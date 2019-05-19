// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let boxes = [];

function setup() {
  createCanvas(640, 640);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  // boundaries.push(new Boundary(width / 4 + 50, height/2, 75 , 10));
  // boundaries.push(new Boundary(3 * width / 4 - 150, height - 50, 75, 10));
  // boundaries.push(new Boundary(3 * width / 4 - 150, height - 50, 75, 10));

  let b = new Box(width / 2, 30);
  boxes.push(b);
}

function mouseClicked() {
  boundaries.push(new Boundary(mouseX, mouseY, 50 , 10));
}

function mouseDragged() {
  ellipse(mouseX, mouseY, 5, 5);
  // prevent default
  return false;
}

function draw() {
  background(0);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // Boxes fall from the top every so often
  if (random(1) < 0.2) {
    let b = new Box(width / 2, 30);
    boxes.push(b);
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }
}
