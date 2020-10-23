class Particle {
  constructor(x, y, size, color) {
    this.x = x // 본래 위치
    this.y = y
    this.size = size
    this.color = color
  }

  display() {
    /* 1st
    let n = sin(frameCount/40) * width
    
    let moveX = this.x // 움직인 위치
    let moveY = this.y

    let tempX = moveX + random(-1*n, n)
    let tempY = moveY + random(-1*n, n)

    //https://p5js.org/ko/reference/#/p5/dist
    // while (dist(tempX, tempY, this.x, this.y) > 10) {
    //   tempX = moveX + random(-3, 3)
    //   tempY = moveY + random(-3, 3)
    // }
    */

    
    let moveX = this.x + sin(frameCount*0.1 + this.x*this.y*0.01) * 5
    let moveY = this.y + cos(frameCount*0.1 + this.y*0.01) * 5
    
    this.size = sin(1/dist(moveX, moveY, this.x, this.y)) * 5

    
    fill(this.color)
    noStroke()
    ellipse(moveX, moveY, this.size, this.size)
  }
}