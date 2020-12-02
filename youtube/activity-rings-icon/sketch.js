let size = 50;
let len = 3;
let colors = ['#00f3f1', '#b2ff00', '#fa1453']
function setup() {
  createCanvas(400, 400);
  angleMode(degrees)
}

function draw() {
  background(0, 5);
  translate(width/2, height/2)
  noStroke()
  // let frame = frameCount/10
  
  for(let i = 0; i < len; i++){
    push()
    rotate(i + frameCount/20)
    fill(colors[i])
    ellipse(size+i*size, 0, size)
    //ellipse(x, y, size, size)
    // try: add frameCount variables to x/y params in ellipse
    // try: variating x, y depends on mouse positions
    // try: variating size
    // try: variating colors
    pop()
    
  }
}