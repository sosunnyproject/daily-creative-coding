var inc = 0.1; //increment
var scl = 10; //scale
var cols, rows;
var zoff = 0;
var fr; //framerate
var particles = [];
var flowfield;
let oxcoord = 0.1, oycoord = 0.1
let xyAngle = 0
let angle
function setup(){
  createCanvas(windowWidth, windowHeight);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element

  flowfield = new Array(cols*rows); //preset the size of array

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
  background(0)
}

let reset = document.getElementById('resetBackground')
reset.onclick = function(e) {
  e.preventDefault();
  background(0) 
}

function draw() {
  // background(0,10);
  flowField()
  gyro()
  // fr.html(floor(frameRate()));
}
function mouseClicked() {
  background(0)
}

function gyro() {
  // beta - x axis
  let ox = document.getElementById('Orientation_b').innerText
  let oxNum = Number.parseInt(Math.floor(ox))
  oxcoord = map(oxNum, -20, 20, 0, height)
  
  // gamma y-axis
  let oy = document.getElementById('Orientation_g').innerText
  let oyNum = Number.parseInt(Math.floor(oy))
  oycoord = map(oyNum, -20, 20, 0, width)

  // fill(0, 255, 255)
  xyAngle = map(atan(oycoord/oxcoord), 0.5, 1.5, TWO_PI, -PI)
  // textSize(30)
  // text(atan(oxcoord/oycoord), 50, 50)
}
function flowField() {
  // var yoff = oycoord;
  // var xoff = oxcoord;
  for (var y = 0; y < rows; y+=2) {
    for (var x = 0; x < cols; x+=2) {
      var index = (x + y * cols);
      var angle = xyAngle
      // noise(xoff, yoff, zoff) * TWO_PI * 3;
      var v = p5.Vector.fromAngle(angle);  
      // "i want vector on every spot on the grid."05:10
      v.setMag(3); 
      // full units, no limit..need to set maximum limit
      flowfield[index] = v;

      // stroke(255);
      // strokeWeight(0.2);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      // line(0, 0, scl, scl); 
      // for every vector, rotate according to angle of that random vector
      pop();
    }
    zoff += 0.00004;  
    // fixed flow field, if you comment this
  }
  runParticles()
}

function runParticles(){
  for (var i = 0; i < particles.length; i++) {
    let col = random(50, 105);
    // strokeWeight(3)
    // stroke(col, 0, map(sin(xyAngle), -1, 1, 200, 255)); 
    //color
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update(col);
    particles[i].show(col);
    particles[i].edges();
  }
}