var inc = 0.1; //increment
var scl = 10; //scale
var cols, rows;

var fr; //framerate

function setup(){
  createCanvas(200, 200);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      xoff += inc;
      fill(r);
      rect(x*scl, y*scl, scl, scl);
    }
    yoff += inc;
  }
  fr.html(floor(frameRate()));
}