let d = 9;
let n = 4;
let locX, locY;
let hue1, hue2, strokeW, count, newX, newY, angle, diff;
let sliderD, sliderN, sliderH, sliderW, sliderC, sliderX, sliderY, sliderA;
let r = 10;
function setup() {
  createCanvas(750, 450);
  sliderD = createSlider(1, 10, 5, 0.2);
  sliderN = createSlider(5, 15, 5, 0.2);
  sliderH =  createSlider(0, 360, 5, 0.5);
  sliderW =  createSlider(0.5, 5, 1, 0.5);
  sliderC = createSlider(1, 10, 3, 1);

  sliderX = createSlider(0, 100, 0, 1)
  sliderY = createSlider(0, 200, 0, 1)

  sliderA = createSlider(0.01, 3, 0.5, 0.01);
  colorMode(HSB);

}

function draw() {
  background(hue1, 100, 100);

  d = sliderD.value();
  n = sliderN.value();
  hue1 = sliderH.value();
  hue2 = (hue1+180)%240;
  strokeW = sliderW.value();
  count = sliderC.value();
  gapI = sliderX.value();
  newY = sliderY.value();
  angle = sliderA.value();

  textSize(12);
  fill(200);
  text('d:', 10, 30);
  text(d, 20, 30);
  text('n:', 40, 30);
  text(n, 55, 30);
  text('count:', 0, 50);
  text(count, 40, 50);
  text('gapI:', 0, 90);
  text(gapI, 40, 90);
  text('newY:', 0, 120);
  text(newY, 40, 120);
  text('angle', 0, 70);
  text(angle, 40, 70);

  let k = n / d;
  translate(10, height/10);
  // diff = 0;

  for(let i=0; i < width; i += gapI){
    // rotate();
    push();
    // translate(width/2, height/2)
    locX = i
    locY = map(sin(i), -1, 1, 0, height);
    translate(locX, locY);
    beginShape(LINES);
    stroke(hue2, 50, 255);
    noFill();
    strokeWeight(strokeW);
    // k += diff;
    // for loop
    a = angle;
    for (let a = 0; a < TWO_PI * d; a+= angle) {
      let r = 100 * cos(k * a);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape();
    pop();
    // diff += 30;
  }

}
