let font;
let points=[];
let bounds;
let gap = 5
let count = 0
let words = ['헤', '아', '릴', '수', '없', '어']
let wordcount = 0
let colorRange = 174

let factorSlider;
let wiggleSlider;
let sFactor = 0.02
let wiggle = 500, factorVal = 100
let prevFactor = factorVal
let prevWiggle = wiggle

function preload() {
  font = loadFont("nationalMuseumL.otf")
}

function setup() {
  createCanvas(800, 800);
  stroke(0);
  factorSlider = createSlider(0, 255, 100);
  wiggleSlider = createSlider(1, width/2, 25)
  textFont(font)
}

function draw() {
  prevWiggle = wiggle
  prevFactor = factorVal
  
  factorVal = factorSlider.value()
  wiggle = wiggleSlider.value()
  
  sFactor = atan(frameCount%50) * map(factorVal, 0, 255, 0.8, 0.01)
  colorRange = int(map(sin(frameCount/20), -1, 1, 174, 299))
  
  if(factorVal !== prevFactor) {
    changeText(words[wordcount])
  }
  
  textSize(16)
  background(0, 10);
  noStroke()
  let speed = int(tan(mouseY*frameCount/10)+25);
  for (let i = 0; i < speed; i+=1) { 
    if(points.length > 0) {
      let nPoint = points[(count+i) % points.length];
      fill(`hsl(${colorRange}, 100%, 40%)`)
      text(nPoint.num,
           nPoint.x * width / bounds.w + sin(20 * nPoint.y / bounds.h + millis() / 1000) * width / wiggle, 
           nPoint.y)

      count++
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    points = []
    changeText(words[wordcount])
    if(wordcount == words.length - 1){
      wordcount = 0
    } else {
      wordcount++
    }
  }
}


function changeText(word) {
  points = font.textToPoints(word, 100, height-100, 600, {
    sampleFactor: sFactor,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(' '+word+' ', 100, height-100, 600);

  for (let i = 0; i < points.length; i++) {
    points[i].num = i
  }
}

