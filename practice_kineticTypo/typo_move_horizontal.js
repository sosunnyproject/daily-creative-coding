let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
const tiles = 50
const loopDuration = 4 * 60
let fonts
let index = 0

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  const Arita = loadFont('Arita-buriM.otf')
  const Jua = loadFont('Jua-Regular.ttf')
  const Song = loadFont('SongMyung-Regular.ttf')
  const East = loadFont('EastSeaDokdo-Regular.ttf')
  const Nanum = loadFont('NanumPenScript-Regular.ttf')
  fonts = [Arita, Jua, Song, East, Nanum]
  
}


function setup() {
  createCanvas(500, 500);

  pg = createGraphics(width, height)
  pg.textFont(fonts[0])
  // pg.textSize(302)
  // pg.fill('rgba(110, 186, 250, 0.9)')
  // pg.text('가', width/2, height/1.9)
  // pg.textSize(299)
  // pg.fill('rgba(166, 186, 250, 0.9)')
  // pg.text('가', width/2, height/2.1)
}

function textGraphic(){
  pg.background(0)
  pg.blendMode(BLEND)
  pg.textAlign(CENTER, CENTER)
  
  pg.textSize(400)
  
  pg.fill('rgba(166, 128, 250, 0.9)')
  pg.text('가', width/2, height/2)
}
function draw() {
  const tileSize = width / tiles
  let t = (frameCount%loopDuration)/loopDuration
  let u = easeInOutQuad(t)
  let v = map(u, 0, 1, 0, PI)

  textGraphic()
  background(0)

  // pg.textFont('East Sea Dokdo')
  // pg.textFont('Jua')
  
  const centerX = width/2 - tileSize/2
  const centerY = height/2 - tileSize/2
  
  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {

      const distortionX = cos(u + (x) * 0.2) * 20
      const distortionY = sin(u + (y) * 0.2) * 20
      
      // x, y 값이 곧 좌표값
      // 원래 텍스트
      const sx = x*tileSize + distortionX
      const sy = y*tileSize + distortionY
      const sw = tileSize 
      const sh = tileSize 
      
      const mapX = map(x, 0, tiles, 10, 100)
      const mapY = map(y, 0, tiles, 1, 10)
      
      // pg 그래픽 레이어에 올릴 텍스트
      const dx = x*tileSize + tan(v) * mapX * y
      const dy = y*tileSize
      const dw = tileSize
      const dh = tileSize
      
      
    image(pg, dx, dy, dw, dh, sx, sy, sw, sh)
      
    }
  }
  
}
function mouseClicked(){
  if(index === fonts.length-1){
   index = 0
  } else {
    index++
  }
  pg.textFont(fonts[index])
  
}
// acceleration until halfway, then deceleration
const easeInOutQuad = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}