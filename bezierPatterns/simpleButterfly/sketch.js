let butterfly
let butterflies = []
let len = 10

function setup() {
  createCanvas(400, 400);

  butterfly = new Butterfly(width / 2, height / 3, 100, 5)
  for (let i = 0; i < len; i++) {
    butterflies.push(
      new Butterfly(
        random(10, width - 30),
        random(10, height - 30),
        30,
        5)
    )
  }
}

let size = 100
let n = 0.02

function draw() {
  background(0)
  colorMode(HSB)
  // blendMode(LIGHTEST);
  
  noFill()

  //   for(let i = 0; i < butterflies.length; i++){
  //     fill(frameCount % 360, 100 - (i*5), 100)
  //     butterflies[i].display()
  //   }
  butterfly.display()
}