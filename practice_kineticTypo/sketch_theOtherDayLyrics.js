// http://designfever.org/generative-typography/
// https://www.creativeapplications.net/
// https://www.creativeapplications.net/processing/generative-typography-processing-tutorial/
// https://github.com/AmnonOwed/CAN_GenerativeTypography
let palette = ['#0511F2', '#5E90F2', '#0477BF', '#032619', '#F2B705']

let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let pg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('Arita-buriM.otf')
}

function setup() {
  createCanvas(600, 600);
  background(0)

  pg = createGraphics(width, height)
  pg.background(0)
  pg.textFont(font)
  pg.textSize(100)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("좀 더디게 흘러", 0, 0)
  pg.text("가도 그 빛을", 0, 100)
  pg.text("기억해 기적처", 0, 200)
  pg.text("럼 이뤄질거야", 0, 300)
  pg.text("별들처럼 영원", 0, 400)
  pg.text("히 비춰줄거야", 0, 500)

  
  for (let x = 0; x < width; x += 3) {
    for (let y = 0; y < height; y += 3) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        particles.push(new Particle(x, y, 5, color(random(palette))))
      }
    }
  }
}

function draw() {
  background(1, 4, 63, 40)
  let n = 30 + floor(abs(sin(frameCount / 100)) * 5)

  for (let i = 0; i < particles.length - n; i++) {
    // stroke(255)
    // strokeWeight(0.3)
    // line(particles[i].x, particles[i].y, particles[i + n].x, particles[i + n].y)
    particles[i].display(i)
  }
}


// console.log(color(0, 0, 0, 255)._array) 
// p5.Color object 
/* {mode: "rgb", maxes: Object, _array: Array[4], levels: Array[4], constructor: Object}
  mode: "rgb"
  maxes: Object
  _array: Array[4]
  levels: Array[4]
  <constructor>: ""
  */