// travelling salesperson #1 : https://www.youtube.com/watch?v=BAejnwN4Ccw

let stars = []
totalStars = 200
let recordDistance, bestStars

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 5
let tileGap = 5
let off = 0
// let first = Math.floor(totalStars/3), second = Math.floor(totalStars/3*2), third = totalStars

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('Arita-buriM.otf')
}

function setup() {
  createCanvas(600, 600)
  // angleMode(DEGREES)
   background(0)
 
   pg = createGraphics(width, height)
   pg.background(0)
   pg.textFont(font)
   pg.textSize(400)
   pg.fill(255)
   pg.textAlign(LEFT, TOP)
   pg.text("별", 100, 50)
 
   
   for (let x = 0; x < width; x += tileGap ) {
     for (let y = 0; y < height; y += tileGap ) {
       let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
       if (isTEXT) {
         particles.push({x: x, y: y})
       }
     }
   }
  setStars()
  recordDistance = calcDistance(stars)
  bestStars = stars.slice()
}


function draw() {
  background(0)
  stroke(255)
  noFill()
  if(frameCount%20==0){
    setStars()
  }

  beginShape()
  for(let i = 0; i < stars.length; i++){
    ellipse(stars[i].x, stars[i].y, 6, 6)
    strokeWeight(0.4)
    vertex(stars[i].x, stars[i].y)
  }
  endShape()

  // draw recordDistance lines, points
  /**
  beginShape()
  stroke(255, 0, 0)
  for(let i = 0; i < bestStars.length; i++){
    vertex(bestStars[i].x, bestStars[i].y)
  }
  endShape()


  let i = floor(random(stars.length))
  let j = floor(random(stars.length))
  swap(stars, i, j)

  let distance = calcDistance(stars)
  if(distance < recordDistance){
    recordDistance = distance
    console.log(recordDistance)
    bestStars = stars.slice()

  }
   */
}

// swap array's element i and element j
function swap(arr, i, j){  
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// input: array
// output: calcuate distance over the elements in array
function calcDistance(arr){
  let sum = 0
  for(let i = 0; i < arr.length - 1; i++){
    let d = dist(arr[i].x, arr[i].y,
                arr[i+1].x, arr[i+1].y)
    sum += d
  }
  return sum
}


function setStars() {
  for (let i = 0; i < totalStars; i++){
    let ind = floor(random(0, particles.length/3))  // ㅂ 좌표
    // console.log(particles.length, ind)
    let p = particles[ind]
    let v = createVector(p.x, p.y)
    stars[i] = v;
  }
}