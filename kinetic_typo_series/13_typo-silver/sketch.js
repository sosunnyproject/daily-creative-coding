let kira, typo, tileSize
let tiles = 40
let varSize = 20

let typoTiles = 20
let typoTileSize

let points = [],
  allGrid = [] // every 6 pixels is 1 grid
const ruleset = [0, 1, 1, 1, 1, 0, 0, 0]

let ca

function preload() {
  kira = loadImage('kira2.png')
  typo = loadImage('silver.png')
}

function setup() {
  createCanvas(600, 600);
  background(0);

  kira.resize(30, 30)

  tileSize = width / tiles
  // 600/60 size: tileSizepx

  drawTypoPixel()
  ca = new CA(tiles, tileSize)
}

function draw() {
  background(0, 10)
  ca.generate()
  ca.render()
  ca.restart()

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    typoTiles += 5
  } else if (keyCode === RIGHT_ARROW) {
    typoTiles -= 5
  }

  drawTypoPixel()
}

function reset() {
  background(0)
}

function drawTypoPixel() {
  typoTileSize = width / typoTiles
  points = []
  for (let y = 0; y < height; y += typoTileSize) {
    for (let x = 0; x < width; x += typoTileSize) {
      let c = typo.get(x, y)
      let b = brightness(c)
      if (b > 1) {
        points.push({
          x: x,
          y: y,
          b: b
        })
      }
    }
  }
  points.forEach((p, ind) => { // ind: total 124    
    image(kira, p.x, p.y)
  })
}