let d = 8;
let n = 5;
let slider;
let sliderD;
let sliderN;

function setup() {
  createCanvas(400, 400);
  // sliderD = createSlider(1, 10, 5, 0.5);
  // sliderN = createSlider(1, 10, 5, 0.5);
}

function draw() {
  // k = slider.value();
  // d = sliderD.value();
  // n = sliderN.value();

  // mult decimal values to tone down the speed
  d = map(sin(frameCount*0.002),-1, 1, 1, 10);
  n = map(cos(frameCount*0.005),1, -1, 5, 15);

  let k = n / d;
  background(0);
  translate(width/2, height/2);
  colorMode(HSB);
  beginShape();
  // stroke(255);
  noFill();
  stroke(map(tan(frameCount*0.025), -1, 1, 200, 360), 50, 255);
  strokeWeight(1);

  // change a ++ inc value : circle to n-angled shapes
  for (var a = 0; a < TWO_PI * d; a += 0.5) {
    var r = 200 * cos(k * a);
    var x = r  * cos(a);
    var y = r * sin(a);
    vertex(x,y);
  }
  endShape();
}
