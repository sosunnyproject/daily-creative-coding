class Pendulum {
  constructor(origin_, r_){
    // variables
    this.origin = origin_.copy();  // PVector
    this.position = createVector(); // PVector
    this.r = r_; // arm length
    this.angle = PI;

    this.aVel = 0.01;
    this.aAcc = 0.01;
    this.damping = 0.995;
    this.ballr = 40.0; // ball's radius

    this.dragging = false;
    this.rand = random(100, 255);
  }

  go() {
    this.update();
    this.display();
    this.drag();
  }

  update() {
    if(!this.dragging) {
      let gravity = 0.5;
      this.aAcc = (-1 * gravity / this.r) * sin(this.angle);
      this.aVel += this.aAcc;  // inc vel
      this.aVel *= this.damping; // damping
      this.angle += this.aVel; // inc angle
    }
  }

  display() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0);
    this.position.add(this.origin);

    //draw arm
    stroke(255, 250);
    strokeWeight(0.5);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    // draw ball
    ellipseMode(CENTER);
    noStroke();
    fill(map(sin(this.angle), 1, -1,100, 255), this.rand, this.rand);
    if(this.dragging) fill(200);
    ellipse(this.position.x, this.position.y, this.ballr, this.ballr);
  }

  //mouse interaction

  clicked(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.ballr) {
      this.dragging = true;
    }
  }

  stopDragging() {
    this.aVelocity = 0; // no vel once you let go
    this.dragging = false;
  }

  drag() {
    if (this.dragging) {
      let diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY));
      this.angle = atan2( -1 * diff.y, diff.x) - radians(90);
    }
  }
}
