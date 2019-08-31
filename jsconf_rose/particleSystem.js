// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class ParticleSystem {
  constructor(position, img) {
    this.origin = position.copy();
    this.particles = [];
    this.img = img;
  }


  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y, this.img));
  }

  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  // A function to apply a force to all Particles
  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f);
    }
  }

  applyRepeller(r) {
    if(-mouseX/2< mouseX < width/2 || -height/2 < mouseY < height/2) {
      for (let particle of this.particles) {
        let force = r.repel(particle);
        particle.applyForce(force);
      }
    }
  }

  applyAttractor(a) {
    for (let particle of this.particles) {
      let force = a.attract(particle);
      particle.applyForce(force);
    }
  }

}
