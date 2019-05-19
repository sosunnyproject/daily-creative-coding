class Particle {
  constructor(x, y, r) {
    this.r = r;

    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x,y);

    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);

    fd.density = 1.0;
    fd.friction = 0.1;
    fd.restitution = 0.3;

    this.body = world.CreateBody(bd);
    this.body.CreateFixture(fd);
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

  killBody() {
    world.DestroyBody(this.body);
  }

  done() {
    let transform = this.body.GetTransform();
    let pos = scaleToPixels(transform.position);
    if (pos.y > height + this.r) {
      this.killBody();
      return true;
    }
    return false;
  }

  display() {
    let pos = scaleToPixels(this.body.GetPosition());
    let a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(10, map(pos.y, 0, 640, 150, 225), map(pos.y, 0, 640, 255, 10));
    ellipse(0, 0, this.r * 2, this.r * 2);
    // Let's add a line so we can see the rotation
    stroke(200);
    strokeWeight(2);
    line(0, 0, this.r - 0.5, 0);
    pop();
  }
}
