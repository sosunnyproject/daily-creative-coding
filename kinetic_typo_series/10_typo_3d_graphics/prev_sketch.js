let pg, texturePg // 캔버스 위에 그리는 (그래픽) 레이어
let font // 텍스트의 폰트
let tileSize = 8
let tileGap = 20

// 폰트 타입을 미리 로딩해둔다.
function preload() {
  font = loadFont('HSspringwind.ttf')
}

function setup() {
  createCanvas(600, 600, WEBGL);
  specularMaterial(255);
  
  // plane texture: graphics
  pg = createGraphics(width, height)
  pg.background(0)
  pg.textFont(font)
  pg.textSize(400)
  pg.fill(255)
  pg.textAlign(LEFT, TOP)
  pg.text("는", 50, 50)

}
// 
function draw() {
  background(0)
  orbitControl()

  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  pointLight(0, 0, 250, -width/2, -height/2, 50); //topleft
  pointLight(250, 0, 250, -width/2, height/2, 50); //bottomleft
  pointLight(0, 250, 250, width/2, height/2, 50); //bottomright
  pointLight(0, 250, 0, width/2, -height/2, 50); //topright

  for (let x = -width; x < width; x += tileGap) {
    for (let y = -height; y < height; y += tileGap) {
      for (let z = -200; z < 200; z += 50) {

        let isTEXT = JSON.stringify(pg.get(x, y)) !== JSON.stringify([0, 0, 0, 255])
          // console.log(isTEXT, x, y)
        
          // current problem: renders sphere other than text area.
        if (isTEXT) {
          push()
          translate(x, y, z)
          sphere(4)
          pop()
        }
      }
    }
  }
}
