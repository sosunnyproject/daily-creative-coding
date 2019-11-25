let rows, cols, scl = 2, softness = 30;
let w = 600;
let h = 600;

function setup() {
  noStroke();
  createCanvas(w, h);
  background(220);
  rows =  h / scl;
  cols = w / scl;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
     let colorG = Math.floor(noise(i/softness, j/softness)*255);
      fill(colorG);
      rect(i*scl, j*scl, scl, scl);
    }
  }
}

function draw() {
}
