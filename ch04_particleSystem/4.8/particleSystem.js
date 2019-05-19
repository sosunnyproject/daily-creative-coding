class ParticleSystem {
  constructor(num, v, img) {
    this.origin = v.copy();
    this.particles = [];
    this.img = img;
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin, this.img));
      // Add "num" amount of particles to the arraylist
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.img));
  }

  run(){
    for (let p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(p => !p.isDead());
  }

  applyForce(dir) {
    //enhance loop!
    for (let p of this.particles) {
      p.applyForce(dir);
    }
  }
}
