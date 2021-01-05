function setup() {
  createCanvas(200, 600);
}

function draw() {
  background(255);
    drawFace(width/2, 40, 0, 0 )
  drawFace(width/2, 180, 80)
  drawFace(width/2, 350, -80)
  drawFace(width/2, 480, -80, 100, -40)
}

function drawFace(x, y, offsetY1, offsetY2, offsetX2) {
  push()
  translate(x, y)
  stroke(0)
  strokeWeight(4)
  ellipse(-50, 0, 20, 20)
  ellipse(50, 0, 20, 20)

  //bezier(x1, y1, controlx2, controly2, controlx3, controly3, x4, y4)
  strokeWeight(4)  
  bezier(-50, 50,
    0, 50 + offsetY1,
    50 + (offsetX2 || 0), 50 + (offsetY2 || 0),
    50, 50)

  pop()
  //smile  :)
  //sad    :(
  //indifferent :|
  //confused    :$
}
