var inc = 0.1; //increment
var scl = 10; //scale
var cols, rows;
var zoff = 0;
var fr; //framerate
var particles = [];
var flowfield;

function setup(){
  createCanvas(200, 200);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element

  flowfield = new Array(cols*rows); //preset the size of array

  for (var i = 0; i < 100; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(0);
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);  // "i want vector on every spot on the grid."05:10
      flowfield[index] = v;
      xoff += inc;

      stroke(255, 100);
      strokeWeight(0.5);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0); // for every vector, rotate according to angle of that random vector
      pop();

    }
    yoff += inc;
    //zoff += 0.001;  // fixed flow field, if you comment this
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    // find appropriate, nearby vector 
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
  fr.html(floor(frameRate()));
}
