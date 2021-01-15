// particle vehicles starting from original x, y or random x, y
// move autonomously and randomly
// arrive at the target position

class Mover {

  constructor(origin, target) {
    this.origin = createVector(origin.x, origin.y)
    this.target = createVector(target.x, target.y)
    this.acc = createVector(0.01, 0.01)
    this.vel = createVector(0, 0)
    this.pos = createVector(origin.x, origin.y)
    this.goal = createVector(target.x, target.y)

    this.maxforce = 1
    this.maxspeed = 4
    this.size = random(14, 20)
  }

  changeTarget() {
  //   if (len === 0) {
  //     this.goal = createVector(this.target.x, this.target.y)
  //   } else if ((points.length - 10 < len) && (len <= points.length)) {
  //     this.goal = createVector(this.origin.x, this.origin.y)
  //   }
  }

  update() {
    //update acc, vel, pos,
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
    
    if ( (int(this.pos.x) === int(this.origin.x)) && (int(this.pos.y) === int(this.origin.y)) ) {
      // len--
    } else if(int(this.pos.x) === int(this.target.x) && int(this.pos.y) === int(this.target.y)) {
      // len++
    }
  }

  applyForce(force) {
    //add force to acc
    this.acc.add(force)
  }

  seek() {
    //seeking for target position
    let desired = p5.Vector.sub(this.goal, this.pos)
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
    this.seek(this.goal)
    this.update()
    // this.changeTarget()

    // stroke((this.size*360)%360, 60, 100)
    noStroke()
    fill(0, 255, 0)
    ellipse(this.pos.x, this.pos.y, 5, 5)
  }

}