class Particle {
  constructor(x, y, size) {
    this.pos = new p5.Vector(x, y);
    this.vel = new p5.Vector();
    this.acc = new p5.Vector();

    this.size = size;
    this.life = 60;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.applyForce(new p5.Vector(0, 0.3));
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.life--;
  }

  display() {
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
