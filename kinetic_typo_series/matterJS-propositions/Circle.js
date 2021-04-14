class Circle {
  constructor(x, y, r) {
    const option = {
      friction: 0.3, 
      density: 0.1,
    }
    this.body = Bodies.circle(x, y, r, option)
    this.r = r;
    Composite.add(world, this.body)
  }

  show() {
    var pos = this.body.position
    var angle = this.body.angle;
    push() 
    translate(pos.x, pos.y)
    // rotate(this.angle);
    ellipse(0, 0, this.r)

    pop()
  }


}