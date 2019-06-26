// similar to Mover class

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(0, -2);
    this.maxspeed = 5;
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
/*
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);
    desired.mult(0.05);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
*/
  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    //scale damping within 100 px
    if (d < 100) {
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }
    // steering = desired  - velocity
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  // draw the Bob
  display() {
    var theta = this.vel.heading() + PI / 2;
    fill(20, map(this.pos.x, 0, 640, 50, 125), map(this.pos.y, 0, 640, 200, 0));
    // console.log(this.vel.x);
    // slower, closer to 0
    // var speed = map ((this.vel.x + this.vel.y)/2, this.maxspeed * -1, this.maxspeed, 0, 50)
    // var speedX = map(this.vel.x, this.maxspeed * -1, this.maxspeed, 0, 20);
    // var speedY = map(this.vel.y, this.maxspeed * -1, this.maxspeed, 0, 20);

    // var dist = map(this.pos.x - mouseX + 1000, -1000, 1000, 0, 50);
    var posVel = 1;
    if (this.vel.x * this.vel.y < 0) {
      posVel = (this.vel.x * this.vel.y) * - 1;
    } else {
      posVel = this.vel.x * this.vel.y
    }
    // console.log(posVel);
    // console.log((posVel)/2); //always positive velocity value
    var mapVel = map(posVel, this.maxspeed * 3, 0, 0, 50);
    // console.log(mapVel);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    rect(0, 0, 75, 75, mapVel - 8);
    // beginShape();
    // vertex(0, -this.r * 2);
    // vertex(-this.r * 3 * (this.vel.x*0.5), this.r * 10);
    // vertex(this.r * 3 *(this.vel.x*0.5) , this.r * 10);
    // endShape(CLOSE);
    pop();
  }
}
