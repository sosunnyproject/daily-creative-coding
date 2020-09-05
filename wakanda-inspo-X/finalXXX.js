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
  fill(movingSpeed * 360, 50, 100)
  fill(180)

  for (let i = 0; i < width; i += gap) {
    noStroke()
    LrTri(size, i)
    LrTri(size * 2, i)

    LrTri(downSize * 1, i)
    LrTri(downSize * 2, i)
  
    RlTri(size, i)
    RlTri(size *2 , i)
    
    RlTri(downSize, i)
    RlTri(downSize *2 , i)
  }

}

// Left to Right Diagonal Directions
function LrTri(size, i) {
  triangle(i + size, i + size,
    i + size + 5, i + size,
    i + size + 5, i
  )
}

// Right to Left diagonal
function RlTri(size, i){
    triangle(width-(i + size), (i + size),
    width-(i + size + 5), (i + size),
    width-(i + size + 5), i)
}

// bone likes feeling
function boneTri(size, i) {
  triangle(i + size, i + size,
    i + size + 10, size,
    i + size + 10, 20 + i)
}