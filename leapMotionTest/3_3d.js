// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let sliderX, sliderY, sliderZ;
let x, y, z;
let c1, c2;

function setup() {
  createCanvas(600, 600, WEBGL);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  background(20);

  // the slider make move the light from behind (1) to front (1);
   sliderX = createSlider(-10, 10, 1);
   sliderY = createSlider(-10, 10, 1);
   sliderZ = createSlider(-10, 10, 1);
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);
  
}

function draw() {
  orbitControl();
  background(0)
  drawGradient()

  counter++;
  let spd = 0.05;   // If you want accelerate or slow dow the rotation
  let colArray = [ color(204, 102, 0), color(0,30, 71), color(204,93,0), color(0,57,135)]

  x = map(sliderX.value(), -10, 10, -0.1, 0.1)
  y = map(sliderY.value(), -10, 10, -0.1, 0.1)
  z = map(sliderZ.value(), -10, 10, -0.1, 0.1)

  for(i=0;i<colArray.length;i++){
    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
    // console.log(lightPosx, lightPosy, lightPosx * lightPosy)
    directionalLight(colArray[i], 
      lightPosx*x*2,
      lightPosy*y*2, 
      z*2);
  }

  noStroke()
  specularMaterial(0);
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.003)
  rotateZ(frameCount * 0.005)
  torus(50, 70)
  push()
  translate(100, 200, 20)
  torus(50, 70)
  pop()

  //point lighting
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  pointLight(250, 0, 0, locX, locY, 50);

}

function drawGradient(){
  for(let i = -height/2; i <= -height/2+height; i++){ // 0 ~ height
    let inter = map(i, -height/2, -height/2+height, 0, 1);
    let c = lerpColor(c2, c1, inter*(frameCount*0.0005));
    stroke(c);
    line(-width/2, i, -width/2 + width, i);
  }
}