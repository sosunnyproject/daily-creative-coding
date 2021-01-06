//https://editor.p5js.org/sosunnyproject/sketches/1JttzgMgR
let count = 10
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 50);
  angleMode(RADIANS)
  
  noStroke()
  let speed = map(sin(frameCount/100), -1, 1, 0, 1)
  let speedY = map(sin(frameCount/80), -1, 1, 0, 1)
  translate(width/2, height/2)
  
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push()
    fill(173,217+(speed*10),215+(i*8), 50)
    translate(6*TWO_PI*speed, 3*TWO_PI*speedY)
    ellipse(0, 0, 1000/count, 1000/count)
    pop()
  }
}