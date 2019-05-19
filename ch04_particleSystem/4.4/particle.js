// similar to Mover class

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-2, 0));
    this.acc = createVector(0, 0.02);
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 1.5;
  }

  // draw the Bob
  display() {
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(100, map(this.pos.y, 0, 640, 100, 255), map(this.pos.x, 0, 640, 50, 255), this.lifespan);
    ellipse(this.pos.x, this.pos.y, 30, 30);
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

}
