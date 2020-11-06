// https://editor.p5js.org/sosunnyproject/sketches/wiWdvbjlx
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
const tiles = 40
let direction = false // true: vertical, false: horizontal

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('Arita-buriM.otf')
}

function setup() {
  createCanvas(400, 400);
  background(0)

  pg = createGraphics(width, height)

  pg.background(0)
  pg.textFont(font)
  pg.blendMode(BLEND)
  pg.textAlign(CENTER, CENTER)

  pg.textSize(300)
  pg.fill('rgba(166, 128, 250, 0.9)')
  pg.text('창', width / 2.1, height / 2.1)
  pg.textSize(300)
  pg.fill('rgba(110, 186, 250, 0.9)')
  pg.text('창', width / 2, height / 2.4)
  pg.textSize(300)
  pg.fill('rgba(166, 186, 250, 0.9)')
  pg.text('창', width / 2, height / 2.2)
}

function draw() {
  const tileSize = width / tiles
  let u = (frameCount / 20) % 100

  background(0)

  const centerX = width / 2 - tileSize
  const centerY = height / 2 - tileSize

  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {

      const distortionX = cos(u + (x * tileSize)) * 10
      const distortionY = sin(u + (y * tileSize)) * 10

      // x, y 값이 곧 좌표값
      // 원래 텍스트
      const sx = x * tileSize
      const sy = y * tileSize
      const sw = tileSize
      const sh = tileSize

      // pg 그래픽 레이어에 올릴 텍스트
      let distX = x * tileSize - centerX // 각 타일들이 중앙으로 모일수 있게끔.거리계산
      let distY = (y * tileSize - centerY)

      // if (direction) {
      //   distY = 1
      // } else {
      //   distX = 1
      // }

      const dx = x * tileSize - tan(frameCount / 50) * distX // left right
      const dy = y * tileSize - tan(frameCount / 50) * distX // up down
      const dist = 0

      if (dy < 0) { // went vertical
        direction = false // go hzn next time
      } else if (dx < 0) { // went hzn
        direction = true // go vertical next time
        
      }

      const dw = tileSize + distortionX
      const dh = tileSize + distortionY

      image(pg, dx, dy, dw, dh, sx, sy, sw, sh)

    }
  }

}