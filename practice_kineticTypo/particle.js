// with pos, vel data
class Particle {
  constructor(x, y, size, color) {
    this.x = x // 타겟 위치
    this.y = y
    this.size = size
    this.color = color
    this.pos = createVector(this.x, random(-50, -10)) // 시작 위치
    this.vel = createVector(0, 0.01)
    this.acc = createVector(0, random(0, 0.1))
  }

  update() {

    if (Math.floor(this.pos.y) === this.y ) {
      this.vel.x = 0
      this.vel.y = 0
      this.acc.x = 0
      this.acc.y = 0
    } else {
      this.vel.add(this.acc)
      this.pos.add(this.vel)
    }
  }

  display() {
    let n = sin(frameCount / 40) * width

    // this.size = 1+ sin(1 / dist(moveX, moveY, this.x, this.y)) * 5
    let col = this.color
    // col.setAlpha(map(this.vel.y, 0, 20, 255, 150))

    fill(col)
    noStroke()
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    // ellipse(tempX, tempY, this.size/2, this.size/2)
  }
}
