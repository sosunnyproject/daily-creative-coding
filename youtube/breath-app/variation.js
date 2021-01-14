let count = 30
function setup() {
  createCanvas(600, 600);
  // colorMode(HSB)
  angleMode(RADIANS)
}

function draw() {
  background(0, 20);
  let frame = frameCount % 50
  let speed = map(cos(frameCount/120), 1, -1, 0, 40)
  let speedY = map(tan(frameCount/120), -10, 10, 0, 1)
  translate(width/2, height/2)
  
  noFill()
  noStroke()
  strokeWeight(1)
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push()
    fill(frameCount%360, speed, 100, 100)
    // fill(173,217+(speed*20),215+(i*12), 40)
    translate(speed*PI, TWO_PI*speedY%50)
    ellipse(0, 0, 500/count, 500/count)
    pop()
  }
  
  for(let i = 0; i < count; i++){
    // rotate(TWO_PI/count*frame);
    // push()
    // // fill(speedY/5, speedY, 255)
    // stroke(225, speedY*220, frameCount%255)
    // translate(TWO_PI*speed, 10*PI*speedY)
    // ellipse(i, 0, 1600/count, 160/count)
    // pop()
  }
}