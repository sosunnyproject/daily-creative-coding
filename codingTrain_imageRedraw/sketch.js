let poster, smallPoint, largePoint;

function preload() {
  poster = loadImage("wildflower.png");

}
function setup() {
  createCanvas(600, 600);
  smallPoint = 10;
  largePoint = 15;
  imageMode(CENTER);
  noStroke();
  background(255);
  poster.loadPixels();
  colorMode(HSB);

}

function draw() {
  let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
  let x = floor(random(poster.width));
  let y = floor(random(poster.height));
  let pix = poster.get(x, y);
  colorMode(HSB);
  fill(map(pix[1], 0, 255, 150, 360), 30, 200);
  // console.log(pix);
  ellipse(x, y, pointillize, pointillize);

}
