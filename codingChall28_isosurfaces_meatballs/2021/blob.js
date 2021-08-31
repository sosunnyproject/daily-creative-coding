class Blob {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3, 8))
  }

  update() {
    this.pos.add(this.vel);
    //edges
    if(this.pos.x + this.r > width || this.pos.x - this.r < 0) {
      this.vel.x *= -1;
    }
    if(this.pos.y + this.r > height || this.pos.y - this.r < 0) {
      this.vel.y *= -1;
    }
  }
  
  show() {
    noFill();
    stroke(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);

    push()
    strokeWeight(5)
    point(this.pos.x, this.pos.y)
    pop()
  }
}