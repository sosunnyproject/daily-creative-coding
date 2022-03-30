function Particle(x, y, hue, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hue = hue;
  this.acc = createVector(0, 0);
  
  if (this.firework) {
    this.vel = createVector(0, random(-12, -8));  // (-6, -11)
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 10)); // (4, 5)
    this.acc = createVector(0, 0);
  }
 
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.9); // random(0.89, 0.95)
			//this determines how big particles scatter when pop
      this.lifespan -= 6; // 20
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    colorMode(HSB);
    
    if (!this.firework) {
      strokeWeight(1);
      stroke(this.hue, 255, 255, this.lifespan);  // same color for one batch firework
			// stroke(random(0,col), random(0,col), 255, this.lifespan); // different color for each particle

    } else {
      strokeWeight(4);
      stroke(this.hue, 255, 255);
    }
    
    point(this.pos.x, this.pos.y);
  }
}