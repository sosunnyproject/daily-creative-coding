let b;

function setup() {
  createCanvas(400, 300);
  b = new Blob(200, 200);
}

function draw() {
  background(51);

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = x + y * width;
      let d = dist(x, y, b.pos.x, b.pos.y);
      let col = 1000 * b.r / d;
      set(x, y, color(col));
    }
  }
  updatePixels();
  b.update();
  b.show();

}
