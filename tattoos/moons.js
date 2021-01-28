let r = 30
let arr = []
let loop = 0
const diameter = r * 2
let center = {
  x: 0,
  y: 0
}
// 외로운사람들의, 마음을열어줄거야
// 메마른가슴속을, 적셔줄멜로디
const love = r
let distance = diameter

let tears = distance
const 외로운사람들의 = 50, 마음을열어줄거야 = 50
const 메마른가슴속을 = 255, 적셔줄멜로디 = 255
// 내마음을담아, 노래할거야, 너를위한노래를예에
// 슬픔의기억들에, 기쁨을채워줄거야, 샤라리라히라_라리라
const LETS = center.x, WILL = center.x
const SING_A = center.y, NEVER = center.y
const SONG = love * 2, END = love * 2
const THIS = 0, DREAM = r * 2 + 5

function setup() {
  createCanvas(400, 800);
  background(255)

  translate(50, 50)
  fill(255, 255)
  circle(center.x, center.y, diameter)
  for (let i = 0; i < 5; i++) {
    distance -= 20
    translate(0, diameter + 5)
    circle(center.x, center.y, diameter)
    FullMoonLove()
  }
}

function draw() {
  // background(220);

}

function FullMoonLove() {

  // second circle
  for (let i = 0; i < 360; i++) {
    let x = r * cos(i) + distance
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