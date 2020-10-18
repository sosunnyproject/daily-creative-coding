class Particle{
  constructor(x, y, size, color){
    this.x = x
    this.y = y
    this.size = size
    this.color = color
  }
  
  display(){ 
    fill(this.color)
    noStroke()
    this.x += this.y/10 * sin(frameCount/10)*0.1
    this.y += this.x * sin(frameCount/10)*0.05
    ellipse(this.x, this.y, this.size, this.size)
  }
}