class ParticleSystem {
  constructor(imgs) {
    this.particles = [];
    this.textures = imgs;
  }

  addParticle(x, y) {
    let img = random(this.textures);
    this.particles.push(new Particle(x, y, img));
  }

  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f);
    }
  }

  update(){
    for (let p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
