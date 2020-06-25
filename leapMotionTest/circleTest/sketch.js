let slider;
let speedVal;
let circle; 
let circles = []

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, 10, 5);
}

function draw() {
  // circle = new Circle(mouseX, mouseY);
  background(0, 102, 153);
  noFill();
  stroke(255,128,0);
  strokeWeight(2);
  speedVal = map(slider.value(), 0, 10, 0, 0.01);
  
  if(frameCount%50 === 0 && circles.length < 10) {
    console.log(circles)
    circles.push(new Circle(mouseX, mouseY))
  }

  // while(circles.length < 10) {
  //   if(frameCount%50 === 0) {
  //     circles.push(new Circle(mousex, mouseY))
  //   }
  // }
 
  for(let i = 0 ; i < circles.length; i++) {
    circles[i].singleEllipse()
  }

}

