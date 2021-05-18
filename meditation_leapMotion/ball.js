class Ball {
  constructor(){
    this.loc = createVector(100, 0, 100);  
    this.vel = createVector(random(3, 5), random(-1, -3), random(-1, -5));
    this.col = random(0, 360);
    this.size = random(20, 30);
    this.shape = Math.floor(random(1, 5))
  }
  
  display(){
    noStroke();
    ambientMaterial(255);
    rotateX(frameCount*0.01)
    rotateY(frameCount*0.01)
    rotateZ(frameCount * 0.01);
    switch(this.shape) {
      case 1: 
        cone(this.size, 70);
        break;
      case 2:
        box(this.size);
        break;
      case 3:
        torus(this.size, 15, 3, 3);
        break;
      case 4:
        torus(this.size, 15, 16, 3);
        break;
    }
  }
  
  update(){
    rotateY(millis() / 1000);
    this.loc = this.loc.add(this.vel); 
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