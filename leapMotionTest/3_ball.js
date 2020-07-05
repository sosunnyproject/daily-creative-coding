class Ball {
  constructor(){
    this.loc = createVector(100, 0, 100);  
    this.vel = createVector(random(3, 5), random(-1, -3), random(-1, -5));
    this.col = random(0, 360);
    this.size = random(10, 40);
    this.acc = createVector(0, 0, 0);
    this.maxforce = 0.2;
    this.maxspeed = 8;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  display(){
    // strokeWeight(0.3);
    noStroke();
    colorMode(HSB);
    ambientMaterial(255);
    rotateX(frameCount*0.01)
    rotateY(frameCount*0.01)
    rotateZ(frameCount * 0.01);
    cone(this.size, 70);
  }
  
  update(x, y, z){
    let acc = createVector(x, y, z)
    this.vel = this.vel.add(acc)
    this.loc = this.loc.add(this.vel); 
    acc.mult(0)
  }

  bound(){
    if((this.loc.x > width/2) || (this.loc.x < -width/2)){
      this.vel.x *= -1; 
    }
    if((this.loc.y > height/2) || (this.loc.y < -height/2)){
      this.vel.y *= -1;
    }
    if((this.loc.z > 500) || (this.loc.z < -500)){
      this.vel.z *= -1;
    }
  }
}