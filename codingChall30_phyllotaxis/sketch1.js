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
  ellipse(x1,y1, 8,8);
/*
  var x1 = r * cos(a) + 150;
  var y1 = r * sin(a) + 150;
  fill((n-r)%255, 50, 250);
  noStroke();
  ellipse(x1,y1,15, 15)

  var x2 = r * cos(a) +300;
  var y2 = r * sin(a) +300;
  fill(r%255, 50, 250);
  noStroke();
  ellipse(x2,y2,15, 15)


  var x3 = r * cos(a) + 450;
  var y3 = r * sin(a) + 150;
  fill((n+a)%255, 50, 250);
  noStroke();
  ellipse(x3,y3,15, 15)

  var x4 = r * cos(a) + 450;
  var y4 = r * sin(a) + 450;
  fill(n%255, 50, 250);
  noStroke();
  ellipse(x4,y4,15, 15)

  var x5 = r * cos(a) + 150;
  var y5 = r * sin(a) + 450;
  fill((a-r)%255, 50, 250);
  noStroke();
  ellipse(x5,y5,15, 15)
  */
  n++;
}
