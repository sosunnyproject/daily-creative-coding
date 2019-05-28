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
  background(0);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * width) * 4;
      var r = noise(xoff, yoff) * 255;
      var v = p5.Vector.fromAngle(random(TWO_PI));  // "i want vector on every spot on the grid."05:10
      xoff += inc;
      stroke(255);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0); // for every vector, rotate according to angle of that random vector
      pop();

    }
    yoff += inc;
  }
  fr.html(floor(frameRate()));
}
