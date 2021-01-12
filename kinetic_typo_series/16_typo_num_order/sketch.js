let font;
let points=[];
let bounds;
let gap = 5
let count = 0
let words = ['헤', '아', '릴', '수', '없', '어']
let wordcount = 0
let sFactor = 0.02
let factorSlider;

function preload() {
  font = loadFont("nationalMuseumL.otf")
}

function setup() {
  createCanvas(800, 800);
  stroke(0);
  // angleMode(DEGREES)
  factorSlider = createSlider(0, 255, 100);
  // fill(255, 104, 204);
  textFont(font)
  // changeText(words[0])
}

function draw() {
  let factorVal = factorSlider.value()
  sFactor = atan(frameCount%50) * map(factorVal, 0, 255, 1.0, 0.03)
  textSize(15)
  background(0, 10);
  // group(0, 300)
  // stroke(255)
  noStroke()
  let speed = int(sin(frameCount/100)+35);
  for (let i = 0; i < speed; i+=1) { 
    if(points.length > 0) {
      let nPoint = points[(count+i) % points.length];
      fill(`hsl(${(mouseX*mouseY) % 360}, 100%, 60%)`)
      // fill(`hsb((${frameCount} % 360), 100, 100)`)
      text(nPoint.num, nPoint.x, nPoint.y)
      count++
    }
  }
}

function render(p) {
  console.log(p)
}
function mouseClicked(){
    points = []
  changeText(words[wordcount])
  if(wordcount == words.length - 1){
    wordcount = 0
  } else {
    wordcount++
  }
}


function changeText(word) {
  console.log(sFactor,  atan(frameCount/1000) )
  points = font.textToPoints(word, 100, height-100, 600, {
    sampleFactor: sFactor,
    simplifyThreshold: 0
  });
  for (let i = 0; i < points.length; i++) {
    points[i].num = i
  }
}

