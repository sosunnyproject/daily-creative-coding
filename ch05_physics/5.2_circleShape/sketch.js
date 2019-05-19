// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A reference to our box2d world
let world;

// A list we'll use to track fixed objects
let boundaries = [];
// A list for all of our rectangles
let circles = [];

function setup() {
  createCanvas(640, 640);

  // Initialize box2d physics and create the world
  world = createWorld();
  world.SetGravity(new box2d.b2Vec2(0, 7));

  // Add a bunch of fixed boundaries
  // boundaries.push(new Boundary(width / 4 + 50, height/2, 75 , 10));
  // boundaries.push(new Boundary(3 * width / 4 - 150, height - 50, 75, 10));
  // boundaries.push(new Boundary(3 * width / 4 - 150, height - 50, 75, 10));

  let c = new Circle(width/2, 30, 5);
  circles.push(c);
}

function mouseClicked() {
  boundaries.push(new Boundary(mouseX, mouseY, 50 , 10));
}

function draw() {
  background(0);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);


  // Boxes fall from the top every so often
  if (random(1) < 0.5) {
    let c = new Circle(width / 2, 30, random(6, 10));
    circles.push(c);
  }

  // Display all the boundaries
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  // Display all the boxes
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].display();
    if (circles[i].done()) {
      circles.splice(i, 1);
    }
  }
}
