// https://editor.p5js.org/sosunnyproject/sketches/wiWdvbjlx
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let pg, pg2, pg3 // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
const tiles = 30
let direction = false // true: vertical, false: horizontal

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('nationalMuseumL.otf')
}

function setup() {
  createCanvas(600, 600);
  background(0)

  pg = createGraphics(width, 150)
  pg2 = createGraphics(width, 150)
  pg3 = createGraphics(width, 150)
  pg4 = createGraphics(width, 150)

  pg.background(0)
  pg.textFont(font)
  pg.blendMode(BLEND)
  pg.textAlign(LEFT, TOP)

  pg.textSize(100)
  pg.fill('rgba(166, 128, 250, 0.9)')
  pg.text('침대밑에', 10, 0)

  pg2.background(0)
  pg2.textFont(font)
  pg2.blendMode(BLEND)
  pg2.textAlign(LEFT, TOP)
  
  pg2.textSize(100)
  pg2.fill('rgba(126, 128, 250, 0.9)')
  pg2.text('놓아둔', 10, 0)

  pg3.background(0)
  pg3.textFont(font)
  pg3.blendMode(BLEND)
  pg3.textAlign(LEFT, TOP)

  pg3.textSize(100)
  pg3.fill('rgba(166, 128, 250, 0.9)')
  pg3.text('지난밤에', 10, 0)

  pg4.background(0)
  pg4.textFont(font)
  pg4.blendMode(BLEND)
  pg4.textAlign(LEFT, TOP)
  pg4.textSize(100)
  pg4.fill('rgba(126, 128, 250, 0.9)')
  pg4.text('꾼꿈이', 10, 0)
}

function draw() {
  const tileSize = width / tiles
  let u = (frameCount / 20) % 100

  background(0)

  const centerX = width / 2 - tileSize
  const centerY = 150 / 2 - tileSize

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

      const dx = x * tileSize - sin(frameCount / 30)  // left right
      const dy = y * tileSize - sin(frameCount / 30) * distY/2// up down

      const dx2 = x * tileSize + sin(frameCount / 30)  // left right
      const dy2 = y * tileSize + sin(frameCount / 30) * distY/2// up down


      if (dy < 0) { // went vertical
        direction = false // go hzn next time
      } else if (dx < 0) { // went hzn
        direction = true // go vertical next time
        
      }

      const dw = tileSize + distortionX
      const dh = tileSize + distortionY

      image(pg, dx, dy, dw, dh, sx, sy, sw, sh)
      image(pg2, dx2, 150+dy2, dw, dh, sx, sy, sw, sh)
      image(pg3, dx, 300+dy, dw, dh, sx, sy, sw, sh)
      image(pg4, dx2, 450+dy2, dw, dh, sx, sy, sw, sh)
    }
  }

}