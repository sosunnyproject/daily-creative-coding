class Ball {
  constructor(){
    this.loc = createVector(100, 0, 100);  
    this.vel = createVector(random(3, 5), random(-1, -3), random(-1, -5));
    this.col = random(0, 360);
    this.size = random(10, 40);
  }
  
  display(){
    // strokeWeight(0.3);
    noStroke();
    colorMode(HSB);
    ambientMaterial(255);
    // fill(this.col, 60, 100);
    sphere(this.size);
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