let sliderX, sliderY;
let x, y;

function setup() {
  createCanvas(700, 700);
  sliderX = createSlider(0, width, width/2);
  sliderY = createSlider(0, height, height/2);
}

function draw() {
  background(0, 10);
  noFill();
  let rand = sin(frameCount*0.01)*100
  stroke(148+rand,0+rand,211-rand);
  strokeWeight(Math.abs(rand)/3);
  x = sliderX.value()
  y = sliderY.value()

  singleEllipse();
}

function singleEllipse(){
  ellipse(width/2, height/2, x, y)
}
