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
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    let bd = new box2d.b2BodyDef();

    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position.x = scaleToWorld(this.x);
    bd.position.y = scaleToWorld(this.y);
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));
    this.body = world.CreateBody(bd).CreateFixture(fd);
  }

  // Draw the boundary, if it were at an angle we'd have to do something fancier
  display() {
    // fill(255);
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    let mill;
    if(round(millis()) % 8 === 0) {
      // console.log(millis());
      mill = millis();
    }
    let r = map(cos(mill), -1, 1, 50, 100);
    let g = map(cos(mill), -1, 1, 100, 200);
    let b = map(cos(mill), -1, 1, 100, 255);
    fill(r, g, b);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 20);
  }
}
