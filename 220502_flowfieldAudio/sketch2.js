var inc = 0.25; //increment
var scl = 20; //scale
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;
let flowfieldText = []

let mic, fft, sound;
let spectrum;

let vol;
let spec = 4;

let textPg;

function setup(){
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);

  flowfield = new Array(cols*rows); //preset the size of array
	
  // fft = new p5.FFT();
  // fft.setInput(mic);

  for (var i = 0; i < 1200; i++) {
    particles[i] = new Particle(i);
  }

  textPg = createGraphics(width, height)
  textPg.background(0)
  textPg.textSize(250);
  textPg.textWrap(WORD);
  textPg.stroke(255)
  textPg.fill(255)
  textPg.text('SYNTH', 0, height/2-150, 150);

  // image(textPg, 0, 0)

  // save text x,y coordinates
  for (var y = 0; y < rows+1; y++) {
    for (var x = 0; x < cols+1; x++) {
      var index = (x + y * cols);
      let color = textPg.get(x*scl, y*scl)
      if(color[0] > 205) {
        flowfieldText[index] = true
      } else {
        flowfieldText[index] = false
      }
    }
  }
  
  // check text x,y coordinates
  for (var y = 0; y < rows+1; y++) {
    for (var x = 0; x < cols+1; x++) {
      var index = (x + y * cols);
      if(flowfieldText[index] > 0) {
        push();
        // fill(255)
        // translate(x*scl, y*scl);
        // ellipse(0, 0, 10, 10)
        pop()
      }
    }
  }
  
  // mic input
  // audio
	mic = new p5.AudioIn()
	mic.start()
  getAudioContext().resume();

}

function draw() {
  background(0, 20)

  /*
  spectrum = fft.analyze();
  for(i = 0; i < spectrum.length; i++) {
  	spec = spectrum[i];
  }
  */

  spec = mic.getLevel()*100 // 0 ~ 100

  var yoff = 0;
  for (var y = 0; y < rows+1; y++) {
    var xoff = 0;
    for (var x = 0; x < cols+1; x++) {
      var index = (x + y * cols);
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;

      // "i want vector on every spot on the grid."05:10
      var v = p5.Vector.fromAngle(angle);  
      // full units, no limit..need to set maximum limit
      v.setMag(10); 
      flowfield[index] = v;

      // draw flowfield lines
      // push();
      // stroke(225)
      // translate(x*scl, y*scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();

      xoff += inc;
    }
    yoff += inc
    zoff += 0.003;  // fixed flow field, if you comment this
  }

  for (var i = 0; i < particles.length; i++) {
    
    // find appropriate, nearby vector
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    // particles.kill()
  }
}

function Particle() {

  this.pos = createVector(random(0, width), random(height/3, height/3*2-100));
  this.vel = createVector(random(-100, 100), random(-100, 100));
  this.acc = createVector(random(-100, 100), random(-100, 100));
  this.maxspeed = 3;
  this.lifespan = 0;

  this.prevPos = this.pos.copy();

  // update vel based on acc
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan += 1;
  }

  this.show = function(col, weight) {
    push()
    strokeWeight(weight);
    stroke(col)
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y); //draw line from current to previous pos
    pop()
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  // make sure particles come back when hit the walls
  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
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

    if(flowfieldText[index]) this.show(color('#80A1D4'), 2)
    else this.show(color('#F7F4EA'), 0.1)
    this.applyForce(force);
    this.updatePrev();
  }

  // add force to acc
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.isDead = () => {
    if(this.lifespan >= 255) return true 
    else return false
  }

  this.drop = function() {
    let gravity = createVector(0, 100)
    this.applyForce(gravity)
  }

}


function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}

