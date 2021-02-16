let logo;
function preload(){
  logo = loadImage('tripbtoz.svg')
}
function setup() {
  createCanvas(600, 600)
  imageMode(CENTER)
  logo.resize(72, 56)
  // 36 x 28 
}

function draw() {
  background(0)
  // rotate
  translate(width/2, height/2)
  
  // flower rotate
  // r = width/2 * sin(frameCount/30)
  // image(logo, 
  //       r * sin(frameCount/50), 
  //       r * cos(frameCount/50))
  
  // spiral motion
  // x = (a+b0)*cos0
  // let b = sin(frameCount/10)
  // let theta = (frameCount/1)%(width/3)
  // let theta2 = frameCount/10
  // let x = (-(2*theta2)) * cos(theta2)
  // let y = (-(2*theta2)) * sin(theta2)
  // image(logo, x, y)
  
    
  push()
  rotate(sin(frameCount/40)*TWO_PI)
  image(logo, 30, 0)
  pop()
}
