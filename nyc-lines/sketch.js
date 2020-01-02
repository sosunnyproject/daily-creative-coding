let bgImg;
let rad = 9;
let gap = 10;

function preload(){
  bgImg = loadImage('nyc1.jpg');
}
function setup() {
  createCanvas(400, 400);
  bgImg.resize(400, 0);

  image(bgImg, 0, 0);
  image(bgImg, 0, bgImg.height);
  image(bgImg, 0, bgImg.height*2);

}

function draw() {
  // background(255);
  for(let x = 0; x < width; x += gap) {
    for(let y = 0; y < height; y += gap) {

      let color = bgImg.get(x, y);

      if(bgImg.height < y) {
        color = bgImg.get(x, y - bgImg.height);
      }

      if(bgImg.height * 2 < y) {
        color = bgImg.get(x, y - bgImg.height*2);
      }

      fill(color);
      noStroke();
      ellipse(x, y, rad, rad);
    }
  }
}
