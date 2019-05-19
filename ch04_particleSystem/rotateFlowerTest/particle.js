// similar to Mover class

class Particle {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-2, 0));
    this.acc = createVector(0, 0.02);
    this.lifespan = 255.0;
    this.img = img;
    this.angle;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 0.5;
    this.angle = map(cos(this.vel.x, this.vel.y), -1, 1, 0, TWO_PI);
  }

  // draw the Bob
  display() {
    tint(this.lifespan);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(map(sin(this.lifespan/2), -1, 1, 0, PI/3));
    imageMode(CENTER);
    image(img, 0, 0, 128, 128);
    pop();
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

}
