// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let sliderX, sliderY, sliderZ;
let x, y, z;
let btnVal = 0;
let c1, c2;
let Y_AXIS = 1;
let balls = [];
let target;

function setup() {
  createCanvas(600, 600, WEBGL);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  background(20);

  // the slider make move the light from behind (1) to front (1);
   sliderX = createSlider(0.01, 2, 0.3);
   sliderY = createSlider(0.01, 2, 0.3);
   sliderZ = createSlider(0.01, 2, 0.3);
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);
  
  for(let i = 0; i < 20; i++) {
    let b = new Ball();
    balls.push(b);
  }
}

function draw() {
  background(0);
  orbitControl();

  counter++;
  let spd = 0.25;   // If you want accelerate or slow dow the rotation
  let colArray = [ color(204, 102, 0), color(0,30, 71), color(204,93,0), color(0,57,135)]

  for(i=0;i<colArray.length;i++){
    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
    directionalLight(colArray[i], lightPosx*0.001*sliderX.value()/2,lightPosy, lightPosx*lightPosy*0.001*sliderX.value());
  }

  x = sliderX.value()
  y = sliderY.value()
  z = sliderZ.value()
  
  push()
  translate(x, y, z);
  fill(255);
  noStroke()
  rotateZ(frameCount*0.003);
  rotateY(frameCount*0.002);
  rotateX(frameCount*0.005);
  torus(70, 20);
  pop()

  target = createVector(x, y, z)

  for(let i = 0; i < balls.length; i++){
    push();
    translate(balls[i].loc.x, balls[i].loc.y, balls[i].loc.z);
    balls[i].display();
    balls[i].update(x, y, z);
    balls[i].bound();
    balls[i].seek(target);
    pop();
  }
}

function drawGradient(){
  btnVal += 1;
  for(let i = -height/2; i <= -height/2+height; i++){ // 0 ~ height
    let inter = map(i, -height/2, -height/2+height, 0, 1);
    let c = lerpColor(c2, c1, inter*(btnVal*0.05));
    stroke(c);
    line(-width/2, i, -width/2 + width, i);
  }
  // rect(-width/2, -height/2, width, btnVal);

}