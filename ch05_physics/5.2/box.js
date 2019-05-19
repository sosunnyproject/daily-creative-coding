class Box {
  constructor(x, y) {
    this.w = random(15, 20);
    this.h = random(15, 20);

    //Define a m_body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    //Define a GetFixture
    let fd = new box2d.b2FixtureDef();
    //Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));

    //some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2; //bounciness

    //crete m_body
    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);

    //some additional stuff
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

// remove from world
  killBody() {
    world.DestroyBody(this.body);
  }

//ready to be killed?
  done() {
    let pos = scaleToPixels(this.body.GetPosition());
    //bottom of the screen?
    if (pos.y > height + this.w * this.h) {
      this.killBody();
      return true;
    }
    return false;
  }

// draw BOX
  display() {
    //get position and angle
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();

    //DRAW
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    // fill(127);
    // stroke(200);
    // strokeWeight(2);
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(50, map(pos.x, 0, 640, 100, 200), map(pos.y, 0, 640, 150, 255), 200);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
