function Firework() {
	this.exploded = false;
	this.particles = [];
	this.firework = new Particle(random(width), height, true);
}

Firework.prototype.isSpent = function() {
	return (this.exploded && this.particles.length == 0);
}

Firework.prototype.update = function() {
	if (!this.exploded) {
			this.firework.applyForce(gravity);
			//this.firework.applyForce(wind);
			this.firework.update();
			if (this.firework.vel.y >= 0) {
					this.exploded = true;
					this.explode();
			}
	}
	for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].applyForce(gravity);
			//this.particles[i].applyForce(wind);
			this.particles[i].update();
			if (this.particles[i].isSpent()) {
					this.particles.splice(i, 1);
			}
	}
}

Firework.prototype.show = function() {
	if (!this.exploded) {
			this.firework.show();
	}
	for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].show();
	}
}

Firework.prototype.explode = function() {
	if (random(1) < 0.3) {
			for (var i = 0; i < 50; i++) {
				//console.log("this is normal");
				this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, false));
			}
	} else {
			//console.log("this is heart");
			//this turns out to be about 97 points...
			// 't increase amount' determines the density of heart child particles
			// rand determines the size of the heart
			var rand = random(1, 2.5);
			// console.log(rand);
			for (var t = 0; t <= TWO_PI; t += 0.215) {
				// var x = (16 * rand * pow(sin(t), 3)) * -1;
				// var y = (13 * rand * cos(t) - 5 * cos(t * 2) - 2 * cos(t * 3) - cos(t * 4)) * -1
					var x = (16 * rand * pow(sin(t), 3)) * -1;
									// size - middle sharp - bottom sharp - somthing * squeezeheight
					var y = (13 * rand * cos(t) - 10 * cos(t * 2) - 5 * cos(t * 3) - cos(t * random(4, 10))) * -1.5
					this.particles.push(new Particle(x, y, false, true, this.firework.pos.x, this.firework.pos.y));
			}
	}
}