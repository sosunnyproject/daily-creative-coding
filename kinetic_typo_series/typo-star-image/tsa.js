// travelling salesperson #1 : https://www.youtube.com/watch?v=BAejnwN4Ccw

let stars = []
totalStars = 50
const arrNum = 40 // number of small array groups inside big 'stars' total array
let recordDistance = [], bestStars = []
let off = 0.01 //var for noise

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 5
let tileGap = 5
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

  for(let i = 0; i < arrNum; i++) {
    setStars(i)
    recordDistance.push(calcDistance(stars[i]))
    bestStars.push(stars[i].slice())
  }
  console.log(stars)
  // recordDistance = calcDistance(stars)
  // bestStars = stars.slice()
}


function draw() {
  background(0, 100)
  stroke(255)
  noFill()
  if(frameCount%20 == 0){
    for(let a = 0; a < arrNum; a++) {
      // for(let s = 0; s < totalStars; s++ ){
        setStars(a)
        // stars[a][s].x = sin(frameCount/50) * random(-2, 2) + stars[a][s].x
        // stars[a][s].y = cos(frameCount/50) * random(-2, 2) - stars[a][s].y
        // off += 0.2
      // }
    }
  }

  for(let j = 0; j < arrNum; j++){
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
 
  /*
  for(let a = 0; a < 3; a++){
    beginShape()
    // stroke(255, 0, 0)
    for(let i = 0; i < bestStars[a].length; i++){
      vertex(bestStars[a][i].x, bestStars[a][i].y)
    }
    endShape()
  }


  for(let a = 0; a < arrNum; a++){

    let i = floor(random(stars[a].length))
    let j = floor(random(stars[a].length))
    swap(stars[a], i, j)

    let distance = calcDistance(stars[a])

    if(distance < recordDistance[a]){
      recordDistance[a] = distance
      // console.log(recordDistance)
      bestStars[a] = stars[a].slice()
    }
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
  if(stars.length === arrNum){
    stars = []
  }
  /*
  let startInd = 0, endInd = particles.length/4
  if(n == 1){
    startInd = particles.length/4
    endInd = 2 * particles.length/3
  } else if(n == 2){
    startInd = 2 * particles.length/3
    endInd = particles.length
  }
  */
  const divider = (particles.length)/arrNum
  let smallStars = []
  for (let i = 0; i < totalStars; i++){
    const startInd = n * divider
    const endInd = (n+1) * divider
    let ind = floor(random(startInd, endInd))  // ㅂ 좌표
    let p = particles[ind]
    let v = createVector(p.x, p.y)
    smallStars.push(v)
    // stars[i] = v;
  }
  stars.push(smallStars)
}

function touchStarted(e){
  // console.log(e)
  drawStart = true
  
}
function touchEnded(){
  drawStart = false
}