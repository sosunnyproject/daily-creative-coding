// https://editor.p5js.org/sosunnyproject/sketches/39h8qQoXX
var inc = 0.1; //increment
var scl = 10; 
var cols, rows;
var zoff = 0;
var fr; //framerate
var particles = [];
var flowfield;
let angle = 0, angle2 = 0
let oxcoord = 0.1, oycoord = 0.1
let gyroAngle = 0

function setup(){
  createCanvas(200, 400);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element

  flowfield = new Array(cols*rows); //preset the size of array

  for (var i = 0; i < 800; i++) {
    particles[i] = new Particle();
  }

  background(255);

}

function draw() {
  background(255, 50);
  gyro()
  flowField()
  // fr.html(floor(frameRate()));
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
  gyroAngle = map(atan(oycoord/oxcoord), 0.5, 1.5, TWO_PI, 0)
  // textSize(30)
  // text(atan(oxcoord/oycoord), 50, 50)
}

function flowField() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      
      let noiseOff = noise(xoff, yoff, zoff) * TWO_PI * 0.05
      
      angle = gyroAngle * noiseOff ;
      // var v = p5.Vector.fromAngle(angle);  // "i want vector on every spot on the grid."05:10
      
      // let v = createVector(mouseX * noise(zoff, xoff)*5, mouseY)
      let v = p5.Vector.fromAngle(angle)
      
      v.setMag(4); // full units, no limit..need to set maximum limit
      flowfield[index] = v;
      xoff += inc;

      // stroke(100);
      // strokeWeight(0.2);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      // line(0, 0, scl, 0); // for every vector, rotate according to angle of that random vector
      pop();

    }
    yoff += inc;
    zoff += 0.0002;  
    // fixed flow field, if you comment this
  }

  runParticles()
}

function runParticles(){
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update();
    particles[i].show();
    particles[i].edges();
  }
}
function mouseClicked() {
  background(255)
  // saveCanvas('waterstream', 'png')
}
