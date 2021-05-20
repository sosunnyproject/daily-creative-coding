class Repeller {
  constructor(x, y) {
    this.power = 2;
    this.position = createVector(x, y);
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.position.x, this.position.y, 32, 32);
  }

  repel(p) {
    let dir = p5.Vector.sub(this.position, p.position); // Calculate direction of force
    let d = dir.mag(); // Distance between objects
    dir.normalize(); // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    d = constrain(d, 1, 50); // Keep distance within a reasonable range
    let force = -8 * this.power / (d); // Repelling force is inversely proportional to distance
    dir.mult(force); // Get force vector --> magnitude * direction
    return dir;
  }
};
