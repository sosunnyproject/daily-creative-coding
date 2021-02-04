// https://editor.p5js.org/sosunnyproject/sketches/DBmCLxrud

let r = 40
let arr = []
let loop = 0
const diameter = r * 2
let center = {
  x: 0,
  y: 0
}
// let distance = diameter


// korean lyrics variables
const 외로운사람들의 = 50, 마음을열어줄거야 = 50
const 메마른가슴속을 = 255, 적셔줄멜로디 = 255

// english lyrics variables
const love = r
let TEARS = diameter
const LETS = center.x, WILL = center.x
const SING = center.y, NEVER = center.y
const A_SONG = love * 2, END = r * 2
const THIS = 2, DREAM = r * 2 + 10
const NEW = 100, FUTURE = 800
const MYSELF = 255
const LOVE = 1, DEATH = 8

function setup() {
  createCanvas(NEW, FUTURE);
  background(MYSELF)
  translate(외로운사람들의, 마음을열어줄거야)
  fill(메마른가슴속을, 적셔줄멜로디)
  strokeWeight(LOVE)
  circle(LETS, SING, A_SONG)
  for (let moon = 0; moon < DEATH; moon++) {
    TEARS -= 12
    translate(THIS, DREAM)
    circle(WILL, NEVER, END)
    FullMoonLove()
  }
}
function mouseClicked(){
  saveCanvas('moonTattoo', 'png');
}
function FullMoonLove() {
  // second circle
  for (let i = 0; i < 360; i++) {
    let x = r * cos(i) + TEARS
    let y = r * sin(i)
    stroke(0)
    if (dist(center.x, center.y, x, y) < r) {
      ellipse(x, y, 0.1)
    }

    if (i === 120) {
      point(x, y)
      // console.log(cos(120)*r, sin(120)*r)
      let ax = x - cos(120) * r
      let ay = y - sin(120) * r
      let overlapCenter = {
        x: ax,
        y: ay
      }
      noStroke()
      fill(255)
      ellipse(ax, ay, (r * 2))
    }
  }
}

function bezierMoon() {
  beginShape();
  vertex(288.0, 149.0);
  bezierVertex(288.0, 149.0, 288.0, 149.0, 288.0, 149.0);
  bezierVertex(288.0, 149.0, 215.0, 114.0, 197.0, 171.0);
  bezierVertex(179.0, 228.0, 245.0, 254.0, 245.0, 254.0);
  bezierVertex(245.0, 254.0, 208.0, 207.0, 231.0, 176.0);
  bezierVertex(254.0, 145.0, 288.0, 152.0, 288.0, 152.0);
  endShape();
}