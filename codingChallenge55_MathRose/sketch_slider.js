let d = 9;
let n = 4;
let hue1, hue2, strokeW, count, newX, newY, angle, diff;
let sliderD, sliderN, sliderH, sliderW, sliderC, sliderX, sliderY, sliderA;

 function setup() {
  createCanvas(750, 750);

  sliderD = createSlider(1, 10, 5, 0.2);
  sliderN = createSlider(5, 15, 5, 0.2);
  sliderH =  createSlider(0, 360, 5, 0.5);
  sliderW =  createSlider(0.5, 5, 1, 0.5);
  sliderC = createSlider(1, 10, 3, 1);

   sliderX = createSlider(0, 200, 0, 1)
  sliderY = createSlider(0, 200, 0, 1)

   sliderA = createSlider(0.01, 3, 0.5, 0.01);
  // colorMode(HSB);

 }
 function keyTyped() {
  if (key === 's') {
    saveCanvas('myCanvas', 'png');
  }
}

 function draw() {
  background(255, 1.0);
  clear()

  d = sliderD.value();
  n = sliderN.value();
  // hue1 = sliderH.value();
  // hue2 = (hue1+180)%255;
  strokeW = sliderW.value();
  count = sliderC.value();
  newX = sliderX.value();
  newY = sliderY.value();
  angle = sliderA.value();

  //  textSize(12);
  // fill(200);
  // text('d:', 10, 30);
  // text(d, 20, 30);
  // text('n:', 40, 30);
  // text(n, 55, 30);
  // text('count:', 0, 50);
  // text(count, 40, 50);
  // text('newX:', 0, 90);
  // text(newX, 40, 90);
  // text('newY:', 0, 120);
  // text(newY, 40, 120);
  // text('angle', 0, 70);
  // text(angle, 40, 70);

   let k = n / d;
  translate(width/2, height/2);
  diff = 0;
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push();
    translate(newX, newY);
    beginShape(LINES);
    stroke(0);
    noFill();
    strokeWeight(strokeW);
    // k += diff;
    // for loop
    for (let a = 0; a < TWO_PI * d; a+= angle) {
      let r = 200 * cos(k * a);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape();
    pop();
    diff += 0.25
  }

 }
