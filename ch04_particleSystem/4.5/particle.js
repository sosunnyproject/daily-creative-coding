// similar to Mover class

class Particle {
  constructor(x, y, size) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-2, 0));
    this.acc = createVector(0, 0.02);
    this.lifespan = 255.0;
    this.size = size;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 3.0;
  }

  // draw the Bob
  display() {
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(map(this.pos.y, 0, 640, 100, 255),100, map(this.pos.x, 0, 640, 50, 255), this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

}
