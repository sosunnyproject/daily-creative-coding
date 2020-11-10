// http://designfever.org/generative-typography/
// https://www.creativeapplications.net/
// https://www.creativeapplications.net/processing/generative-typography-processing-tutorial/
// https://github.com/AmnonOwed/CAN_GenerativeTypography
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let pg, pg2, pg3 // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
const tiles = 12

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('nationalMuseumL.otf')
}

function setup() {
  createCanvas(600, 600);
  background(0)
  // blendMode(SCREEN)
  
  pg = createGraphics(width, height)
  pg2 = createGraphics(width, height)
  pg3 = createGraphics(width, height)

  pg.background(0)
  pg.textFont(font)
  pg.blendMode(SCREEN)
  pg.textAlign(LEFT, TOP)

  pg.textSize(450)
  pg.fill('rgba(255, 0, 0, 0.9)')
  pg.text('물', 30, 30)
  pg.textSize(455)
  pg.fill('rgba(0, 255, 0, 0.9)')
  pg.text('물', 30, 30)
  pg.textSize(448)
  pg.fill('rgba(0, 0, 255, 0.9)')
  pg.text('물', 30, 30)
}

function draw() {
  const tileSize = width / tiles
  let u = (frameCount / 50) % 100

  background(0)

  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {

      // const distortionX = cos(frameCount * 0.05 + x * 0.5) * 10
      // const distortionY = sin(frameCount * 0.05 + y * 0.5) * 10
      
      const distortionX = cos(u + (x / tileSize) * 0.1) * 20 * sin(mouseX)*10
      const distortionY = sin(u + (y / tileSize) * 0.1) * 20 * sin(mouseY)*10

      // const disx2 = distortionX * mouseX/10
      // const disy2 = distortionY * mouseY/10
      
      // x, y 값이 곧 좌표값
      // 원래 텍스트
      const sx = x + distortionX
      const sy = y + distortionY
      const sw = tileSize + distortionX
      const sh = tileSize + distortionY
      

      // pg 그래픽 레이어에 올릴 텍스트
      const dx = x
      const dy = y
      const dw = tileSize
      const dh = tileSize

      image(pg, dx, dy, dw, dh, sx, sy, sw, sh)
      // image(pg2, dx, dy, dw, dh, x+disx2, y+disy2, tileSize+disx2, tileSize+disy2)

      // image(pg3, dx, dy, dw, dh, sx, sy, sw, sh)


    }
  }

}