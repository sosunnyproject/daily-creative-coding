class Particle {
  constructor(x, y, size, color) {
    this.x = x // 본래 위치
    this.y = y
    this.size = size
    this.color = color
  }

  display(ind, size) {
    let n = sin(frameCount/20) * width
    
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

    let scatterSize = 1 + sin(1 / dist(moveX, moveY, this.x, this.y)) * 5
    let letterSize = size - sin(1 / dist(moveX, moveY, this.x, this.y)) * 5

    let letterCol = this.color
    letterCol.setAlpha(128 + 128 * sin(millis() / 1000))
    fill(letterCol)
    noStroke()
    ellipse(moveX, moveY, letterSize, letterSize)
    ellipse(tempX, tempY, scatterSize/2, scatterSize/2)  // 주변 흩뿌리는 파티클 효과
  }
}
