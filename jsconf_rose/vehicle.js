// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, 4);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 3;
    this.maxforce = 0.15;
    this.d = 8;
    this.n = 5;
    this.power = 50;
    // this.position = createVector(x, y);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    let des = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (des < 100) {
      var m = map(des, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }

  boundaries() {
    let bound = 20;
    let desired = null;
    if (this.position.x < -width/2 + bound || this.position.x > width/2 - bound) {
      this.velocity.x *= -1;
    }
    if (this.position.y < -height/2 + bound) {
      desired = createVector(-this.velocity.y, this.maxspeed);
    } else if (this.position.y > height/2 - bound) {
      // desired = createVector(-this.velocity.y, -this.maxspeed);
      // disappear;
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed * 10);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce*10);
      this.applyForce(steer);
    }
  }

  display() {
    this.d = map(sin(frameCount*0.012),-1, 1, 3, 7);
    this.n = map(cos(frameCount*0.015),1, -1, 3, 10);
    let k = this.n / this.d;
    let count = map(cos(frameCount*0.006), -1 , 1, 3, 8);

    background(0);
    colorMode(HSB);

    push();
    translate(this.position.x, this.position.y);
    for(let i=0; i<TWO_PI; i+= TWO_PI/count){

      rotate(TWO_PI/count);
      translate(d, 0);
      push();
      beginShape();
      noFill();
      stroke(map(tan(frameCount*0.025), -1, 1, 0, 360), 50, 255);
      strokeWeight(0.5);
      // change a ++ inc value : circle to n-angled shapes
      for (var a = 0; a < TWO_PI * this.d; a += 0.5) {
      var r = map(sin(frameCount*0.02), -1, 1, 40, 80) * cos(k * a);
      var x = r  * cos(a);
      var y = r * sin(a);
      vertex(x,y);
      }
      endShape();
      pop();
     }
    pop();
    }

  repel(p) {
    let dir = p5.Vector.sub(this.position, p.position); // Calculate direction of force
    let d = dir.mag(); // Distance between objects
    dir.normalize(); // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    d = constrain(d, 1, 120); // Keep distance within a reasonable range
    let force = -1 * this.power / (d * d); // Repelling force is inversely proportional to distance
    dir.mult(force); // Get force vector --> magnitude * direction
    return dir;
  }
}
