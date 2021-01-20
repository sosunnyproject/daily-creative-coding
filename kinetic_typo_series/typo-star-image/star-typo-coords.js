let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 10
let off = 0

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
        particles.push({x: x, y: y})
      }
    }
  }
}

function draw() {
  background(1, 4, 63, 100)
  for (let i = 0; i < particles.length; i++) {
    let x = particles[i].x + noise(off)*sin(frameCount/100)*100
    let y = particles[i].y + noise(off)*cos(frameCount/100)*100
    stroke(255)
    strokeWeight(1)
    point(x, y)
    off += 20

  }
  
  off += 20
}
