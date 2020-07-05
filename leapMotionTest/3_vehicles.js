// similar to Mover class

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, -2);
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.r = 6;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  // draw the Bob
  display() {
    var theta = this.vel.heading() + PI / 2;
    fill(map(this.pos.x, 0, 640, 100, 255), 20, map(this.pos.y, 0, 640, 200, 0));
    // fill(127);
    noStroke();
    // strokeWeight(1);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r * 3 * (this.vel.x*0.5), this.r * 10);
    vertex(this.r * 3 *(this.vel.x*0.5) , this.r * 10);
    endShape(CLOSE);
    pop();
  }
}
