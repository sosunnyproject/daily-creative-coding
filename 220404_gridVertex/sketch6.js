// wing shape

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)
  noFill()
}
function draw() {
  background(220);
  
  let thetaR = -sin(frameCount) * 20 
  let thetaR2 = -sin(frameCount) * 30 
  let thetaR3 = -sin(frameCount) * 40 
  let thetaR4 = -sin(frameCount) * 50 
  let thetaR5 = -sin(frameCount) * 60 
  let thetaR6 = -sin(frameCount) * 70 
  let thetaR7 = -sin(frameCount) * 80

  let thetaL = 180 + sin(frameCount) * 20
  let thetaL2 = 180 + sin(frameCount) * 30
  let thetaL3 = 180 + sin(frameCount) * 40
  let thetaL4 = 180 + sin(frameCount) * 50
  let thetaL5 = 180 + sin(frameCount) * 60
  let thetaL6 = 180 + sin(frameCount) * 70
  let thetaL7 = 180 + sin(frameCount) * 80

  beginShape()
  vertex(width/2, height/2)
  vertex(width/2 + 20*cos(thetaL), height/2 + 20*sin(thetaL))
  vertex(width/2 + 40*cos(thetaL2), height/2 + 40*sin(thetaL2))
  vertex(width/2 + 60*cos(thetaL3), height/2 + 60*sin(thetaL3))
  vertex(width/2 + 80*cos(thetaL4), height/2 + 80*sin(thetaL4))
  vertex(width/2 + 100*cos(thetaL5), height/2 + 100*sin(thetaL5))
  vertex(width/2 + 120*cos(thetaL6), height/2 + 120*sin(thetaL6))
  vertex(width/2 + 140*cos(thetaL7), height/2 + 140*sin(thetaL7))
  endShape()
  
  beginShape()
  vertex(width/2, height/2)
  vertex(width/2 + 20*cos(thetaR), height/2 + 20*sin(thetaR))
  vertex(width/2 + 40*cos(thetaR2), height/2 + 40*sin(thetaR2))
  vertex(width/2 + 60*cos(thetaR3), height/2 + 60*sin(thetaR3))
  vertex(width/2 + 80*cos(thetaR4), height/2 + 80*sin(thetaR4))
  vertex(width/2 + 100*cos(thetaR5), height/2 + 100*sin(thetaR5))
  vertex(width/2 + 120*cos(thetaR6), height/2 + 120*sin(thetaR6))
  vertex(width/2 + 140*cos(thetaR7), height/2 + 140*sin(thetaR7))
  endShape()
   
}