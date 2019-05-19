class ParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
    this.size = random(20, 30);
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y, this.size));
  }

  run(){
    for (let p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
