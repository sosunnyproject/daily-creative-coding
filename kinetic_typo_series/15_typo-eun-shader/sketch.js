// thanks to https://editor.p5js.org/sadbot.tech/sketches/oiPfwdAbZ
// https://www.openprocessing.org/sketch/1050448
// https://editor.p5js.org/sosunnyproject/sketches/st0EQxw31

let font, currentShader 
let graphic1, graphic2, graphic3, graphic4
const words = ['극', '는', '듣', '를', '믐', '븝', '슷', '응', '즞', '츷','킄', '틑', '픞', '흫']
let ind = 1

function preload() {
  font = loadFont('CookieRun.otf')
  currentShader = loadShader('wave.vert', 'wave.frag')
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
  if(frameCount%50 === 0) {
    changeWord(ind)
    if(ind === words.length - 1) {
      ind = 0
    } else{
      ind++
    }
  } 
  shader(currentShader)
  let freq = map(sin(frameCount/20), -10, 10, 0.0, 5.0)
  let amp = map(tan(frameCount/50), 0, 1, 0.1, 0.05)
  currentShader.setUniform('frequency', freq)
  currentShader.setUniform('amplitude', amp)
  currentShader.setUniform('speed', frameCount * 0.1)
  currentShader.setUniform('texture1', graphic1)
  currentShader.setUniform('texture2', graphic2)
  currentShader.setUniform('texture3', graphic3)

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

  // 242, 46, 229, 0.9
  // 242, 183, 5
  // 124, 5, 242, 1.0
  // green 141, 242, 94
  
  // graphic.fill('rgba( 145, 119, 242, 0.7)')
  // graphic.text('는', centerX+15,  centerY-8)
  // graphic.fill('rgba(145, 119, 242, 1.0)')
  // graphic.text('는', centerX+8,  centerY+15)
  // graphic.fill('rgba(242, 46, 229, 0.9)')
  // graphic.text('는', centerX, centerY)
  // graphic.fill('rgba(215, 7, 242, 0.9)')
  // graphic.text('는', centerX+5,  centerY+10)

  // image(graphic, -width/2, -height/2); 
}