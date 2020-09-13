let gap = 20
let n = 10 //* tan(frameCount/10)
let i = 0

function setup() {
  createCanvas(700, 700);
  colorMode(HSB)
}


function draw() {
  background(0, 10);

  let size = map(sin(frameCount / 100), 1, -1, 100, 1)
  let downSize = map(sin(frameCount / 100), 1, -1, -100, -1)

  let movingSpeed = sin(frameCount / 100)
  fill(movingSpeed * 360, 50, 100)

  for (let i = 0; i < width; i += gap) {
    noStroke()
    upTri(size, i)
    upTri(size * 2, i)
    upTri(size * 3, i)
    upTri(size * 4, i)

    downTri(downSize * 1, i)
    downTri(downSize * 2, i)
    downTri(downSize * 3, i)
    downTri(downSize * 4, i)
  }

}

function upTri(size, i) {
  triangle(i + size, i + size,
    i + size + 5, i + size,
    i + size + 5, i
  )
}

function downTri(size, i) {
  triangle(i + size, i + size,
    i + size + 5, i + size,
    i + size + 5, i)
}

// bone likes feeling
function boneTri(size, i) {
  triangle(i + size, i + size,
    i + size + 10, size,
    i + size + 10, 20 + i)
}