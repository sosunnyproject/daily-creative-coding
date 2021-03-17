// https://editor.p5js.org/sosunnyproject/sketches/sUwfE3ULT
// no gyro integrated yet
// slide to see how detailY works
let detailY, detailZ;

function setup() {
  createCanvas(400, 400, WEBGL);
  
  detailY = createSlider(-360, 360, 0);
  detailZ = createSlider(-360, 360, 0);
  // detailY.position(10, height + 5);
  // detailZ.position(10, height+14)
  detailY.style('width', '80px');
  // normalMaterial()
  specularMaterial(200)
}

function draw() {
  // background(205, 102, 94);
  background(255)
  orbitControl()
  
  // beta - x axis
  let ox = document.getElementById('Orientation_b').innerText
  let oxNum = Number.parseInt(Math.floor(ox))
  let oxcoord = map(oxNum, -80, 80, 0, height)
  
  // gamma y-axis
  let oy = document.getElementById('Orientation_g').innerText
  let oyNum = Number.parseInt(Math.floor(oy))
  let oycoord = map(oyNum, -100, 100, 0, width)

  // ellipse(oycoord, oxcoord, 40)
  
  // rotateY(millis() / 1000);
  // noStroke()
  // fill(0, 255, 255, 100)
  fill(255)
  rotateX(detailY.value())
  rotateZ(66)
  cone(30, 38, 10, 4, false);
  translate(0, -height/2+160)
  fill(255)
  sphere(36, 10, 7)

}

function keyTyped(){
  if (key === 'a') {
    saveCanvas('waterdrop', 'png')
  }
}