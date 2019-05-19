// similar to Mover class

class Particle {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0.02);
    this.lifespan = 255.0;
    this.img = img;
    this.angle = map(cos(this.vel.x), 1, -1, 0, TWO_PI * 2);
  }

  run() {
    this.update();
    this.render();
  }

  applyForce(f) {
    this.acc.add(f);
  }

  // update position
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 3.0;
  }

  render() {
    imageMode(CENTER);
    tint(this.lifespan*2);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(map(sin(this.lifespan/2), -1, 1, 0, PI/3));
    imageMode(CENTER);
    image(this.img, 0, 0, 48, 48);
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
