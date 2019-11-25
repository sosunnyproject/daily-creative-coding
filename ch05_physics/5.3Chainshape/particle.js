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

    //perlinNoise
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
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
    /**
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(10, map(pos.y, 0, 640, 150, 225), map(pos.y, 0, 640, 255, 10));
    ellipse(0, 0, this.r * 2, this.r * 2);
    // Lets add a line so we can see the rotation
    stroke(200);
    strokeWeight(2);
    line(0, 0, this.r - 0.5, 0);
    pop();
    */

    stroke(255, 5);
    strokeWeight(1);
    // point(this.pos.x, this.pos.y);
    line(pos.x, pos.y, pos.x + 30, pos.y + 30); //draw line from current to previous pos
  }

  //perlinNoise
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(force) {
    this.acc.add(force);
  }
  updatePrev () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  follow (vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}
