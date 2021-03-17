function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 5;

  this.prevPos = this.pos.copy();

  // update vel based on acc
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  // receive force
  // add force to acc
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.show = function() {
    strokeWeight(1);
    stroke(
      50, 
      map(sin(this.pos.x), -1, 1, 200, 50),  
      map(sin(this.pos.y), -1, 1, 200, 255));
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y,
         this.prevPos.x, this.prevPos.y); 
    //draw line from current to previous pos

    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  // make sure particles come back when hit the walls
  this.edges = function() {
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  // im a particle, size me up to the scale of one grid square
  // find the vecotr inside it, apply force
  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}