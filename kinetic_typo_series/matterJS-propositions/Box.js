class Box {
  constructor(x, y, w, h, fixed) {
    const option = {
      friction: 1, 
      restitution: 0.5,
      isStatic: fixed ? true : false
    }
    this.body = Bodies.rectangle(x, y, w, h, option)
    this.w = w;
    this.h = h;
    Composite.add(world, this.body)
  }

  show() {
    var pos = this.body.position
    var angle = this.body.angle;
    push() 
    translate(pos.x, pos.y)
    // rotate(this.angle);
    rect(0, 0, this.w, this.h)

    pop()
  }


}