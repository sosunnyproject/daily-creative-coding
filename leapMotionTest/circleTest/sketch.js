let slider, slider2;
let speedVal, opacityVal;
let circle; 
let circles = []
let cnv;
let origin = { x: 0, y: 0}

function setup() {  
  cnv = createCanvas(600, 600);
  slider = createSlider(0, 10, 5);
  slider2 = createSlider(0, 10, 5);
}

function draw() {
  // circle = new Circle(mouseX, mouseY);
  // background(6, 15, 82, 3); //black
  // background(0, 200);
  background(0, 102, 253, 3); // navy
  
  //speed
  speedVal = map(slider.value(), 0, 10, 0, 0.01);
  
  //visual, color of circle
  noFill()
  opacityVal = map(slider2.value(), 0, 10, 0, 1.0);
  opacityVal ? stroke(255,128,0, opacityVal) : stroke(255,128,0);
  strokeWeight(2);

  // call constructor
  if(frameCount%50 === 0 && circles.length < 10) {
    let radius = 100 + frameCount*2
    circles.push(new Circle(mouseX, mouseY, radius))
  }

  cnv.mouseOut(() => {return origin={x: width/2, y: height/2}})
  cnv.mouseOver(() => {return origin={x: 0, y: 0}})
  // while(circles.length < 10) {
  //   if(frameCount%50 === 0) {
  //     circles.push(new Circle(mousex, mouseY))
  //   }
  // }
 
  for(let i = 0 ; i < circles.length; i++) {
    circles[i].singleEllipse(origin.x || mouseX, origin.y || mouseY, speedVal)
  }

}

