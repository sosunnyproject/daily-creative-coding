// similar to Mover class

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-3, 3));
    this.acc = createVector(0.01, -0.3);
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 2.0;
    this.vel.limit(5);
  }

  // draw the Bob
  display() {
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(map(this.pos.y, 0, 640, 200, 255), map(this.pos.x, 0, 640, 0, 255), 100, this.lifespan);
    ellipse(this.pos.x, this.pos.y, 12, 12);
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

}
