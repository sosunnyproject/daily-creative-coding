let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let particles = [], particles2 = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 12
let tileGap = 12

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('../fontassets/BinggraeSamanco.ttf')
}

function setup() {
  // angleMode(DEGREES)
  createCanvas(900, 600);
  background(0)
  colorMode(HSB)

  pg = createGraphics(width, height)
  pg.background(0)
  pg.textFont(font)
  pg.textSize(550)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("꿈", width/2-200, 0)


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
  background(0)

  for (let i = 0; i < particles.length; i++) {
    particles[i].display()
  }
}

function mouseClicked() {

  for (let i = 0; i < particles.length; i++) {
    particles[i].changeTarget() //particles2[i].x, particles2[i].y
  }
}