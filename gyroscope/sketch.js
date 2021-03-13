function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(225, 0, 0);
  // beta - x axis
  let ox = document.getElementById('Orientation_b').innerText
  textSize(30)
  text(ox, 50, 50)
  let oxNum = Number.parseInt(Math.floor(ox))
  let oxcoord = map(oxNum, -80, 80, 0, height)
  
  // gamma y-axis
  let oy = document.getElementById('Orientation_g').innerText
  let oyNum = Number.parseInt(Math.floor(oy))
  let oycoord = map(oyNum, -100, 100, 0, width)

  // ellipse(oycoord, oxcoord, 40)
  
  // rotateY(millis() / 1000);
  // noStroke()
  fill(0, 255, 255)
  rotateX(detailY.value())
  rotateZ(66)
  cone(30, 38, 16, 10);
  translate(0, -height/2+160)
  sphere(36, 10)
}