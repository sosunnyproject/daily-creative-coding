// https://editor.p5js.org/sosunnyproject/sketches/sUwfE3ULT
// https://editor.p5js.org/sosunnyproject/sketches/yzRFOVdXU

// slide to see how detailY works
let detailY, detailZ;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  detailY = createSlider(-360, 360, 0);
  detailZ = createSlider(-360, 360, 0);
  // detailY.position(10, height + 5);
  // detailZ.position(10, height+14)
  detailY.style('width', '80px');
  // normalMaterial()
  specularMaterial(200)
  background(255)
  orbitControl()
  fill(255)
  
  for(let i = 0; i< 5; i++) {
    // drawWaterdrop(random(-width/2 +100, width/2 - 100), 
                  // random(-height/2 + 100, height/2-100))
  }
}

function draw() {

}

function drawWaterdrop(x, y) {
  push()
  translate(x, y)
  fill(255)
  // map(frameCount, 0, 100000, 0, 255), 
  // map(mouseY, -height/2, height/2, 0, 150), 

  stroke(0, 
         map(frameCount, 0, 1000, 0, 255),
         255)
  rotateX(detailY.value())
  rotateZ(66)
  cone(31, 46, 10, 4, false);
  translate(0, -height/2 + 140)
  sphere(36, 10, 7)
  pop()
}

function mouseClicked() {
  drawWaterdrop(mouseX-width/2, mouseY-height/2)
}

function keyTyped(){
  if (key === 'a') {
    saveCanvas('waterdrop', 'png')
  }
}