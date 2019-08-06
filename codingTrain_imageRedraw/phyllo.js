var n = 3;
var c = 5;

function preload() {
  poster = loadImage("wildflower_tp.png");
}

function setup(){
  createCanvas(450, 450);
  angleMode(DEGREES);
  colorMode(HSB);
  poster.loadPixels();
  background(0);
}

function draw() {
  var a = n * 137.5;
  var r = c * sqrt(n);

  var x1 = r * cos(a) + width/2;
  var y1 = r * sin(a) + height/2;
  let pix = poster.get(x1, y1);

  // fill(a % 180 + 20, a % 20 + 35, 100);
  // fill(map((a-r) % 180, 0, 179, 180, 256), (a-r) % 20 + 35, 100); //blue to purple
  // fill((r) % 50, 43, 100); //red-yellow
  // fill(n % 85 + 110,  n % 20 + 35, 100); //green to blue
  fill(map(pix[1], 0, 255, 150, 360), r % 20 + 45, n % 40 + 60); // red to orange
  noStroke();
  ellipse(x1,y1, 8,8);

  n++;
}
