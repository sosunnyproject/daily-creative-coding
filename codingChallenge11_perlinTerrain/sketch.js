var cols, rows;
var scl = 20;
var w = 1200;
var h = 900;

var flying = 0;
var terrain = []; //2d array to have num of cols, rows; store x and y data

function setup() {
    createCanvas(600, 600, WEBGL);
    cols = w/scl;
    rows = h/scl;
    // terrain = [cols][rows];
    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0;
      }
    }
}

function draw() {
  flying -= 0.2;
  var yoff = flying
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -50, 50);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  noFill();

  translate(0, 50);
  rotateX(PI/3);
  frameRate(10);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);

    for (var x = 0; x < cols; x++) {
      stroke(0, random(150, 200), random(150, 250));
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y+1) * scl, terrain[x][y+1]);
    }
    endShape();
  }
}
