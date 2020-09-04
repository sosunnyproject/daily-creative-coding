let gap = 20
let n = 10 //* tan(frameCount/10)
let i = 0

function setup() {
  createCanvas(700, 700);
  colorMode(HSB)
  // for (let i = 0; i < width; i += gap) {
  //   noStroke()
  //   triangle(0+i, 0+i, 20+i, 0+i, 0+i, 60+i)
  // }

}


function draw() {
  background(0, 10);

  let xSize = map(cos(frameCount / 10), 1, -1, 0.1, 1)
  let ySize = map(cos(frameCount / 10), 1, -1, 20, 1)
  let size = map(sin(frameCount / 100), 1, -1, 100, 1)

  let movingSpeed = sin(frameCount / 100)
  fill(movingSpeed * 360, 50, 100)

  for (let i = 0; i < width; i += gap) {
    noStroke()
    // triangle(i, i, 10+i, i, i, 80+i)
    upTri(size, i)
    upTri(size * 2, i)
    upTri(size * 3, i)
    upTri(size * 4, i)
    upTri(size * 5, i)

    downTri(size, i)
    // downTri(size*2, i)
    // downTri(size*3, i)
    // downTri(size*4, width-i)
    // downTri(size*5, width-i)

  }
}

function upTri(size, i) {
  triangle(i+size, i + size, 
           i+size, i,
           i+size+10, i
           )
}

function downTri(size, i) {
  triangle(i + size, i + size, 
          i + size + 10, i + size , 
          i + size + 10, i)
}

// bone likes feeling
function boneTri(size, i) {
  triangle(i + size,     i + size, 
          i + size + 10, size, 
          i + size + 10, 20 + i)
}