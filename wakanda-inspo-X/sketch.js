let gap = 20
let n = 20

function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0, 30);
  
  let xSize = map(cos(frameCount/10), 1, -1, 0.1, 1)
  let ySize = map(cos(frameCount/10), 1, -1, 20, 0.1)
  
  let movingSpeed = sin(frameCount*10)
  
 for (let i = 0; i < width; i += gap) {
    fill(255)
    noStroke()
    // rect(-50 + i * movingSpeed, 30 + i * movingSpeed, xSize, ySize)
    // rect(-30 + i * movingSpeed, -20+i * movingSpeed,  xSize*1.5, ySize)
    // rect(-10 + i * movingSpeed, -70 + i * movingSpeed,  xSize*2, ySize)

    rect(-50 + i*movingSpeed, -50 + height-i*n*movingSpeed, ySize*2, xSize*2)
    rect(-30 + i*movingSpeed, -10 +height-i*movingSpeed, ySize)
    rect(-10 + i*n*movingSpeed, 60 + height-i*movingSpeed, xSize*2, ySize*2)
    
  }
  
  for (let i = 0; i < width; i += gap) {
    fill(255)
    noStroke()
    rect(width-(50+i * n* movingSpeed), height- (-30 + i * movingSpeed), ySize*2, xSize*2)
    rect(width-(30+i * movingSpeed), height- (20 + i * movingSpeed),  ySize)
    rect(width-(10+i * movingSpeed), height- (70+ i * n*  movingSpeed),  xSize*2, ySize*2)
    
  }

  if (n === 0) n = 10

  if (frameCount % 10 === 0) {
    n--
  }

}