// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A fixed boundary class

// A boundary is a simple rectangle with x,y,width,and height
class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    let fd = new box2d.b2FixtureDef();

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    // bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position.x = scaleToWorld(this.x);
    bd.position.y = scaleToWorld(this.y);

    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));

    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);

    this.body.SetAngularVelocity(random(10, 20));

  }

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    // fill(255);
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();
    console.log(pos);
    rectMode(CENTER);
    push();
    noStroke();
    //color
    colorMode(RGB, 255, 255, 255, 255);
    let r = map(cos(a), -1, 1, 200, 255);
    let g = map(cos(a), -1, 1, 100, 220);
    let b = map(cos(a), -1, 1, 100, 255);
    fill(r, g, 0);
    //rotate
    translate(pos.x, pos.y);
    rotate(a*8);
    rect(0, 0, this.w, this.h, 20);
    pop();
  }
}
