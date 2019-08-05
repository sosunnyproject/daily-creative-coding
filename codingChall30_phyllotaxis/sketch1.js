var n = 3;
var c = 5;

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB);
  background(0);
}

function draw() {
  var a = n * 137.5;
  var r = c * sqrt(n);

  var x1 = r * cos(a) + width/2;
  var y1 = r * sin(a) + height/2;
  // fill(a % 180 + 20, a % 20 + 35, 100);
  // fill(map((a-r) % 180, 0, 179, 180, 256), (a-r) % 20 + 35, 100); //blue to purple
  // fill((r) % 50, 43, 100); //red-yellow
  // fill(n % 85 + 110,  n % 20 + 35, 100); //green to blue
  fill(r % 30, r % 20 + 45, n % 40 + 60); // red to orange


  noStroke();
  // ellipse(x1,y1, 8,8);
  translate(x1, y1);
  push();
  triangle(40, 100, 20, 85, 20, 115);
  pop();

  n++;
}
