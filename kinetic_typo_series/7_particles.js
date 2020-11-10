// http://designfever.org/generative-typography/
// https://www.creativeapplications.net/
// https://www.creativeapplications.net/processing/generative-typography-processing-tutorial/
// https://github.com/AmnonOwed/CAN_GenerativeTypography
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 10

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
  pg.textSize(400)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("별", 100, 50)

  
  for (let x = 0; x < width; x += tileGap ) {
    for (let y = 0; y < height; y += tileGap ) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        particles.push(new Particle(x, y, tileSize, '#F2B705'))
      }
    }
  }
}

function draw() {
  background(1, 4, 63, 40)

  for (let i = 0; i < particles.length; i++) {
    particles[i].display(i)
  }
}

class Particle {
  constructor(x, y, size, color) {
    this.x = x // 타겟 위치
    this.y = y
    this.size = size
    this.color = color
    this.pos = createVector(random(-30, -10), random(-30, -10)) // 시작 위치
    this.vel = createVector(0, 0.1)
    this.acc = createVector(0, random(0, 1))
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)

    this.vel.mult(0.1)
  }

  display(ind) {
    // this.update()
    let n = (frameCount % 5000) / 1000
    let v = map(n, 0, 1, 0, TWO_PI)

    let motion = tan(v) * random(ind, width) * noise(frameCount / 1000)

    let col = this.color
    let size = sin(v) * this.size

    fill(col)
    noStroke()
    let a = atan2(mouseX - width / 2, mouseY - height / 2);

    push()
    translate(this.x, this.y)
    rotate(a)
    rect(motion, 0, size, size)
    pop()
  }

}