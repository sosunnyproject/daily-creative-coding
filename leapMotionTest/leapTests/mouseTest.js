// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let mouse;
let slider, s2;
let c1, c2;
let Y_AXIS = 1;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(0, 102, 153);
  
  // the slider make move the light from behind (1) to front (1);
   slider = createSlider(4, 10, 6, 0.05);
   s2 = createSlider(0.005, 0.03, 0.015, 0.005);
  
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);  
}

function draw() {
  background(c2, 0.3)
  mouse = createVector(mouseX, mouseY)
  drawYGradient()
}

function mouseMoved(){

}

function drawYGradient(){
  for(let i = -height/2; i <= height/2; i++){ // -height/2 ~ height/2
    const interY = map(i, -height/2, height/2, 0, 1)  // 0 ~ 1 : blue at top, 1 ~ 0: orange at top
    const coordY = (height - Math.abs(mouseY)) + 100
    const ratioY =  interY*coordY*0.005 
    const borderY = lerpColor(c2, c1, ratioY)
    stroke(borderY)
    line(-width/2, height/2, width/2, i);
  }
}

function drawXGradient(){
  for(let j = -width/2; j <= width/2; j++){ 
    const interX = map(j, -width/2, width/2, 0, 1)
    const coordX = width - Math.abs(mouseX)
    const ratioX = interX*coordX*0.005
    const borderX = lerpColor(c2, c1, ratioX)
    stroke(borderX)
    line(j, -height/2, j, height/2)
  }
}
