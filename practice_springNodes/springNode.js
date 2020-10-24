class SpringNode {
  constructor(i, num) {
    // this.pos = createVector(random(width), random(height))
    // this.vel = createVector(0, 0)

    let angle = i * 2 * PI / num
    let cx = width * 0.5 + 300 * cos(angle)
    let cy = height * 0.5 + 300 * sin(angle)
    this.pos = createVector(cx, cy)
    this.vel = createVector(0, 0)
  }

  calculateForce(prevNode, nextNode) {
    const prevDir = createVector(prevNode.x - this.pos.x, prevNode.y - this.pos.y)
    const nextDir = createVector(nextNode.x - this.pos.x, nextNode.y - this.pos.y)

    let prevDist = prevDir.mag()
    let nextDist = nextDir.mag()

    let prevX = spring_l - prevDist
    let nextX = spring_l - nextDist

    let prevF = -prevX * constantK
    let nextF = -nextX * constantK

    prevDir.normalize()
    nextDir.normalize()

    prevDir.mult(prevF)
    nextDir.mult(nextF)

    this.vel.add(prevDir)
    this.vel.add(nextDir)

  }

  checkEdges() {
    if (dist(this.pos.x, this.pos.y, mouseX, mouseY) < 100) {
      let dir = new createVector(this.pos.x - mouseX, this.pos.y - mouseY)
      let mag = dir.mag()
      dir.setMag(10 * 10 / (0.1 + mag))
      this.vel.add(dir)
    }
    if (this.pos.x < 0) {
      this.vel.x += 10
    }
    if (this.pos.x > width) {
      this.vel.x -= 10

    }
    if (this.pos.y > height) {
      this.vel.y -= 10

    }
    if (this.pos.y < 0) {
      this.vel.y += 10

    }
  }

  update() {
    this.checkEdges()
    this.vel.limit(5)
    this.pos.add(this.vel)

  }

}