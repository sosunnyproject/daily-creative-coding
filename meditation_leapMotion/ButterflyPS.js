class ButterflyPS {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    if(this.particles.length < 5) {
      this.particles.push(new ButterflyParticle(this.origin.x, this.origin.y));
    }
  }

  run(){
    for (let p of this.particles) {
      p.run();
    }
    this.particles = this.particles.filter(p => !p.isDead());
  }
}
