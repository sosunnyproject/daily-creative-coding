// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let sliderX, sliderY, sliderZ;
let x, y, z;
let c1, c2;
let reachedEdge = false;

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
  // reachedEdge ? drawDownGradient() : drawUpGradient()

  counter++;
  let spd = 0.015;   // If you want accelerate or slow dow the rotation
  let colArray = [ color(204, 102, 0),  color(0,57,135)]

  x = map(sliderX.value(), -10, 10, -0.1, 0.1)
  y = map(sliderY.value(), -10, 10, -0.1, 0.1)
  z = map(sliderZ.value(), -10, 10, -0.1, 0.1)

  for(i=0;i<colArray.length;i++){
    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
    // console.log(lightPosx, lightPosy, lightPosx * lightPosy)
    directionalLight(colArray[i], 
      lightPosx*x*10,
      lightPosy*y*10, 
      z*5);
  }

  noStroke()
  specularMaterial(200);
  rotateX(frameCount * 0.005)
  rotateY(frameCount * 0.008)
  rotateZ(frameCount * 0.008)
  torus(120, 70)

}

function drawUpGradient(){

    for(let i = -height/2; i <= height/2; i++){ // 0 ~ height
      let inter = map(i, -height/2, height/2, 0, 1);
      let c = lerpColor(c2, c1, inter*(frameCount*0.005));
      stroke(c);
      line(-width/2, i, -width/2 + width, i);
      if(c._array[0] === 1) {
        console.log(c._array[0])
        reachedEdge = true
      }
    }
}

function drawDownGradient(){

    for(let i = height/2; i >= -height; i--){ // 0 ~ height
      let inter = map(i, height/2, -height/2, 0, 1);
      let c = lerpColor(c1, c2, inter*(frameCount*0.005));
      stroke(c);
      line(-width/2, i, -width/2 + width, i);
      if(c._array[0] === 0) {
        console.log(c._array[0])
      }
    }
}