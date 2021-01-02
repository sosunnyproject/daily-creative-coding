let font
let canvas
// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('koreaNationalMuseumClassic_L.ttf')
}

function setup() {
  canvas = createCanvas(600, 600);
  background(0);
  textFont(font)
  textSize(500)
  fill(255)
  textAlign(CENTER, CENTER)
  text('은', width/2, height/2-50);
}

function mouseClicked(){
  saveCanvas(canvas, 'typo', 'png');
}