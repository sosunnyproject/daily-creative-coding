var inc = 0.1; //increment
var scl = 10; //scale
var cols, rows;
var zoff = 0;
var fr; //framerate
var particles = [];
var flowfield;

let mic, fft, sound;
let spectrum;

let vol;
let spec = 4;

function setup(){
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element

  flowfield = new Array(cols*rows); //preset the size of array


  // mic input
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);

  for (var i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }
  colorMode(HSB);
  //background(0);

}

function draw() {

  if (frameCount % 120 == 0) {
  	background(0)
  }

  spectrum = fft.analyze();

  var yoff = 0;

  for(i = 0; i < spectrum.length; i++) {
  	spec = spectrum[i];
  }

  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      var v = p5.Vector.fromAngle(angle);  // "i want vector on every spot on the grid."05:10
      v.setMag(10); // full units, no limit..need to set maximum limit
      flowfield[index] = v;
      xoff += inc;

    }
    yoff += inc;
    zoff += 0.00004;  // fixed flow field, if you comment this
  }

  for (var i = 0; i < particles.length; i++) {
    let col = (spec%360, 80, 80);
    // console.log(col);
    // stroke(100, col, map(sin(angle), -1, 1, 100, 255), ); //color
    if(spec>20) {
    	strokeWeight(30);
    }
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update(col);
    particles[i].show(col);
    particles[i].edges();
  }
  fr.html(floor(frameRate()));
}

function Particle() {

  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, spec*0.05);
  this.maxspeed = 20;

  this.prevPos = this.pos.copy();

  // update vel based on acc
  this.update = function(col) {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    stroke(map(sin(this.vel.x), -1, 1,100, 255), col,  map(sin(this.vel.y), -1, 1, 200, 0)); //color


  }

  // receive force
  // add force to acc
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  this.show = function(col) {
    // stroke(map(sin(this.vel.x), -1, 1, 100, 255), map(sin(this.acc.y), -1, 1, 50, 200), col); //color
    strokeWeight(3);

    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y); //draw line from current to previous pos

    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  // make sure particles come back when hit the walls
  this.edges = function() {
    if(this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if(this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if(this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if(this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

  // im a particle, size me up to the scale of one grid square
  // find the vecotr inside it, apply force
  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}
