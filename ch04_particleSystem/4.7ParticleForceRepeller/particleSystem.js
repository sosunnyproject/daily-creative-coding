class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle(x, y) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Particle(x, y));
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  applyForce(f) {
    for (let p of this.particles) {
      p.applyForce(f);
    }
  }

  applyRepeller(r) {
    for (let p of this.particles) {
      let force = r.repel(p);
      p.applyForce(force);
    }
  }

  run(){
    for (let p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
