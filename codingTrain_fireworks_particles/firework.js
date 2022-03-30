// Daniel Shiffman
// http://codingtra.in
// Code for: https://youtu.be/CKeyIbT3vXI

function Firework() {
  this.hue = random(255);
  this.particle = new Particle(random(width), height, this.hue, true);  // another name: this.firework
  this.exploded = false;
  this.particles = [];

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    if (!this.exploded) {
      this.particle.applyForce(gravity);
      this.particle.update();
      
      if (this.particle.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.explode = function() {
    for (var i = 0; i < 100; i++) {
      var p = new Particle(this.particle.pos.x, this.particle.pos.y, this.hue, false);
      this.particles.push(p);
    }
  }

  this.show = function() {
    if (!this.exploded) {
      this.particle.show();
    }
    
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}