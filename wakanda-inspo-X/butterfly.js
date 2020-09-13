let gap = 20
let n = 10 //* tan(frameCount/10)
let i = 0

function setup() {
  createCanvas(700, 700);
  // colorMode(HSB)
}


function draw() {
  background(0, 40);

  let xSize = map(cos(frameCount / 10), 1, -1, 0.1, 1)
  let ySize = map(cos(frameCount / 10), 1, -1, 20, 1)
  let size = map(sin(frameCount / 30), 1, -1, 100, 1)
  let downSize = map(sin(frameCount / 30), 1, -1, -100, -1)

  let movingSpeed = sin(frameCount / 100)
  // fill(movingSpeed * 360, 50, 100)
  fill(180)
  noStroke()
  // strokeWeight(2)
  // strokeWeight(map(sin(frameCount), 1, -1, 0.5, 3))

  // butterfly
  for (let i = width; i > 0; i -= gap) {
    butterFlyTri(size, i)
    butterFlyTri(size * 3, i)
    butterFlyTri(size * 5, i)
    butterFlyTri(size * 7, i)
    butterFlyTri(size * 9, i)
    butterFlyTri(downSize, i)
    butterFlyTri(downSize * 3, i)
    butterFlyTri(downSize * 5, i)
    butterFlyTri(downSize * 7, i)
    butterFlyTri(downSize * 9, i)
  }

}

function butterFlyTri(size, i) {

  //   triangle(i + size, i + size,
  //   i + size + 5, i + size,
  //   i + size + 5, i
  // )
  triangle(width - (i + size), (i + size),
    width - (i + size + 5), height - (i + size),
    width - (i + size + 5), height - i)
}

// bone likes feeling
function boneTri(size, i) {
  triangle(i + size, i + size,
    i + size + 10, size,
    i + size + 10, 20 + i)
}