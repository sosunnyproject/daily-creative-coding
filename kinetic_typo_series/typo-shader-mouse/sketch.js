// thanks to https://editor.p5js.org/sadbot.tech/sketches/oiPfwdAbZ
// https://www.openprocessing.org/sketch/1050448
// mouse interactive variation of https://editor.p5js.org/sosunnyproject/sketches/st0EQxw31

let font, currentShader;
let graphic1, graphic2, graphic3, graphic4;
const words = ['서', '울']
let ind = 1

function preload() {
  font = loadFont('HSBombaram3.0_Thin.otf');
  currentShader = loadShader('wave.vert', 'wave.frag');
}
function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke()

  // create graphic with text
  setGraphics('graphic1', words[0])
  setGraphics('graphic2', words[0])
  setGraphics('graphic3', words[0])

}

function draw() {
  if(frameCount%80 === 0) {
    changeWord(ind)
    if(ind === words.length - 1) {
      ind = 0
    } else{
      ind++
    }
  }
  shader(currentShader)

  // version2: mouse interactive
  let freq = map(sin(frameCount/50), -10, 10, 0.0, 5.0)
  let amp = map(cos(frameCount/50), 0, 1, 0.1, 0.05)
  let angle = map((frameCount/20)%100, 0, 100, 1, 10)
  currentShader.setUniform('frequency', mouseX/10)
  currentShader.setUniform('amplitude', amp)
  currentShader.setUniform('speed', frameCount * 0.05)
  currentShader.setUniform('texture1', graphic1)
  currentShader.setUniform('texture2', graphic2)
  currentShader.setUniform('texture3', graphic3)
  currentShader.setUniform('u_angle', PI/angle)
  
  
  rect(0,0,width,height);
  // setupShader(freq, amp)
}

function changeWord(i) {
  setGraphics('graphic1', words[i])
  setGraphics('graphic2', words[i])
  setGraphics('graphic3', words[i])

}

function setGraphics(g, word) {
  const size = 600
  const centerX = size/2
  const centerY = size/2 - 50
  
  if(g == 'graphic1'){
    graphic1 = createGraphics(size, size)
    graphic1.background(0, 0, 0)
    graphic1.textFont(font)
    graphic1.textSize(size * 0.7)
    graphic1.textAlign(CENTER, CENTER)
    graphic1.fill('rgba(242, 39, 229, 1.0)') //7, 242, 219
    graphic1.text(word, centerX,  centerY)
  }
  if(g == 'graphic2'){ 
    graphic2 = createGraphics(size, size)
    graphic2.background(0, 0, 0)
    graphic2.textFont(font)
    graphic2.textSize(size * 0.7)
    graphic2.textAlign(CENTER, CENTER)
    graphic2.fill('rgba(138, 34, 242, 1.0)') //215, 7, 242
    graphic2.text(word, centerX-20,  centerY+14)
  }
    if(g == 'graphic3'){ 
    graphic3 = createGraphics(size, size)
    graphic3.background(0, 0, 0)
    graphic3.textFont(font)
    graphic3.textSize(size * 0.7)
    graphic3.textAlign(CENTER, CENTER)
    graphic3.fill('rgba(27, 242, 203, 1.0)') 
    graphic3.text(word, centerX+5,  centerY-20)
  }
}