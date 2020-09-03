let gap = 20
let n = 10 //* tan(frameCount/10)

function setup() {
  createCanvas(700, 700);
  colorMode(HSB)
}

function draw() {
  background(0, 30);

  let xSize = map(cos(frameCount / 10), 1, -1, 0.1, 1)
  let ySize = map(cos(frameCount / 10), 1, -1, 20, 1)

  let movingSpeed = sin(frameCount / 100)
  fill(movingSpeed * 360, 50, 100)
  for (let i = 0; i < width; i += gap) {
    noStroke()
    push()
    translate(-30 + (i * movingSpeed), height - (20 + i * movingSpeed))
    rotate(frameCount / 30)
    triangle(0, 0, 20, 0, 0, 60)
    pop()

    push()
    translate(-30 + (i * movingSpeed * 2), height - (20 + i * movingSpeed * 2))
    rotate(frameCount / 10)
    triangle(20, 60, 0, 60, 20, 0)
    pop()

    push()
    translate(width - (30 + i * movingSpeed), height - (20 + i * movingSpeed))
    rotate(frameCount / 30)
    triangle(0, 0, 20, 0, 0, 60)
    triangle(20, 60, 0, 60, 20, 0)
    pop()
  }

  if (n === 0) n = 10

  if (frameCount % 10 === 0) {
    n--
  }

}