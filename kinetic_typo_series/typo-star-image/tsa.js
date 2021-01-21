// travelling salesperson #1 : https://www.youtube.com/watch?v=BAejnwN4Ccw

let stars = []
let stars1 = [], stars2 = [], stars3= []
totalStars = 100
let recordDistance = [], bestStars = []

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 5
let tileGap = 5
let off = 0
// let first = Math.floor(totalStars/3), second = Math.floor(totalStars/3*2), third = totalStars
let drawStart = false

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('Arita-buriM.otf')
}

function setup() {
  createCanvas(600, 600)
  background(0)
  colorMode(HSB, 100)
  particles = font.textToPoints('별', 0, 500, 600, {
    sampleFactor: 5,  //higher, the more precise
    simplifyThreshold: 0
  });

  for(let i = 0; i < 3; i++) {
    setStars(i)
  }
  for(let i = 0; i < 3; i++) {
    recordDistance.push(calcDistance(stars[i]))
    bestStars.push(stars[i].slice())
  }
  // recordDistance = calcDistance(stars)
  // bestStars = stars.slice()
}


function draw() {
  background(0, 100)
  stroke(255)
  noFill()
  if(frameCount%40==0){
    for(let i = 0; i < 3; i++) {
      setStars(i)
    }
  }

  for(let j = 0; j < 3; j++){

    beginShape()
      for(let i = 0; i < stars[j].length; i++){
        strokeWeight(1)
        stroke(12, 100, 100)
        drawStart && ellipse(stars[j][i].x, stars[j][i].y, 6, 6)
        drawStart ? strokeWeight(0.25) : strokeWeight(0.5)
        let m = map(stars[j][i].y*stars[j][i].x, 0, 1000000, 0, 360) 
        stroke(m, 80, 100)
        vertex(stars[j][i].x, stars[j][i].y)
      }
    endShape()
  }
  

  // draw recordDistance lines, points
 /**
  beginShape()
  // stroke(255, 0, 0)
  for(let i = 0; i < bestStars.length; i++){
    vertex(bestStars[i].x, bestStars[i].y)
  }
  endShape()


  let i = floor(random(stars1.length))
  let j = floor(random(stars1.length))
  swap(stars1, i, j)

  let distance = calcDistance(stars1)

  if(distance < recordDistance){
    recordDistance = distance
    // console.log(recordDistance)
    bestStars = stars1.slice()

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


// sampleFactor: 5
// ㅂ : 0, particles.length/4,
// ㄹ: particles.length/4, 2* particles.length/3
// ㅕ : 2 * particles.length/3, particles.length-25
// 나머지는 ㅂ 안의 ㅁ 구역.
function setStars(n) {

  let startInd = 0, endInd = particles.length/4
  if(n == 1){
    startInd = particles.length/4
    endInd = 2 * particles.length/3
  } else if(n == 2){
    startInd = 2 * particles.length/3
    endInd = particles.length
  }

  for (let i = 0; i < totalStars; i++){
    let ind = floor(random(startInd, endInd))  // ㅂ 좌표
    let p = particles[ind]
    let v = createVector(p.x, p.y)
    if(n == 0) stars1[i] = v
    if(n == 1) stars2[i] = v
    if(n == 2) stars3[i] = v
    // stars[i] = v;
  }
  stars.push(stars1, stars2, stars3)
}

function touchStarted(e){
  // console.log(e)
  drawStart = true
  
}
function touchEnded(){
  drawStart = false
}