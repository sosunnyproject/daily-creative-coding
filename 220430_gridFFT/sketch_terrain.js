var cols, rows;
var scl = 20;
var w = 1200;
var h = 1800;

var flying = 0;
var terrain = []; //2d array to have num of cols, rows; store x and y data
let mic, micLevel;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cols = w/scl;
    rows = h/scl;
    // terrain = [cols][rows];
    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0;
      }
    }

  // audio
	mic = new p5.AudioIn()
	mic.start()
  getAudioContext().resume();

}

function draw() {
  micLevel = (mic.getLevel()+0.05)*10

  flying -= random(0.3, 0.6)
  var yoff = flying
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -50*micLevel, 50*micLevel);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  noFill();

  translate(0, -100, -300);
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

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}