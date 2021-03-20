//https://editor.p5js.org/sosunnyproject/sketches/UcZWedhVy
var inc = 0.1; //increment
var scl = 10; 
var cols, rows;
var zoff = 0;
var fr; //framerate
var particles = [];
var flowfield;
let angle = 0

function setup(){
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element

  flowfield = new Array(cols*rows); //preset the size of array

  for (var i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }

  background(0);

}

function draw() {
  background(0, 10);
  flowField()
  // fr.html(floor(frameRate()));
}

function flowField() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      var v = p5.Vector.fromAngle(angle);  // "i want vector on every spot on the grid."05:10
      v.setMag(2); // full units, no limit..need to set maximum limit
      flowfield[index] = v;
      xoff += inc;

      // stroke(255, 100);
      // strokeWeight(0.5);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0); // for every vector, rotate according to angle of that random vector
      pop();

    }
    yoff += inc;
    zoff += 0.00004;  // fixed flow field, if you comment this
  }

  runParticles()
}

function runParticles(){
  for (var i = 0; i < particles.length; i++) {
    let col = random(100, 255);
    // console.log(col);
    stroke(100, col, map(sin(angle), -1, 1, 100, 255)); //color
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update(col);
    particles[i].show(col);
    particles[i].edges();
  }
}