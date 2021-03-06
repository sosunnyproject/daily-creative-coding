// thanks to https://editor.p5js.org/sadbot.tech/sketches/oiPfwdAbZ
// https://www.openprocessing.org/sketch/1050448

let font, currentShader
let graphic1, graphic2, graphic3, graphic4
const words = ['남자현', '박자혜', '김마리아',
  '권기옥', '최선화', '김현주',
  '김순애', '방순희', '황마리아',
  '강혜원', '이혜련', '이의순',
  '김원경', '최용신', '김활란',
  '유영준', '유각경', '최은희',
  '현신덕', '박원민', '정종명',
  '주세죽', '고순례', '김귀선',
  '김금연', '박옥련', '허정숙',
  '고명자', '천연희', '강주룡',
  '부춘화', '김옥련', '고순효',
  '김계석', '유관순', '정정화']
let ind = 3
const size = 800
const centerX = size / 2
const centerY = size / 2

function preload() {
  // font = loadFont('CookieRun.otf')
  // font = 'Goblin One' //google fonts
  font = 'Song Myung'
  currentShader = loadShader('wave.vert', 'wave.frag')
}

function setup() {
  createCanvas(12*60, 12*60, WEBGL);
  noStroke()
  translate(0, 0)

  // create graphic with text
  setGraphics('graphic1', words[0])
  setGraphics('graphic2', words[1])
  setGraphics('graphic3', words[2])

}

function draw() {
  if (frameCount % 30 === 0) {
    changeWord(ind)
    if (ind + 1 >= words.length - 2) {
      ind = 0
    } else {
      ind += 1
    }
  }
  shader(currentShader)
  let freq = map(sin(frameCount / 50), -10, 10, 0.0, 5.0)
  let amp = map(cos(frameCount / 50), 0, 1, 0.1, 0.05)
  let angle = map((frameCount / 10) % 100, 0, 100, 1, 10)
  currentShader.setUniform('frequency', mouseX / 10)
  currentShader.setUniform('amplitude', amp)
  currentShader.setUniform('speed', frameCount * 0.05)
  currentShader.setUniform('texture1', graphic1)
  currentShader.setUniform('texture2', graphic2)
  currentShader.setUniform('texture3', graphic3)
  currentShader.setUniform('u_angle', TWO_PI / angle)

  rect(0, 0, width, height);
  // setupShader(freq, amp)
}

function changeWord(i) {
  setGraphics('graphic1', words[i])
  setGraphics('graphic2', words[i + 1])
  setGraphics('graphic3', words[i + 2])
}


function setGraphics(g, word) {

  if (g == 'graphic1') {
    graphic1 = createGraphics(size, size)
    graphic1.background(0, 0, 0)
    graphic1.textFont(font)
    graphic1.textSize(size * 0.1)
    graphic1.textAlign(CENTER, CENTER)
    graphic1.fill('rgba( 138, 34, 242, 1.0)') //purple
    graphic1.text(word, centerX, centerY)
  }
  if (g == 'graphic2') {
    graphic2 = createGraphics(size, size)
    graphic2.background(0, 0, 0)
    graphic2.textFont(font)
    graphic2.textSize(size * 0.1)
    graphic2.textAlign(CENTER, CENTER)
    graphic2.fill('rgba(242, 39, 229, 1.0)') // pink
    graphic2.text(word, centerX - 25, centerY + 55)
  }
  if (g == 'graphic3') {
    graphic3 = createGraphics(size, size)
    graphic3.background(0, 0, 0)
    graphic3.textFont(font)
    graphic3.textSize(size * 0.1)
    graphic3.textAlign(CENTER, CENTER)
    graphic3.fill('rgba(141, 242, 94, 1.0)') // green
    graphic3.text(word, centerX + 15, centerY - 15)
  }
}