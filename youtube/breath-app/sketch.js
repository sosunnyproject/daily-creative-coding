//https://editor.p5js.org/sosunnyproject/sketches/1JttzgMgR
let count = 5
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  angleMode(RADIANS)
  noStroke()
  let speed = sin(frameCount/100)
  let speedY = Math.abs(cos(frameCount/120))
  translate(width/2, height/2)
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    
    rotate(TWO_PI/count);
    push()
    fill(173,217,215, 50)
    translate(3*TWO_PI*speed, 3*TWO_PI*speedY)
    ellipse(0, 0, 70, 70)
    pop()
  }
}