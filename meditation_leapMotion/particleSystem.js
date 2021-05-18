class ParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    if(this.particles.length < 1) {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run(){
    for (let p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
