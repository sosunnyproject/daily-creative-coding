let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 1

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('BMEuljiro.ttf')
}
function setup() {
  // angleMode(DEGREES)
  createCanvas(600, 600);
  background(0)

  pg = createGraphics(width, height)
  pg.background(0)
  pg.textFont(font)
  pg.textSize(400)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("꿈", 100, 50)


}

function draw() {
  background(1, 4, 63, 50)
  noFill()
  stroke(255)

  setParticles()
  
  for (let i = 0; i < particles.length; i++) {
    let v = particles[i]
    setTimeout( drawBezier(v[0], v[1], v[2], v[3]) , 20000)
  }
}

function setParticles(){
  particles = []
  tileGap += 1
  for (let x = 0; x < width; x += tileGap ) {
    for (let y = 0; y < height; y += tileGap ) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        // particles.push(new Particle(x, y, tileSize, '#F2B705'))
        let v = setPoints(x, y, random(0.01, 0.1))
        particles.push(v)
      }
    }
  }
}

function setPoints(x, y, off) {
      let pointS = { x: x, y: y}
      let pointE = {
        x: pointS.x +  random(-25, 25),
        y: pointS.y +  sin(off)*25
      }
      // points.push(pointS)
      // points.push(pointE)

      let anchorS = {
        x: pointS.x + random(-25, 25), //(off)*25,
        y: pointS.y + random(-30, 80),
      }
      let anchorE = {
        x: pointE.x + sin(off)*25,
        y: pointE.y + sin(off)*100,
      }
      // anchors.push(anchorS)
      // anchors.push(anchorE)
  let vertices = [pointS, anchorS, anchorE, pointE]
  // console.log(vertices)

  return vertices
}

function drawBezier(pointS, anchorS, anchorE, pointE) {
  
  // anchorE = {
  //       x: pointE.x + sin(frameCount/10)*25,
  //       y: pointE.y + sin(frameCount/10)*100,
  //     }

  anchorS = {
        x: pointS.x + random(-25, 25), //(off)*25,
        y: pointS.y + random(-25, 25),
      }
  
  pointE = {
        x: pointS.x +  tan(frameCount/10)*5,
        y: pointS.y +  tan(frameCount/10)*5
      }
  
  bezier(pointS.x, pointS.y,
    anchorS.x, anchorS.y,
    anchorE.x, anchorE.y,
    pointE.x, pointE.y)
}

function mouseClicked() {
  console.log(mouseX, mouseY)

}