class Mover {
  constructor(originV, destV) {
    this.v1 = originV
    this.v2 = destV
    this.gapV = {
      x: null,
      y: null
    }
    this.progressV = {
      x: null,
      y: null
    }

    this.gapV.x = (this.v2.x - this.v1.x) / 10
    this.gapV.y = (this.v2.y - this.v1.y) / 10

    this.progressV.x = this.v1.x + this.gapV.x
    this.progressV.y = this.v1.y + this.gapV.y
  }


  move() {
    stroke(255, 0, 0)
    // ellipse(this.v1.x, this.v1.y, 30, 30)
    stroke(0, 0, 255)
    // ellipse(this.v2.x, this.v2.y, 30, 30)
    fill(200)
    noStroke()
    ellipse(this.progressV.x, this.progressV.y, 10, 10)
    
    if (frameCount % 10 === 0) {
      if (round(this.progressV.x, 3) !== round(this.v2.x, 3) && round(this.progressV.y, 3) !== round(this.v2.y, 3) ) {
        this.progressV.x += this.gapV.x
        this.progressV.y += this.gapV.y
      } 
    }
  }
  
}