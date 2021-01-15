let font;
let points;
let bounds;
let gap = 5
let movers = []
function preload() {
  font = loadFont("Bazzi.ttf")
}

function setup() {
  createCanvas(500, 500);
  stroke(0);
  // fill(255, 104, 204);

  points = font.textToPoints(' 는', width / 10, height / 4 * 3, 500, {
    sampleFactor: 0.1,
    simplifyThreshold: 0
  });
  // bounds = font.textBounds(' 는 ', 0, 0, 10);
  for (let i = 0; i < points.length; i++) {
    setParticle(i)
  }
}

function draw() {
  background(0, 50);

  move()
}

function setParticle(ind){
  let target = findNew(points[ind])
  movers.push(new Mover(points[ind], target))
  // console.log(target)
}

function move(){
  for (let i = 0; i < movers.length; i++) {
    movers[i].display()
  }
}

function group(startInd, endInd) {
  noFill()
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

function findNew(point) {
  // decide range of y
  let rangeY = createVector(point.y - 20, point.y + 20)
  const rightXrange = createVector(width / 4 * 3, width)
  const leftXrange = createVector(0, width / 3)

  let right = random(rightXrange.x, rightXrange.y)
  let left = random(leftXrange.x, leftXrange.y)

  const xCoord = int(random(0, 2)) ? right : left
  const yCoord = random(rangeY.x, rangeY.y)
  
  const target = createVector(xCoord, yCoord)
  
  fill(255, 0, 0)
  // ellipse(target.x, target.y, 30, 30)

  return target
}