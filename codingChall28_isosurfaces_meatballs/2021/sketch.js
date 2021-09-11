let b;
let brightness = 300;
let blobs = []
let controller, bValue;

function setup() {
  createCanvas(400, 400);
  // b = new Blob(100, 100, 20); // single
  
  // multiple blobs
  for(let i = 0; i < 3; i++) {
    let blob = new Blob(random(width), random(height), Math.floor(random(15, 20)))
    blobs.push(blob);
  }

  controller = createSlider(100, 1000, 300)
}

function draw() {
  background(51);
  noFill()
  loadPixels();
  bValue = controller.value();

  for(let x = 0; x < width; x+=2) {
    for (let y = 0; y < height; y+=2) {
      
      // MULTIPLE BLOBS
      // look for distance, color of each blobs and caculate one another, sum all
      let sum = 0; // init
      for (let i = 0; i < blobs.length; i++){
        let d = dist(x, y, blobs[i].pos.x, blobs[i].pos.y);
        sum += (blobs[0].r * bValue) /  (d)
      }
      // pixels[ind] = color(255, 0, 255) // processing only
      set(x, y, color(sum, 0, 9))  // p5js

    }
  }
  updatePixels();
  
  for (let i = 0; i < blobs.length; i++){
    blobs[i].update();
    blobs[i].show()
    line(width/2, height/2, blobs[i].pos.x, blobs[i].pos.y)
    // b.show()
  }
}