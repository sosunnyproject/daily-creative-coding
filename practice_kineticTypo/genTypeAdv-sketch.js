// http://designfever.org/generative-typography/
// https://www.creativeapplications.net/
// https://www.creativeapplications.net/processing/generative-typography-processing-tutorial/
// https://github.com/AmnonOwed/CAN_GenerativeTypography
let palette = ['#040FD9', '#040DBF', '#020873', '#010440', '#F2E74B']

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
  pg.textSize(80)
  pg.fill(255)
  pg.textAlign(CENTER, CENTER)
  pg.text("내 삶 속에서", width/2, height/2)
  // image(pg, 0, 0)

  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
      if (isTEXT) {
        particles.push(new Particle(x, y, 3, color(random(palette))))
      }
    }
  }
}

function draw() {
  background(1, 4, 63, 10)
  for(let i = 0; i < particles.length; i++){
    particles[i].display()
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