let pg, texturePg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 14

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('HiMelody-Regular.ttf')
}

function setup() {
  createCanvas(600, 600, WEBGL);
  specularMaterial(255);
  
  // plane texture: graphics
  pg = createGraphics(600, 600, WEBGL)
  pg.background(0, 1)
  pg.textFont(font)
  // pg.textFont('Hi Melody')
  pg.textSize(600)
  pg.fill(255)
  pg.textAlign(CENTER, CENTER)
  pg.text("는", 0, -80)
}

function draw() {
  background(0)
  orbitControl()
  // blendMode(DARKEST)
  let dirX = ((mouseX / width) - 0.5) * 2;
  let dirY = ((mouseY / height) - 0.5) * 2;
  colorMode(RGB)

  lighting()

  draw3d()

  //testing texture, 3d plane
  // texture(pg)
  // plane(100, 100)
}

function lighting(){
  pointLight( 99, 109, 166, -width/2 , -height/2 , -100);  //topleft
  pointLight(  1, 17, 38, -width/2 , height/2, 0); //bottomleft
  pointLight(  217, 143, 170, width/2 , height/2, -100);  //bottomright
  pointLight(  242, 167, 167, width/2, -height/2, 0);   //topright
  noLoop()
}

function draw3d(){
  for (let x = 0; x < width; x += tileGap) {
    for (let y = 0; y < height; y += tileGap) {
      for (let z = 1; z < 3; z++) {

        let isTEXT = JSON.stringify(pg.get(x, y)) === JSON.stringify([255, 255, 255, 255])
        
        if (isTEXT) {
          // pg.fill(0, 255, 0)
          // pg.ellipse(x-width/2, y-width/2, 10, 10)
          push()
          translate(x-width/2 + (z*30), width/2-y - (z*20), z*10)
          noStroke()
          sphere(z*5)
          pop()
        }
      }
    }
  }
  noLoop()
}