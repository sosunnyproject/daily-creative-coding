class Repeller {
  constructor(x, y, power, variance, img) {
    this.position = createVector(x, y);
    this.power = power;
    this.variance = variance;
    this.img = img;
  }

  display() {
    imageMode(CENTER);
    image(img, this.position.x, this.position.y + 40, img.width/4, img.height/4);
    // stroke(255);
    // fill(155);
    // ellipse(this.position.x, this.position.y, 50, 50);
  }

  repel(p) {
    let dir = p5.Vector.sub(this.position, p.position);
    let d = dir.mag();
    dir.normalize();
    d = constrain(d, 1, 100);
    let force = this.variance * this.power / (d * d);
    dir.mult(force);
    return dir;
  }
}
