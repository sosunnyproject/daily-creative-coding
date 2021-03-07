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
  createCanvas(1080/3, 1920/3) //800
  sliderX = createSlider(0, 100, 50)
  sliderY = createSlider(0, 100, 50)  
  fontSize = round(map(width, 0, 1280, 14, 50))
  tileGap = 1 //round(map(fontSize, 10, 50, 2, 4))
  tileSize = 2 //round(map(fontSize, 10, 50, 4, 4))
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
  
  textSize(fontSize)
  // staticText()
  // movingText()
  
  stroke(`hsla(${frameCount%360}, 100%, 70%, 0.8)`)
  noFill()
  strokeWeight(3)
  drawRose()
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
  stroke(`hsla(${frameCount%360}, 80%, ${darkness}%, ${opacity})`)
  textAlign(CENTER);
  // text('March 8', startX, startY+gap)
  // text('IWD', startX, startY)
  // text('March 1', startX, startY + gap*2)
  // text('KOR Independence', startX, startY + gap*3)
  // text('Movement Day', startX,startY + gap*4)
  // text('Women Fighters', startX, startY + gap*5)

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

function drawRose() {
  // make dividend of frameCount different to see rotation movement
  translate(width/2, height/2) // center or height/3
  for (let i = 0; i < TWO_PI; i += TWO_PI/count) {
    // 하나의 원 - 다른 i 값
    // +TWO_PI / count
    rotate(TWO_PI / count * roseX) 
    
    push()
    translate(12 * TWO_PI * roseX, //roseX, roseY
              24 * TWO_PI * roseY)
    // give translate x and y different multiplier to see rotation movement more clearly
    ellipse(0, 0, 1400/count, 1400/ count)
    
    pop()
  }
}