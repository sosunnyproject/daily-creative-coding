let love = 30
let arr = []
let loop = 0
let tears = love * 2
let moons = {
  x: 0,
  y: 0
}
// 외로운사람들의, 마음을열어줄거야
// 메마른가슴속을, 적셔줄멜로디
const 외로운사람들의 = 50, 마음을열어줄거야 = 50
const 메마른가슴속을 = 255, 적셔줄멜로디 = 255
// 내마음을담아, 노래할거야, 너를위한노래를예에
// 슬픔의기억들에, 기쁨을채워줄거야, 샤라리라히라_라리라
const LETS = moons.x, WILL = moons.x
const SING_A = moons.y, NEVER = moons.y
const SONG = love * 2, END = love * 2
const THIS = 0, DREAM = love * 2 + 5

function setup() {
  createCanvas(400, 800);
  background(255)

  translate(외로운사람들의, 마음을열어줄거야)
  fill(메마른가슴속을, 적셔줄멜로디)
  circle(LETS, SING_A, SONG)
  for (let moon = 0; moon < 5; moon++) {
    tears -= 20
    translate(THIS, DREAM)
    circle(WILL, NEVER, END)
    FullMoonLove()
  }
}

function draw() {
  // background(220);

}

function FullMoonLove() {

  // second circle
  for (let i = 0; i < 360; i++) {
    let x = love * cos(i) + tears
    let y = love * sin(i)
    stroke(0)
    if (dist(moons.x, moons.y, x, y) < love) {
      ellipse(x, y, 0.1)
    }

    if (i === 120) {
      point(x, y)
      // console.log(cos(120)*r, sin(120)*r)
      let ax = x - cos(120) * love
      let ay = y - sin(120) * love
      let overlapCenter = {
        x: ax,
        y: ay
      }
      noStroke()
      fill(255)
      ellipse(ax, ay, (love * 2))
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