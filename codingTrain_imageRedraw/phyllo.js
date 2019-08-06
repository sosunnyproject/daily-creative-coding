var n = 3;
var c = 4;

function preload() {
  poster = loadImage("wildflower_tp.png");
}

function setup(){
  createCanvas(450, 450);
  angleMode(DEGREES);
  background(0);
  tint(255, 30);
  background(poster);

  colorMode(HSB);
  poster.loadPixels();

  // loadPixels();
  // poster.loadPixels();
  // for (let x=0; x < width; x++) {
  //   for (let y=0; y < height; y++) {
  //     let index = (x + y * width);
  //     let r = red(poster.pixels[index]);
  //     let g = green(poster.pixels[index]);
  //     let b = blue(poster.pixels[index]);
  //     pixels[index] = color(r, g, b);
  //   }
  // }
  // updatePixels();
}

function draw() {
  // background(poster, 120);
  // image(poster, 0, 0);

  var a = n * 137.5;
  var r = c * sqrt(n);

  var x1 = r * cos(a) + width/2;
  var y1 = r * sin(a) + height/2;
  let pix = poster.get(x1, y1);

  // fill(a % 180 + 20, a % 20 + 35, 100);
  // fill(map((a-r) % 180, 0, 179, 180, 256), (a-r) % 20 + 35, 100); //blue to purple
  // fill((r) % 50, 43, 100); //red-yellow
  // fill(n % 85 + 110,  n % 20 + 35, 100); //green to blue
  fill(map(pix[1], 0, 255, 160, 360), r % 20 + 45, n % 50 + 60); // red to orange
  // fill(pix, 20);

  noStroke();
  ellipse(x1,y1,6,6);

  n++;
}
