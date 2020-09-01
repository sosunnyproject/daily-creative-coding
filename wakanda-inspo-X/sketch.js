let gap = 20
let n = 1
function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(0);
  for (let i = 0; i < width; i += gap) {
    fill(255)
    noStroke()
    rect(-50 + i*n*sin(frameCount*5), -50 + i*n*sin(frameCount*5), random(10), 40)
    rect(-50 + i*n*sin(frameCount*10), 10 + height-i*n*sin(frameCount*10), random(10), 40)
  }
  
  if(n > 20) n = 1
  
  if(frameCount%10 === 0) {
    n++
  }
  
}