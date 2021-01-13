let font;
let points = [];
let bounds;
let gap = 5
let count = 0
let words = ['헤', '아', '릴', '수', '없', '어']
let wordcount = 0
let sFactor = 0.08
let factorSlider;
let colorRange = 174
const colors = [299, 270, 220, 265, 174]

function preload() {
  font = loadFont("nationalMuseumL.otf")
}

function setup() {
  createCanvas(800, 800);
  stroke(0);
  factorSlider = createSlider(0, 255, 100);
  textFont(font)

  for (let i = 0; i < words.length / 2; i++) {
    positionText(words[i], i)
  }
}

function draw() {
  let factorVal = factorSlider.value()
  sFactor = atan(frameCount % 50) * map(factorVal, 0, 255, 0.6, 0.03)
  colorRange = int(map(mouseX, 0, width, 174, 299))
  textSize(5)
  background(0, 20);
  noStroke()
  let speed = int(sin(mouseY * frameCount / 100) + 35);
  for (let i = 0; i < words.length / 2; i++) {
    positionText(words[i], i)
  }
  for (let i = 0; i < speed; i += 1) {
    if (points.length > 0) {
      let nPoint = points[(count + i) % points.length];

      fill(`hsl(${nPoint.color}, 100%, 40%)`)
      // fill(`hsb((${frameCount} % 360), 100, 100)`)
      text(nPoint.num, nPoint.x, nPoint.y)
      count++
    }
  }
}

function render(p) {
  console.log(p)
}

function mouseClicked() {
  //   points = []
  // changeText(words[wordcount])
  // if(wordcount == words.length - 1){
  //   wordcount = 0
  // } else {
  //   wordcount++
  // }
}


function positionText(word, ind) {
  let path = font.textToPoints(word, 50 + 240 * ind, height - 500, 200, {
    sampleFactor: sFactor,
    simplifyThreshold: 0
  });
  for (let i = 0; i < path.length; i++) {
    path[i].num = i
    path[i].color = random(colors)
    points.push(path[i])
  }
}