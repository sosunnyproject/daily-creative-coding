// similar to Mover class

class Bob {
  constructor(x, y) {
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = 24;
    // arbitrary damping
    this.damping = 0.98;
    // user interaction
    this.dragOffset = createVector();
    this.dragging = false;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(this.damping);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  // newton's law = F = M*A
  applyForce(force) {
    let f = force.copy(); // force is a vector
    f.div(this.mass);
    this.acc.add(f);
  }

  // draw the Bob
  display() {
    stroke(255);
    strokeWeight(2);
    fill(127);
    if(this.dragging) {
      fill(200);
    }
    ellipse(this.pos.x, this.pos.y, this.mass*2, this.mass*2);
  }

  // user interaction
  handleClick(mx, my) {
    let d = dist(mx, my, this.pos.x, this.pos.y);
    if (d < this.mass) {   //  ????
      this.dragging = true;
      this.dragOffset.x = this.pos.x - mx;
      this.dragOffset.y = this.pos.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.pos.x = mx + this.dragOffset.x;
      this.pos.y = my + this.dragOffset.y;
    }
  }

}
