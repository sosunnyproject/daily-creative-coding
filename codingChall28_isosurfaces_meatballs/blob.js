class Blob {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = 5;
  }

  show() {
    noFill();
    stroke(0);
    strokeWeight(5);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }

}
