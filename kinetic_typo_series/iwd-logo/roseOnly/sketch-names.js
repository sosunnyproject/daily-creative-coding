// https://editor.p5js.org/sosunnyproject/sketches/3FFUdobSp
// iwd logo - rose
let fontSize = 50
let count = 12
let speedX, speedY, speed
let sliderX, roseX, sliderY, roseY
let darkness, opacity
// korean women fighter names
let pg, font
let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let tileSize = 6
let tileGap = 4
let doChange = false

function setup() {
  createCanvas(1280, 720) //800
  sliderX = createSlider(0, 100, 50)
  sliderY = createSlider(0, 100, 50)  
  fontSize = round(map(width, 0, 1280, 12, 50))
  tileGap = 2 //round(map(fontSize, 10, 50, 2, 4))
  tileSize = 2 //round(map(fontSize, 10, 50, 2, 4))
  // women freedom fighters names
  pg = createGraphics(width, height)
  pg.background(0)
  pg.textSize(fontSize)
  pg.textFont('Song Myung')
  pg.fill(255)
  pg.textAlign(CENTER, CENTER)
  const xPos = width/2
  const yPos = height/6
  const yGap = fontSize+10
  pg.text('남자현 박자혜 김마리아 부춘화', xPos, yPos)
  pg.text('권기옥 최선화 김현주 고순효', xPos, yPos+yGap)
  pg.text('김금연 박옥련 허정숙 김계석', xPos, yPos+yGap*2)
  pg.text('고명자 천연희 강주룡 정정화', xPos, yPos+yGap*3)
  
  for (let x = 0; x < width; x += tileGap) {
    for (let y = 0; y < height; y += tileGap) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        // particles.push(new Particle(x, y))
      }}}
}

function draw() {
  background(0, 20);
  speed = frameCount/40
  speedX = map(sin(frameCount / 20), -1, 1, 0, 7)
  speedY = map(sin(frameCount / 10), -1, 1, 0, 7)
  roseX = map(sliderX.value(), 0, 100, 0.1, 1.0)
  roseY = map(sliderY.value(), 0, 100, 0.1, 1.0)
  darkness= map(speedX, 0, 7, 80, 0)
  opacity = map(speedX, 0, 7, 1.0, 0.0)
  
  findChangeTime()
  textSize(fontSize)
  staticText()
  // movingText()
  
  stroke(`hsla(${frameCount%360}, 100%, 80%, 0.2)`)
  noFill()
  strokeWeight(3)
  drawRose()
  // drawTypo()
}

function drawTypo() {
  for (let i = 0; i < particles.length; i++) {
    noFill()
    strokeWeight(0.8)
    particles[i].display()
  }
}
function staticText() {
  const startX = width/2 - fontSize
  const startY = height/3*2-30
  const gap = fontSize
  // let frameY = 500 + sin(speed)*height/3

  let lightness = 70 + sin(frameCount/30) * 30
  textSize(fontSize)

  // same text in a row
  noFill()
  stroke(`hsla(${frameCount%360}, 100%, ${darkness}%, ${opacity})`)
  textAlign(CENTER);

  for(let yPos=height/2; yPos < height; yPos+= fontSize){
    let darker = map(yPos, height/2, height, 4, 1)
    stroke(`hsla(${frameCount%360}, 80%, ${darkness/darker}%, ${opacity})`)

    strokeWeight(2)
    textAlign(CENTER);

    text('I', startX, yPos)
    text('W', startX+fontSize, yPos)
    text('D', startX+fontSize*2, yPos)
  }

}

function drawRose() {
  translate(width/2, height/3)
  for (let i = 0; i < TWO_PI; i += TWO_PI/count) {
    rotate(TWO_PI / count) 
    push()
    translate(9 * TWO_PI * speedX,
              4 * TWO_PI * speedY)
    ellipse(0, 0, 1400/count, 1400/ count)
    pop()
  }
}

function findChangeTime() {
   if(round(opacity) > 0.7) {
    if(doChange && round(opacity) > 0.7) {
       // do nothing
    } else {
      doChange = true
    }
  }
  
  if(round(opacity) < 0.3) {
    if(!doChange && round(opacity) < 0.3) {
       // do nothing
    } else {
      doChange = false
    }
  }
  
  if(doChange){
    changeText()
  }
  

}
// change text particles
function changeText() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].changeTarget()
  }
}

function movingText() {
  let posY = 0
  let frameY = 500 + sin(speed)*height/3
  let frameX = width/2 + sin(speed)*width/2
  
  const startX = width/2-50
  const xGap = fontSize-10
  text('I', startX, frameY)
  text('W', startX+xGap-10, frameY)
  text('D', startX+xGap*2, frameY)

  const startY = height/3*2
  const yGap = fontSize-5
  text('2', frameX, startY+yGap)
  text('0', frameX, startY+yGap*2)
  text('2', frameX, startY+yGap*3)
  text('1', frameX, startY+yGap*4)
}
  // text('March 8', startX, startY+gap)
  // text('IWD', startX, startY)
  // text('March 1', startX, startY + gap*2)
  // text('KOR Independence', startX, startY + gap*3)
  // text('Movement Day', startX,startY + gap*4)
// text('Women Fighters', startX, startY + gap*5)