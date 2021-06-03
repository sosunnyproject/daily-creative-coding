let detailX = 12
let detailY = 16
let speed = 0.01

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	
}

function draw() {
  background(0);
  speed = sin(frameCount/200)
  detailX = Math.floor(map(speed, -1, 1, 3, 24))
  detailY = Math.floor(map(speed, 1, -1, 4, 16))
  renderShapes()
}


function renderShapes(){
  renderLights();
  noStroke();
  shininess(3);

  const size = 50 + speed*50
  sphere(width/12)
  specularMaterial(250);


  push()
  rotateX(frameCount * 0.007)
  rotateY(frameCount * 0.006)
  rotateZ(frameCount * 0.007)
  torus(width/6, size, detailX, detailY)
  pop()
}


function renderLights() {
  orbitControl();

  x = map(mouseX, 0, width, -1.0, 1.0)
  y = map(mouseY, height, 0, -1.0, 1.0)
  z = map(mouseX/mouseY, 1, width/height, -1.0, 1.0)
  
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colSin = 154 + sin(frameCount/200)*100
  let colCos = 135 + cos(frameCount/200)*100
  let colArray = [ color(colSin, 102, 255-colSin),  color(colCos,107,255-colCos)] // 0, 57, 135

  for(i=0;i<colArray.length;i++){
    lightPosx = tan(((TWO_PI/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
      lightPosx * x * 25,
      lightPosy * y * 30, 
      z*30);
  }
}
