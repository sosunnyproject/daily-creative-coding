function Particle(x, y, rocket, heartRocket, fx, fy) {
	var minBoost = -3;
	var maxBoost = -8;
	this.pos = createVector(x, y);
	this.rocket = rocket;
	this.heartRocket = heartRocket;
	this.fx = fx;
	this.fy = fy;
	this.lifespan = 255;

	if (this.rocket) {
			this.vel = createVector(0, random(-3, -7));
			this.acc = createVector(0, random(minBoost, maxBoost));
	} else if (this.heartRocket) {
			this.vel = createVector(0,0);
			this.vel.mult(random(-5, -10));
			this.acc = createVector(0, 0);
			this.r = random(10, 255);
			this.g = random(10, 255);
			this.b = random(10, 255);
	} else {
			this.vel = p5.Vector.random2D();
			this.vel.mult(random(4, 8));
			// explodes scatter wide range
			this.acc = createVector(0, 0);
			this.r = random(75, 255);
			this.g = random(75, 255);
			this.b = random(75, 255);
	}
}

Particle.prototype.isSpent = function() {
	return (this.lifespan <= 0);
}

Particle.prototype.applyForce = function(force) {
	// this is mainly being used to apply gravity as a force, but it would
	// be neat if each firework had a "boost" (accelleration) value that
	// was applied here. Some rockets could be more powerful than others
	// (but not by much...)
	this.acc.add(force);
}

Particle.prototype.update = function() {
	if (!this.rocket) {
			this.vel.mult(0.9);
			this.lifespan -= 4;
	}
	this.vel.add(this.acc);
	this.pos.add(this.vel);
	this.acc.mult(0);
}

Particle.prototype.show = function() {
	if (!this.rocket) {
		 // when explodes, normal child particles
			strokeWeight(random(2,8));
			stroke(this.r, this.g, this.b, this.lifespan);
	} else {
		// all parent particles, before explodes
			strokeWeight(10);
			stroke(255, random(153, 255), 0);
	}
	if (this.heartRocket) {
		// heart child particles
			push();
			translate(this.fx, this.fy);
			strokeWeight(random(3,10));
			point(this.pos.x, this.pos.y);
			pop();
	} else {
			// this applies to all;
			//strokeWeight(1); // reset all strokes to 1
			point(this.pos.x+10, this.pos.y);
	}
}