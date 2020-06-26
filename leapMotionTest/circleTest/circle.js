class Circle {
  constructor(x, y, radius ) {
    this.pos = createVector(x, y);
    this.radius = radius
    // this.speed = speed
  }

  singleEllipse(x, y, speed){
    ellipse(x, y, sin(frameCount*speed)*this.radius, sin(frameCount*speed)*this.radius)
  }
  
  rippleEllipse() {
    for (let i = 0; i < 0.01; i += 0.001) {
    ellipse(this.pos.x, this.pos.y, sin(frameCount*i)*200, sin(frameCount*i)*200)
    }
  }
  
  multipleEllipse() {
    stroke(255,128,0);
    for (let i = 0; i < width; i += 10) {
      ellipse(this.pos.x, this.pos.y, 
              sin(frameCount*speedVal)*i, sin(frameCount*speedVal)*i)
  
      // ellipse(this.pos.x, this.pos.y, (30 + i), (30 + i))
    }
  }

}