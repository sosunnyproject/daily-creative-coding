let img1, img2, img3, bgImg;
let rad = 5;
let gap = 10;

function preload() {
  img1 = loadImage('paris-night1.jpg');
  img2 = loadImage('seoul-night3.jpg');
  img3 = loadImage('budapest-night1.jpg');
}

function setup() {
  bgImg = img1;
  createCanvas(800, 600);
  bgImg.resize(800, 600);

  /* for nyc1.jpg - 3 pics
  image(bgImg, 0, 0);
  image(bgImg, 0, bgImg.height);
  image(bgImg, 0, bgImg.height*2);
  */
}


function draw() {
  background(0);
  if (mouseIsPressed) {
    background(bgImg);
  }

  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {

      let color = bgImg.get(x, y);

      // color = bgImg.get(x, y - bgImg.height);

      // 80: without sky
      if (brightness(color) > 50) {
        fill(color);
        noStroke();
        rect(x, y, 5, rad * noise(frameCount * 0.5) * random(3));
      }
    }
  }
}

function keyPressed() {
  if (event.key === '1') {
    bgImg = img1;
  } else if (event.key === '2') {
    console.log(keyCode);
    bgImg = img2;
  } else if (event.key === '3') {
    bgImg = img3;
  }
}
