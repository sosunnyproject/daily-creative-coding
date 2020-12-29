// online: https://editor.p5js.org/sosunnyproject/sketches/OW7WKdvw8
// ref: https://editor.p5js.org/sosunnyproject/sketches/dqN_e0Cz-

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  
  const firstCP = createVector(width/3, height/3)
  const secondCP = createVector(width/3*2, height/3)

  fill(71, 37, 0)
  ellipse(firstCP.x, firstCP.y, 20, 20)
  ellipse(secondCP.x, secondCP.y, 20, 20)
  
  // frameCount, sin, Math.abs
  let t = frameCount/100.0
  let startP = createVector(Math.abs(sin(t))*width/4*2, 300)
  let endP = createVector(width - Math.abs(sin(t))*width/4*2, 300)
  
  // fill(71, 37, 0)
  stroke(255, 0, 0)
  bezier(startP.x, startP.y, 
    firstCP.x, firstCP.y, 
    secondCP.x, secondCP.y, 
    endP.x, endP.y)
}

