// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class ParticleSystem {
  constructor(position, img) {
    this.origin = position.copy();
    this.particles = [];
    this.img = img;
  }

  // 새로운 파티클 추가
  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y, this.img));
  }

  run() {
    // Run every particle
    for (let particle of this.particles) {
      particle.run();
    }
    // 죽은 파티클 제거
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  // 파티클에 force 적용
  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f);
    }
  }

  // 파티클에 repel 적용
  applyRepeller(r) {
    if(-mouseX/2< mouseX < width/2 || -height/2 < mouseY < height/2) {
      for (let particle of this.particles) {
        let force = r.repel(particle);
        particle.applyForce(force);
      }
    }
  }
  // 파티클에 attract 적용
  applyAttractor(a) {
    for (let particle of this.particles) {
      let force = a.attract(particle);
      particle.applyForce(force);
    }
  }

}
