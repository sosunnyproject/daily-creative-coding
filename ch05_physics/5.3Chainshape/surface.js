class Surface {
  constructor() {
    this.surface = [];
    this.surface.push(new box2d.b2Vec2(0, height/4 * 3 + 100));
    this.surface.push(new box2d.b2Vec2(100, 2 * height/4 + 180 + 20));
    this.surface.push(new box2d.b2Vec2(200, 2 * height/4 + 150 + 20));
    this.surface.push(new box2d.b2Vec2(250, 2 * height/4 + 80 + 20));
    this.surface.push(new box2d.b2Vec2(340, 2 * height/4 + 20 + 20));
    this.surface.push(new box2d.b2Vec2(420, 2 * height/4 + 20));

    this.surface.push(new box2d.b2Vec2(width - 100, 3 * height/4 + 20 + 20));
    this.surface.push(new box2d.b2Vec2(width, 3 * height/4 + 80 + 20));


    for (let i = 0; i < this.surface.length; i++) {
      this.surface[i] = scaleToWorld(this.surface[i]);
    }

    let chain = new box2d.b2ChainShape();
    chain.CreateChain(this.surface, this.surface.length);

    let bd = new box2d.b2BodyDef();
    this.body = world.CreateBody(bd);

    let fd = new box2d.b2FixtureDef();
    fd.shape = chain;

    fd.density = 1.0;
    fd.friction = 0.1;
    fd.restitution = 0.3;

    this.body.CreateFixture(fd);
  }

  display() {
    // strokeWeight(1);
    // stroke(200);
    // fill(200);
    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(50, map(sin(millis()), -1, 1, 50, 120));
    beginShape();
    for (let i = 0; i < this.surface.length; i++) {
      let v = scaleToPixels(this.surface[i]);
      vertex(v.x, v.y);
    }
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
  }
}
