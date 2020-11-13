// https://editor.p5js.org/sosunnyproject/sketches/wnna-FfYW

let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let particles = [], particles2 = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 4

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('Arita-buriM.otf')
}

function setup() {
  // angleMode(DEGREES)
  createCanvas(600, 600);
  background(0)

  pg = createGraphics(width, height)
  pg.background(0)
  pg.textFont(font)
  pg.textSize(100)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("ENOLA", 10, 50)


  for (let x = 0; x < width; x += tileGap) {
    for (let y = 0; y < height; y += tileGap) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        particles.push(new Particle(x, y))
      }
    }
  }
}


let arrived = 0
let newTarget = false

function draw() {
  background(1, 4, 63, 10)

  for (let i = 0; i < particles.length; i++) {
    particles[i].display()
  }
}

function mouseClicked() {

  pg.text('ALONE', 10, 150)
  
  for (let x = 0; x < width; x += tileGap) {
    for (let y = 0; y < height; y += tileGap) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        particles2.push({x: x, y: y})
      }
    }
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].changeTarget(particles2[i].x, particles2[i].y)
  }
}

/*************** Particles */
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
    this.size = random(10, 20)
  }

  changeTarget(x, y) {
    if (this.target.x === this.start.x) {
      console.log('go to letter')
      this.target = createVector(this.origin.x, this.origin.y)
    } else if (this.target.x === this.origin.x) {
      console.log('go to second Target or random')
      this.target = createVector(x  || this.start.x, y || this.start.y)
    } else {
      this.target = createVector(this.start.x, this.start.y)

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
    // particle vehicle rendering
    fill(255)
    ellipse(this.pos.x, this.pos.y, 2, 2)
  }

}