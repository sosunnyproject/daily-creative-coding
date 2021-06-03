
let detailX = 24
let detailY = 16
let lightPosx, lightPosy

let psArray = [] // 생성할 파티클s
const numParticles = 30
let isRock = 0;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	blendMode(REPLACE);
}

function draw() {
  background(0);
  specularMaterial(105);
  shininess(4);


  let colArray = [ color(0, 32, 250), color(0, 32, 250), color(0, 113, 254), 
  color(10, 13, 20), color(10, 13, 254),color(0, 0, 255), color(0, 203, 254)]
  const speed = sin(frameCount/200)/10
  
  for(i=0;i<colArray.length;i++){
    lightPosx = sin(((TWO_PI*2/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
	lightPosx * cos(frameCount/100) * 45,
	lightPosy * sin(frameCount/105) * 60, 
	sin(frameCount/100) * 30);
  }
  
  noStroke();
  push();
  translate(0, 0)
  rotateX(cos(frameCount/150) * TWO_PI)
  rotateY(cos(frameCount/150) * TWO_PI)
  rotateZ(sin(frameCount/200) * TWO_PI)

  //cone(80, 108, 22, 8, false);
  //translate(0, -100)
  //sphere(90, 12, 10)
  cone(30, 38, 10, 4, false);
  translate(0, -40)
  sphere(36, 10, 7)
  pop()
  
  push()
  //rotateX(frameCount * 0.007)
  //rotateY(frameCount * 0.006)
  //rotateZ(frameCount * 0.007)
  plane(width*2, height*3)
  //sphere(width)
  pop()
}

function renderRaindrop() {
  push();
  translate(0, 0)
  rotateY(cos(frameCount/150) * TWO_PI)
  rotateZ(sin(frameCount/200) * PI)

  cone(30, 38, 10, 4, false);
  translate(0, -40)
  sphere(36, 10, 7)
  pop()
}