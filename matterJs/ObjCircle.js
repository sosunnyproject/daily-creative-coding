class ObjCircle{
  constructor(x,y,radius,shapeColor,option={}){
    this.radius = radius;
    this.body = Bodies.circle(x, y, this.radius, option);
    this.color = shapeColor;
    World.add(engine.world, this.body);
  }

  display(){
    ellipseMode(CENTER);
    let pos = this.body.position;
    push();
      translate(pos.x, pos.y);
      rotate(this.body.angle);
      noStroke();
      fill(this.color);
      circle(0,0,this.radius);
    pop();
  }
}
