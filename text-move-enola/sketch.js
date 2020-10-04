let font;
let fs = 200
let points;
let bounds;
let text1 = 'EnOLA', text2 = 'ALOnE'
let originP, destP
let movers = []

function preload() {
  font = loadFont('Anton-Regular.ttf');
}

function setup() {
  createCanvas(500, 500);
  bounds = font.textBounds(text1, 50, 100, 100);
  originP = setPoints(text1, 30, 200)
  destP = setPoints(text2, 30, 400)

  for (let i = 0; i < originP.length; i += 10) {
    let mover
    if (i > destP.length) {
      console.log(i)
      mover = new Mover(originP[i], destP[i % destP.length])
    } else {
      mover = new Mover(originP[i], destP[i])
    }
    movers.push(mover)
  }

}

function draw() {
  background(20, 50);

  for (let i = 0; i < movers.length; i += 5) {
    movers[i].move()
  }
}

function setPoints(txt, x, y) {
  points = font.textToPoints(txt, x, y, fs, {
    sampleFactor: 10,
    simplifyThreshold: 0
  });
  return points;
}