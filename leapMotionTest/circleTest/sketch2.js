let slider;
let speedVal;

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, width, width/2);
}

function draw() {
  background(0, 102, 153);
  noFill();
  stroke(255,128,0);
  strokeWeight(2);
  speedVal = slider.value();

  singleEllipse();
  // rippleEllipse();
  // multipleEllipse();
}

function singleEllipse(){
  ellipse(width/2, height/2, sin(frameCount*0.01)*speedVal, sin(frameCount*0.01)*speedVal)
}

function rippleEllipse() {
  for (let i = 0; i < 0.01; i += 0.001) {
  ellipse(mouseX, mouseY, sin(frameCount*i)*200, sin(frameCount*i)*200)
  }
}

function multipleEllipse() {
  stroke(255,128,0);

  for (let i = 0; i < width; i += 10) {
    ellipse(mouseX, mouseY, 
            sin(frameCount*speedVal)*i, sin(frameCount*speedVal)*i)

    // ellipse(mouseX, mouseY, (30 + i), (30 + i))
  }
}