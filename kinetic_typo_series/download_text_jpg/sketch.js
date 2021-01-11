let font
let canvas
// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('BinggraeSamanco.ttf')
}

function setup() {
  canvas = createCanvas(600, 600);
  background(255);
  textFont(font)
  textSize(600)
  fill(0)
  textAlign(CENTER, CENTER)
  text('헤', width/2, height/2-100);
}

function mouseClicked(){
  saveCanvas(canvas, 'typo', 'png');
}