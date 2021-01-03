// https://editor.p5js.org/sosunnyproject/sketches/bgEyBE-yu
// genuary 2021 prompt 3

let typoImg, typoTileSize, typoTiles = 40
let typoPoints = []
let grids = []

function preload(){
  typoImg = loadImage('deep550.png')
}
function setup() {
  createCanvas(600, 600);
  background(0)
  // image(typoImg, 0, 0)
  
  
  typoTileSize = width/typoTiles
  
  // save typo section coordinates to points []
  for (let y = 10; y < height; y += typoTileSize + 15) {
    for (let x = 0; x < width; x += typoTileSize + 15) {
      let c = typoImg.get(x, y)
      let b = brightness(c)
      if (b > 1) {
        typoPoints.push({
          x: x,
          y: y,
          b: b
        })
      }
    }
  }
  // insideTypo()
  
  // save all grid coordinates by tileSize to grids
  
}

function draw() {
  background(0)
  insideTypo() 
  
}
function insideTypo() {
  typoPoints.forEach((p, ind) => { // ind: total 124    
    fill(255)
    push()
    translate(p.x, p.y)
    drawFace()
    pop()
  })
}

function outsideTypo() {
  
}
function drawFace() {
  // eyes
  fill(255)
  ellipse(5, 0, 5, 5)
  ellipse(15, 0, 5, 5)
  
  //bezier(x1, y1, controlx2, controly2, controlx3, controly3, x4, y4)
  stroke(255, 0, 0)
  strokeWeight(3)
  noFill()
  bezier(5, 10, 
         5, 10 + sin(frameCount/20)*10, 
         10, 10 + sin(frameCount/40)*10,
         15, 10)

  //smile  :)
  //sad    :(
  //indifferent :|
  //confused    :$
}

