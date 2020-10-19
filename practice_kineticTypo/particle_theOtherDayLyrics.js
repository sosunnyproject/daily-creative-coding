class Particle {
  constructor(x, y, size, color) {
    this.x = x // 본래 위치
    this.y = y
    this.size = size
    this.color = color
  }

  display(ind) {
    let n = sin(frameCount/40) * width
    
    /* 1st
    
    let moveX = this.x // 움직인 위치
    let moveY = this.y
    //https://p5js.org/ko/reference/#/p5/dist
    // while (dist(tempX, tempY, this.x, this.y) > 10) {
    //   tempX = moveX + random(-3, 3)
    //   tempY = moveY + random(-3, 3)
    // }
    */

    let moveX = this.x + cos(frameCount * 0.1 + this.x * this.y * 0.01) * 5
    let moveY = this.y + cos(frameCount * 0.1 + this.y * -0.01) * 5

    let tempX = moveX + random(n, -1 * n)
    let tempY = moveY + random(n, -1 * n)

    this.size = 1+ sin(1 / dist(moveX, moveY, this.x, this.y)) * 5

    fill(this.color)
    noStroke()
    ellipse(moveX, moveY, this.size, this.size)
    // ellipse(tempX, tempY, this.size/2, this.size/2)
  }
}