class Particle {
  constructor(x, y, size, color) {
    this.x = x // 타겟 위치
    this.y = y
    this.size = size
    this.color = color
    this.pos = createVector(x, random(-30, -10)) // 시작 위치
    this.vel = createVector(0, 0.1)
    this.acc = createVector(0, random(0, 1))
  }

  update() {
    
    const roundPosY = Math.round(this.pos.y/100) * 100

  }

  display(ind) {
    let n = (frameCount % 100) / 100
    let v = map(n, 0, 1, 0, PI)
    let motion = tan(v) * ind * 0.1
    
    let col = this.color
    let size = sin((motion+0.5)) * this.size

    fill(col)
    noStroke()
    rect(this.x + motion, this.y, size, size)
    // ellipse(tempX, tempY, this.size/2, this.size/2)
  }
  
  kill(){
    
  }
}