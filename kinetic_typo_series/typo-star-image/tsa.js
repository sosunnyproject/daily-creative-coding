// travelling salesperson #1 : https://www.youtube.com/watch?v=BAejnwN4Ccw

let stars = []
totalStars = 10
let arrNum = 20 // number of small array groups inside big 'stars' total array
let recordDistance = [], bestStars = []
let off = 0.01 //var for noise
let randOffs = []


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
  createCanvas(800, 800)
  background(0)
  colorMode(HSB, 100)
  particles = font.textToPoints('별', 0, width-150, width-150, {
    sampleFactor: 5,  //higher, the more precise
    simplifyThreshold: 0
  });
  // for(let i = 0; i < arrNum; i++) {
  //   randOffs.push(random(-20, 20))
  // }
  for(let i = 0; i < arrNum; i++) {
    setStars(i)
    recordDistance.push(calcDistance(stars[i]))
    bestStars.push(stars[i].slice())
  }
  // recordDistance = calcDistance(stars)
  // bestStars = stars.slice()
}


function draw() {
  background(0, 40)
  stroke(255)
  noFill()
  translate(80,0)
  frameRate(7)
  // if(frameCount%2 == 0){
  // if(randOffs.length > arrNum){
  //   randOffs = []
  // }
  // for(let i = 0; i < arrNum; i++) {
  //   randOffs.push(random(-20, 20))
  // }
  for(let a = 0; a < arrNum; a++) {
    // for(let s = 0; s < totalStars; s++ ){
      setStars(a)
      // stars[a][s].x = sin(frameCount/50) * random(-2, 2) + stars[a][s].x
      // stars[a][s].y = cos(frameCount/50) * random(-2, 2) - stars[a][s].y
      // off += 0.2
    // }
  }
  // }
  for(let j = 0; j < arrNum; j++){
    if(stars.length > j) {
      for(let i = 0; i < stars[j].length; i++){
        stroke(12, 100, 100)
        // 터치하면, 터치된 영역 근처만 별이 반짝거리도록.
        if(drawStart) { 
          let currentStar = stars[j][i]
          if((mouseX-100 < currentStar.x) && (currentStar.x < mouseX+100)){
            if((mouseY-100 < currentStar.y) && (currentStar.y < mouseY+100)){
              ellipse(stars[j][i].x, stars[j][i].y, random(7, 15))
            } else {
              stroke(0)
            }
          } else {
            stroke(0)
          }
        }
      }
      if(stars[j].length >0) drawDistance(stars[j])
    }
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

function drawDistance(arr){
  for (let i = 0; i < arr.length/2; i++) {
    let a = random(arr)
    let b = random(arr)
    const curr = arr[i]
    while(dist(curr.x, curr.y, b.x, b.y) > 50){
      b = random(arr)
    }
    strokeWeight(3)
    // line(dots[i].x, dots[i].y, a.x, a.y)
    line(curr.x, curr.y, b.x, b.y)
  }
}

// sampleFactor: 5
// ㅂ : 0, particles.length/4,
// ㄹ: particles.length/4, 2* particles.length/3
// ㅕ : 2 * particles.length/3, particles.length-25
// 나머지는 ㅂ 안의 ㅁ 구역.
function setStars(n) {
  arrNum = floor(map(mouseX, 0, width, 5, 30))
  totalStars = floor(map(mouseY, 0, height, 5, 20))
  if(stars.length >= 100){
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
    let x = p.x + (random(-10, 20) * sin(frameCount/10))
    let y = p.y + (random(-20, 10) )
    off += 10 

    let v = createVector(x, y)
    smallStars.push(v)
    // stars[i] = v;
  }
  stars.push(smallStars)
}

function touchStarted(e){
  // console.log(e)
  drawStart = true
  e.preventDefault();
  
}
function touchEnded(){
  drawStart = false
}