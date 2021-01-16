let sparkle
let starCoords = []
let pg //text
let textCoords = []
let tileGap = 10
let font
let drawStart = false

function preload() {
  sparkle = loadImage('bigSparkle.png')
  font = loadFont('HSspringwind.ttf')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)

  // cnv.touchStarted(drawStar)
  sparkle.resize(800, 800)
  image(sparkle, 0, 0)

  for (let y = 0; y < sparkle.width; y += 15) {
    for (let x = 0; x < sparkle.height; x += 15) {
      let c = get(x, y)
      if (c[0] > 0) {
        starCoords.push({
          x: x,
          y: y - 50,
          a: c[0]
        })
      }
    }
  }

  background(0)

  pg = createGraphics(width, height)
  pg.background(0)
  pg.textFont(font)
  pg.textSize(400)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("별", 100, 50)

  for (let x = 0; x < width; x += tileGap) {
    for (let y = 0; y < height; y += tileGap) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        textCoords.push({
          x: x,
          y: y
        })
      }
    }
  }
}

function draw() {
  background(0)
  noStroke()
    
  translate(mouseX - sparkle.width/2, mouseY - sparkle.height/2 - 150)

  if(drawStart){
    
    for (let i = 0; i < starCoords.length; i++) {
      fill(242, 183, 5, starCoords[i].a)
      let x = starCoords[i].x
      let y = starCoords[i].y
      push()
      translate(x, y)
      ellipse(0, 0, random(1, 10), random(1, 10))
      pop()
    }
  }
  
  // let a = sin(frameCount % 100, frameCount % 100);
  // let n = (frameCount % 5000) / 1000
  // let v = map(n, 0, 1, 0, TWO_PI)

  // translate(width/2, height/2)
  // let motion = tan(v) * random(0, width) * noise(frameCount / 1000)
  // rotate(motion)

}

function touchStarted(e){
  // console.log(e)
  drawStart = true
  
}
function touchEnded(){
  drawStart = false
}