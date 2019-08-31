// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System
// A simple Particle class

class Particle {
  constructor(x, y, img) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-10, 10), random(-0.5, 0.5));
    this.acceleration = createVector(0,0);
    this.lifespan = 100.0;
    this.img = img;
  }

  run() {
    this.update();
    this.render();
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 0.5;
    this.velocity.limit(7);
  }

  render() {
    imageMode(CENTER);
    tint(this.lifespan*3);
    image(this.img, this.position.x, this.position.y, 64, 64);
  }

  // // Method to display
  // display() {
  //   fill(255, this.lifespan);
  //   ellipse(this.position.x, this.position.y, 12, 12);
  // }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
