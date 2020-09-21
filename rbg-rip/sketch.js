let img;
let pixels = []
function preload() {
  img = loadImage('rbg-photo-whitebg.jpg');

}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0)

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let c = img.get(i, j)
      if (c[2] < 150 && c[1] < 150) {
        pixels.push({x: i, y: j})
      }
    }
  }

  background(255)
  for (let i = 0; i < pixels.length; i++) {
      stroke(0, 0, 255)
      ellipse(pixels[i].x, pixels[i].y, 1)
    }
}

function draw() {


    let c = img.get(mouseX, mouseY);
    console.log(mouseX, mouseY)

  
}