// http://designfever.org/generative-typography/
// https://www.creativeapplications.net/
// https://www.creativeapplications.net/processing/generative-typography-processing-tutorial/
// https://github.com/AmnonOwed/CAN_GenerativeTypography
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
const tiles = 24

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('Arita-buriM.otf')
}

function setup() {
  createCanvas(600, 600);
  background(0)

  pg = createGraphics(width, height)
  
  pg.background(0)
  pg.textFont(font)
  pg.blendMode(BLEND)
  pg.textAlign(CENTER, CENTER)
  
  pg.textSize(450)
  pg.fill('rgba(166, 128, 250, 0.9)')
  pg.text('숨', width/2, height/2)
  pg.textSize(455)
  pg.fill('rgba(110, 186, 250, 0.9)')
  pg.text('숨', width/2, height/1.9)
  pg.textSize(448)
  pg.fill('rgba(166, 186, 250, 0.9)')
  pg.text('숨', width/2, height/2.1)
}

function draw() {
  const tileSize = width / tiles
  let u = (frameCount/50) % 100

  background(0)

  const centerX = width/2 - tileSize/2
  const centerY = height/2 - tileSize/2
  
  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {

      const distortionX = cos(u + (x/tileSize) * 0.2) * 20
      const distortionY = sin(u + (y/tileSize) * 0.2) * 20

      // x, y 값이 곧 좌표값
      // 원래 텍스트
      const sx = x + distortionX
      const sy = y + distortionY
      const sw = tileSize + distortionX
      const sh = tileSize + distortionY

      // pg 그래픽 레이어에 올릴 텍스트
      const distX = x - centerX // 각 타일들이 중앙으로 모일수 있게끔.거리계산
      const distY = y - centerY
      const dx = x - sin(frameCount/100) * distX
      const dy = y - sin(frameCount/100) * distY
      const dw = tileSize
      const dh = tileSize
      
    image(pg, dx, dy, dw, dh, sx, sy, sw, sh)
      
    }
  }
  
}