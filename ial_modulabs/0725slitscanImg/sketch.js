var img;
var x = 0;
var appleX = 0;

function preload(){
  img = loadImage('gal1.JPG');
}

function setup() {
  createCanvas(img.width, img.height);
  console.log(img.width, img.height)
  background(0);
  // image(img, 0, 0);
  // copy(img, 0, 0, 200, height, 200, 0, 200, height);
}

function draw() {

  // rect(x, 0, 1, height);
  copy(img, appleX, 0, 1, img.height, x, floor(mouseY*0.2), 1, img.height);
  x++;
  if(!mouseIsPressed) appleX++;
  if(x > width) x = 0;
  if(appleX > img.width) appleX = 0;
}
