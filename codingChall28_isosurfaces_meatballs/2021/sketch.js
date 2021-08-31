let b;
let brightness = 300;
let blobs = []

function setup() {
  createCanvas(400, 400);
  b = new Blob(100, 100, 20); // single
  
  // multiple blobs
  // for(let i = 0; i < 5; i++) {
  //   let blob = new Blob(random(width), random(height), Math.floor(random(15, 25)))
  //   blobs.push(blob);
  // }
}

function draw() {
  background(51);
  noFill()
  loadPixels();
  for(let x = 0; x < width; x+=2) {
    for (let y = 0; y < height; y+=2) {
      let d = dist(x, y, b.pos.x, b.pos.y)
      let col = brightness * b.r / d
      // pixels[ind] = color(255, 0, 255) // processing only
      set(x, y, color(col))  // p5js
    }
  }
  updatePixels();
  
  stroke(255, 0, 0)
  line(width/2, height/2, b.pos.x, b.pos.y)
  
  b.update();
  b.show()
}