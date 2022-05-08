// let b;
let blobs = [];

function setup() {
  createCanvas(150, 150);
  colorMode(HSB);
  // b = new Blob(200, 200);
  for (let i = 0; i < 4; i++) {
    blobs.push(new Blobby(random(0, width), random(0, height), random(3,5)));
  }
}

function draw() {
  background(51);

  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let index = x + y * width;
      let sum = 0;

      for (let i = 0; i < blobs.length; i++) {
        let d = dist(x, y, blobs[i].pos.x, blobs[i].pos.y);
        sum += 750 * blobs[i].r / d;

        set(x, y, color(sum%300, 50, 70));
        // set(x, y, color(constrain(sum, sum-30, 75), 42, 80));

      }
    }
  }
  updatePixels();
  for (let i = 0; i < blobs.length; i++) {
    blobs[i].update();
    blobs[i].show();
  }

}
