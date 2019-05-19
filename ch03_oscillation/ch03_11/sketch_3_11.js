let bob;
let spring;

function setup() {
  bob = new Bob();
  spring = new Spring();
}

function draw() {
  let gravity = createVector(0,1);
  bob.applyForce(gravity);

  spring.connect(bob);

  bob.update();
  bob.display();
  spring.display();
}
