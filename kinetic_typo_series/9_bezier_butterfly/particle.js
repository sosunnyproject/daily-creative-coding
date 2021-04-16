// particle vehicles starting from original x, y or random x, y
// move autonomously and randomly
// arrive at the target position

class Particle {

  constructor(x, y) {
    this.origin = createVector(x, y)
    this.target = createVector(this.origin.x, this.origin.y)
    this.acc = createVector(random(0.01), random(0.01))
    this.vel = createVector(0, 0)
    this.start = createVector(random(width), random(height))
    this.pos = createVector(this.start.x, this.start.y)

    this.maxforce = 1
    this.maxspeed = 4
    this.size = random(4, 8)
  }

  changeTarget(x, y) {
    // if (this.target.x === this.start.x) {
    //   console.log('go to letter')
    //   this.target = createVector(this.origin.x, this.origin.y)
    // } else 
      if (this.target.x === this.origin.x) {
      console.log('go to second Target or random')
      this.target = createVector(x  || this.start.x, y || this.start.y)
    } else {
      this.target = createVector(this.origin.x, this.origin.y)

    }
  }

  update() {
    //update acc, vel, pos,
    this.vel.add(this.acc)
    this.pos.add(this.vel)

    this.acc.mult(0)
  }

  applyForce(force) {
    //add force to acc
    this.acc.add(force)
  }

  seek() {
    //seeking for target position
    let desired = p5.Vector.sub(this.target, this.pos)
    let d = desired.mag()
    desired.normalize()

    if (d < 100) {
      let speed = map(d, 0, 100, 0, this.maxspeed)
      desired.mult(speed)

      // 파티클 하나당 +1이 여러번되기때문에 잘 안맞음..
      // if (speed < 0.01 && (arrived <= particles.length * 2)) {
      //   arrived += 1 // arrived 는 파티클 개수만큼 + 
      // }
    } else {
      desired.mult(this.maxspeed)
      // desired.div(2) // desired velocity is equal to half of distance
      // desired.mult(0.5) // slower the vehicle, the closer to the targer
    }

    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxforce)
    this.applyForce(steer)

  }

  display() {
    this.seek()
    this.update()
    stroke((this.size*360)%360, 100, 100)
    let b =new Butterfly(this.pos.x, this.pos.y, this.size)
    b.display()
    // particle vehicle rendering
    // fill(255)
    // ellipse(this.pos.x, this.pos.y, 2, 2)
  }

}