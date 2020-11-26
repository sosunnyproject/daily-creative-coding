let pg, texturePg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 12

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('HSspringwind.ttf')
}

function setup() {
  createCanvas(600, 600, WEBGL);
  specularMaterial(255);
  
  // plane texture: graphics
  pg = createGraphics(600, 600, WEBGL)
  pg.background(0, 1)
  pg.textFont(font)
  pg.textSize(400)
  pg.fill(255)
  pg.textAlign(CENTER, CENTER)
  pg.text("A", 0, 0)
}

function draw() {
  background(0)
  orbitControl()

  let dirX = ((mouseX / width) - 0.5) * 2;
  let dirY = ((mouseY / height) - 0.5) * 2;

  pointLight(0, 0, 250, -width/2, -height/2, 50);  //topleft
  pointLight(250, 0, 250, -width/2, height/2, 50); //bottomleft
  pointLight(0, 250, 250, width/2, height/2, 50);  //bottomright
  pointLight(0, 250, 0, width/2, -height/2, 50);   //topright

  for (let x = 0; x < width; x += tileGap) {
    for (let y = 0; y < height; y += tileGap) {
      for (let z = -100; z < 100; z += 50) {

        let isTEXT = JSON.stringify(pg.get(x, y)) === JSON.stringify([255, 255, 255, 255])
        
        if (isTEXT) {
          // pg.fill(0, 255, 0)
          // pg.ellipse(x-width/2, y-width/2, 10, 10)
          push()
          translate(x-width/2, width/2-y, z)
          noStroke()
          sphere(2)
          pop()
        }
      }
    }
  }

  //testing texture, 3d plane
  // texture(pg)
  // plane(100, 100)
}
