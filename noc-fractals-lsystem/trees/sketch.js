
let theta1 = 6
let theta2 = 3
function setup() {
    createCanvas(700, 900);
}

function draw() {
  background(10);
  
  stroke(255)
  strokeWeight(1)
  tree(width/2, 100)
  // tree(width/3, 130)
  // tree(width -width/6, 120)
  theta1 = 3 + tan(frameCount/100) * 5
  theta2 = 2 + cos(frameCount/100)*10
}

function tree(xpos, len) {
  push()
  translate(xpos, height/2);
  line(0, 0, 0, len);
  
  branch(len)
  pop()
}

function branch(len) {
  // const newLen = len * sin(frameCount*0.1)
  line(0, 0, 0, -len + 4*cos(frameCount)) // *sin(frameCount*0.05)
  translate(0, -len)
  
  // len += sin(millis()) * 0.9
  len *= 0.8

  if(len > 6) {
    push()
    rotate(PI/theta1)
    branch(len)
    pop()

    push()
    rotate(-PI/theta2)
    branch(len)
    pop()    
  }

}