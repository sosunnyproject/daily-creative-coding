// particle vehicles starting from original x, y or random x, y
// move autonomously and randomly
// arrive at the target position

class ButterflyParticle {

  constructor(x, y) {
    this.acc = createVector(random(0.03), random(-0.1))
    this.vel = createVector(random(-5, 5), random(-10, -5));
    this.pos = createVector(random(x - width/2 - 300, x - width/2 + 300), random(y-height/2 - 50, y-height/2 - 200))

    this.maxforce = 0.5
    this.maxspeed = 3
    this.size = random(15, 10);
    this.lifespan = 200.0;
    this.hueOffset = random(-100, -50)
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    //update acc, vel, pos,
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.applyForce(p5.Vector(0, -0.2));
    this.acc.mult(0)
    this.lifespan -= 5.0;
  }

  applyForce(force) {
    //add force to acc
    this.acc.add(force)
  }

  display() {
    colorMode(HSB);
    noStroke();
    noFill();
    const hue = map(this.pos.y, -height/2, height/2, 360, 50) + this.hueOffset
    fill(hue, 80, 80)
    // ellipse(30, 30, 20, 20)
    let b = new Butterfly(this.pos.x, this.pos.y, this.size)
    b.display()
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

}