// similar to Mover class

class Particle {
  constructor(pos, img) {
    this.acc = createVector(0, 0);
    let vx = randomGaussian() * 0.8;
    let vy = randomGaussian() * 0.8 - 1.0;
    this.vel = createVector(vx, vy);
    this.pos = pos.copy();
    this.lifespan = 255.0;
    this.img = img;
  }

  run() {
    this.update();
    this.render();
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 3.0;
    this.acc.mult(0.01);
  }

  render() {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(img, this.pos.x, this.pos.y, 25, 25);
  }

  isDead() {
    if (this.lifespan <= 0.0) {
      return true;
    } else {
      return false;
    }
  }

}
