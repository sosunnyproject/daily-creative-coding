let d = 8;
let n = 5;
let slider;
let sliderD;
let sliderN;

function setup() {
  createCanvas(400, 400);
  sliderD = createSlider(1, 10, 5, 0.5);
  sliderN = createSlider(1, 10, 5, 0.5);


}

function draw() {
  // k = slider.value();
  d = sliderD.value();
  n = sliderN.value();
  let k = n / d;
  background(0);
  translate(width/2, height/2);

  beginShape();
  stroke(255);
  noFill();
  strokeWeight(1);
  for (var a = 0; a < TWO_PI * d; a += 0.02) {
    var r = 200 * cos(k * a);
    var x = r  * cos(a);
    var y = r * sin(a);
    vertex(x,y);
  }
  endShape();
}
