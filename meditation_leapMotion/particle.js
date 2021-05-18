// particle vehicles starting from original x, y or random x, y
// move autonomously and randomly
// arrive at the target position

class Particle {

  constructor(x, y) {
    this.acc = createVector(random(0), random(-0.1))
    this.vel = createVector(0, random(-10, -5));
    this.pos = createVector(random(x - width/2 - 100, x - width/2 + 100), 
    random(y - height/2 - 100, y - height/2 - 150))

    this.maxforce = 0.5
    this.maxspeed = 3
    this.lifespan = 200.0;
    this.randomOffset = random(-TWO_PI, TWO_PI)
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
    this.lifespan -= 1.0;
  }

  applyForce(force) {
    //add force to acc
    this.acc.add(force)
  }

  display() {
    // const hue = map(this.pos.y, -height/2, height/2, 360, 50) + this.hueOffset
    // fill(hue, 80, 80)
    noStroke();
    push();
    translate(this.pos.x, this.pos.y)
    rotateX(cos(frameCount/30) * TWO_PI + this.randomOffset)
    rotateZ(sin(frameCount/30) * PI + this.randomOffset)

    cone(30, 38, 10, 4, false);
    translate(0, -40)
    sphere(36, 10, 7)
    pop()
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }

}