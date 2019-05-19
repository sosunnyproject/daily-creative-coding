class Circle {
  constructor(x, y, r) {
    this.r = r;

    //define body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    //define fixture (circle)
    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2; //bounciness

    //create body
    this.body = world.CreateBody(bd);
    //attach Fixture
    this.body.CreateFixture(fd);

    //extra force
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-8, 8), random(2, 5)));
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
      if (pos.y > height + (this.r)*(this.r)) {
        this.killBody();
        return true;
      }
      return false;
    }

    display() {
      //get position and angle
      let pos = scaleToPixels(this.body.GetPosition());
      let a = this.body.GetAngleRadians();

      //DRAW
      push();
      translate(pos.x, pos.y);
      rotate(a);
      // fill(127);
      // stroke(200);
      // strokeWeight(2);
      noStroke();
      colorMode(RGB, 255, 255, 255, 255);
      fill(50, map(pos.y, 0, 640, 220, 100), map(pos.y, 0, 640, 200, 255), 200);
      ellipse(0, 0, this.r * 2, this.r * 2);
      pop();
    }

}
