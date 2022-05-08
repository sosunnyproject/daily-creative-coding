class Blobby {
  constructor(x, y,r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2,5));
  }

  show() {
    noFill();
    noStroke();
    // stroke(0);
    // strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

}
