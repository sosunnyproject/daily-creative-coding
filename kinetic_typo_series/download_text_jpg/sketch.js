let font
let canvas
// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('MapleStory Bold.ttf')
}

function setup() {
  canvas = createCanvas(600, 600);
  background(0);
  textFont(font)
  textSize(500)
  fill(255)
  textAlign(CENTER, CENTER)
  text('며', width/2, height/2-30);
}

function mouseClicked(){
  saveCanvas(canvas, 'text', 'jpg');
}