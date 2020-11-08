// http://designfever.org/generative-typography/
// https://www.creativeapplications.net/
// https://www.creativeapplications.net/processing/generative-typography-processing-tutorial/
// https://github.com/AmnonOwed/CAN_GenerativeTypography
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let pg, pg2, pg3 // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
const tiles = 20
let loopDuration = 4*20
let offset, slider

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('nationalMuseumL.otf')
}

function setup() {
  createCanvas(600, 600);
  background(0)

  slider = createSlider(0, 10, 1, 1)
  pg = createGraphics(width, height)
  pg2 = createGraphics(width, height)
  pg3 = createGraphics(width, height)

  pg.background(0)
  pg.textFont(font)
  pg.blendMode(BLEND)
  pg.textAlign(CENTER, CENTER)

  pg.textSize(501)
  pg.fill('rgba(250, 195, 33, 0.9)')
  pg.text('물', width/2, height/2)
  pg.textSize(502)
  pg.fill('rgba(235, 92, 250, 0.9)')
  pg.text('물', width/2.1, height/2)
  pg.textSize(499)
  pg.fill('rgba(67, 250, 204, 0.9)')
  pg.text('물', width/2, height/2.1)
}

function draw() {
  offset = map(slider.value(), 0, 10, 0.001, 0.01)
  let easeOffset = slider.value()

  const tileSize = width / tiles
  let currentFrame = (frameCount/50) % loopDuration
  let t = currentFrame / loopDuration
  let pos = sin(t * PI)
  let easePos = easeInOutCubic(pos)*easeOffset

  background(0)

  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {

      // const distortionX = cos(frameCount * 0.05 + x * 0.5) * 10
      // const distortionY = sin(frameCount * 0.05 + y * 0.5) * 10

      const distortionX = cos(currentFrame + x * 0.01) * tan( mouseX*0.001) * width
      const distortionY = sin(currentFrame + y * 0.01) * tan(mouseY*0.001) * height

      // const disx2 = distortionX * mouseX/10
      // const disy2 = distortionY * mouseY/10

      // x, y 값이 곧 좌표값
      // 원래 텍스트
      const sx = x*tileSize*easePos + distortionX //+ distortionX 
      const sy = y*tileSize*easePos + distortionY //+ distortionY
      const sw = tileSize + distortionX 
      const sh = tileSize + distortionY


      // pg 그래픽 레이어에 올릴 텍스트
      const dx = x*tileSize
      const dy = y*tileSize
      const dw = tileSize
      const dh = tileSize

      image(pg, dx, dy, dw, dh, sx, sy, sw, sh)
      // image(pg2, dx, dy, dw, dh, x+disx2, y+disy2, tileSize+disx2, tileSize+disy2)

      // image(pg3, dx, dy, dw, dh, sx, sy, sw, sh)


    }
  }

}

// acceleration until halfway, then deceleration
const easeInOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}