let img, tileSize
let angle = 0
let points = []
let loopDuration = 1.5 * 120
const firstArr = [0, 1, 2, 3, 4, 5, 12, 13, 14, 15, 16, 17, 24, 25, 26, 27, 28, 29, 36, 37, 38, 39, 43, 44, 45, 46, 50, 51, 52, 53, 57, 58, 59, 60, 64, 65, 66, 67]
const secondArr = [6, 7, 8, 9, 10, 11, 18, 19, 20, 21, 22, 23, 30, 31, 32, 33, 34, 35, 40, 41, 42, 47, 48, 49, 54, 55, 56, 61, 62, 63, 68, 69]

let firstInd = 0, secondInd = 0

function preload() {
  img = loadImage('ggu640.jpg')
}

function setup() {
  createCanvas(960, 960, WEBGL);
  rectMode(CENTER)

  let tiles = 30
  tileSize = width / tiles

  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      let c = img.get(x, y)
      let b = brightness(c)
      if (b > 1) {
        points.push({
          x: x,
          y: y,
          b: b
        })
      }
    }
  }
  // console.log(points)
  // colorMode(HSB)
}

function draw() {
  background(0);
  rotateX(PI/20)
  // rotateY(cos(frameCount/50*PI/6))
  rotateZ(tan(frameCount/10*PI/10))
  orbitControl()

  let count = 10
  translate(-width / 3, -height / 3)
  noStroke()

  // size
  let cf = frameCount % loopDuration
  let t = cf / loopDuration
  let u = map(t, 0, 1, 0, PI)
  
  // trying to fill individual color to make eyeroll effect
  // let randFirst = floor(map(t, 0, 1, 0, firstArr.length))
  // let randSecond = floor(map(t, 0, 1, 0, secondArr.length))
  // let randInd = floor(map(abs(cos(frameCount / 300)), 0, 1, 0, 124))
  // let randInd2 = floor(map(abs(sin(frameCount / 100)), 1, 0, 0, 124))
  
  for (let i = 0; i < count; i++) {    
    // let h1 = (300 + angle + i * offset) % 360
 
    points.forEach((p, ind) => { // ind: total 124
      // fill(255);
      let l = floor(map(sin(ind*t/20), -1, 1, 0, 360)) // swtich t, cf, u 
      let cfill = `hsl(${l}, 100%, ${50}%)`
      stroke(cfill);
      fill(0);
      
      // ((p.x < width/3) && ind < 70) && fill(255, 0, 0);
      // ((p.x >= width/3) && ind < 70 ) && fill(0, 255, 0);
      (ind===firstArr[firstInd]) && fill(255);
      // (ind+1 === firstArr[firstInd] && (firstArr.includes(ind+1)) ) && fill(255);
      
      (ind===secondArr[secondInd]) && fill(255);
      // (ind+1 === secondArr[secondInd]) && (secondArr.includes(ind+1)) && fill(255);
      // h2 = 360 - h1
      // let cstroke = `hsl(${h2}, 100%, ${50}%)`
      push()
      translate(p.x, p.y, -i * tileSize/2)
      // rotateZ(cos(frameCount / 100))
      box(tileSize * sin(i+u)*0.6)
      if (ind===firstArr[firstInd] || (ind+1 === firstArr[firstInd])) box(tileSize);
      if (ind===secondArr[secondInd] || (ind+1 === secondArr[secondInd])) box(tileSize);
      // box(tileSize * sin(u - i * 0.5 + ind * 0.01) * 0.75)
      pop()
    })

  }
}
function mouseClicked(){
  firstInd = floor(random(firstArr.length))
  secondInd = floor(random(secondArr.length)) 
}