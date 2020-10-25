let graphic
let font
let canvas
let tilesX = 48, tilesY = 48

function preload() {
  font = loadFont('Arita-buriSB.otf')
}

function setup() {
  createCanvas(480, 480)
  background(0)
  graphic = createGraphics(width, height)
    // create offscreen graphics buffer
  // 기본 텍스트 세팅
  graphic.fill(255, 0, 0)
  graphic.textFont(font)
  graphic.textSize(100)  
  // 텍스트 위치
  graphic.background(0, 40) // or background(0) inside draw()
  
  graphic.textAlign(CENTER, CENTER);
  graphic.text("원", width/2, height/2 - 50); 
}

const loopDuration = 60

function draw(){
  let currentFrame = frameCount % loopDuration
  let t = currentFrame / loopDuration
  let u = map(t, 0, 1, 0, 2 * PI)
  
  // let tileW = width/tilesX
  // let tileH = height/tilesY
  let tileSize =width/tilesX
  
  for(let y=0; y < tilesY; y++){
    for(let x=0; x< tilesX; x++){
      
      const distort = cos(u + (x*y)* 0.25) * 5
      
      // x, y draw circle
      let wave = 100 * sin(frameCount*0.05) 
      let wave2 = 100 * cos(frameCount*0.05)

      //source
      const sx = x * tileSize + distort
      const sy = y * tileSize  + distort
      const sw = tileSize
      const sh = tileSize
      
      // destination
      const dx = x * tileSize 
      const dy = y * tileSize
      const dw = tileSize
      const dh = tileSize
      
      image(graphic, dx, dy, dw, dh, sx, sy, sw, sh)
      
    }
  }
   
}