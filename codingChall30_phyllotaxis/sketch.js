var n = 3;
var c = 4;

function setup(){
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB);
  background(0);
}

function draw() {
  var a = n * 137.5;
  var r = c * sqrt(n);

  for (let x = 150; x < 600; x += 150) {
    for (let y = 150; y < 600; y += 150) {
      var x1 = r * cos(a) + x;
      var y1 = r * sin(a) + y;
      // fill(map( (a-r) % 180, 0, 179, 200, 256), (a-r) % 30 + 40, 100);
      // fill((r) % 50, r%30 + 35 , 100); //red-yellow
      fill(r % 85 + 110, r % 20 + 35, r % 60 + 40); //green to blue


      noStroke();
      ellipse(x1,y1, 6, 6);
    }
  }
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
