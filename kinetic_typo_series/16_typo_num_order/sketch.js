let font;
let points;
let bounds;
let gap = 5
let count = 0

function preload() {
  font = loadFont("Bazzi.ttf")
}

function setup() {
  createCanvas(800, 800);
  stroke(0);
  // fill(255, 104, 204);

  points = font.textToPoints(' 헤', -20, height / 4 * 3, 600, {
    sampleFactor: 0.04,
    simplifyThreshold: 0
  });
  // bounds = font.textBounds(' 는 ', 0, 0, 10);
  for (let i = 0; i < points.length; i++) {
    points[i].num = i
  }
  textFont(font)
  textSize(20)
  // colorMode(HSB)
}

function draw() {
  background(0, 10);
  // group(0, 300)
  // stroke(255)
  fill(255)
  let speed = int(-cos(frameCount/100)+5) ;
  for (let i = 0; i < speed; i ++) { 
    let nPoint = points[(count + i) % points.length];
    fill(`hsl(${frameCount % 360}, 100%, 60%)`)
    // fill(`hsb((${frameCount} % 360), 100, 100)`)
    text(nPoint.num, nPoint.x, nPoint.y)
    count++
  }
  for(let i = 0; i < points.length;i++){
    // text(points[i].num, points[i].x, points[i].y)
  }
}

function group(startInd, endInd) {
  noFill()
  stroke(255)
  beginShape()
  // console.log(startInd, endInd)
  vertex(points[startInd].x, points[startInd].y)
  vertex(points[endInd].x, points[endInd].y)

  for (let i = startInd; i < endInd; i++) {
    let p = points[i];
    vertex(
      p.x,
      p.y
    );
  }
  endShape()

}
