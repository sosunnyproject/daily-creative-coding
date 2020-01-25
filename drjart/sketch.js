var inc = 0.1; //increment
var scl = 10; //scale
var cols, rows;
var zoff = 0;
var fr; //framerate
var particles = [];
var flowfield;


var imgs = [];
var vehicle;  // 1 penguin
var vehicles = [];  // penguinVectors
var imgIndex = 0;

// preload penguin img
function preload() {
  for (let i = 0; i < 5; i++) {
    imgs[i] = loadImage("assets/p" + i + ".PNG");
  }
}

function setup(){
  createCanvas(600, 600);

  // vehicle
  imgIndex++;
  vehicles.push(new Vehicle(width/2, height/2));

  // flow field
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP(''); // creating Paragraph element

  flowfield = new Array(cols*rows); //preset the size of array

  // particles
  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
}

// penguinVectors
function mouseClicked() {
  console.log(imgIndex);
    while(imgIndex < 5){
      imgIndex++;
    }
    vehicles.push(new Vehicle(width/2, height/2));
}

function draw() {
  background('rgba(0%,0%,0%,0.7)');
  //penguin vehicles follow Mouse
  let mouse = createVector(mouseX, mouseY);
  fill(map(mouseX, 0, 640, 100, 255), 20, map(mouseY, 0, 640, 200, 0));
  fill(250, 251, 0);
  noStroke();
  // mouseVector
  ellipse(mouse.x, mouse.y, 20 * (mouseX+mouseY)/2 * 0.005, 20 * (mouseX+mouseY)/2 * 0.005 );

  // penguinVectors
  for (let i = 0; i < imgIndex; i++) {
    vehicles[i].seek(mouse);
    vehicles[i].update();
    vehicles[i].display(i);
  }

  // 1 penguin
  /*
  vehicle.seek(mouse);
  vehicle.update();
  vehicle.display();
  */

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = (x + y * cols);
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      var v = p5.Vector.fromAngle(angle);
      // "i want vector on every spot on the grid."05:10 youtube tutorial

      v.setMag(4); // full units, no limit..need to set maximum limit
      flowfield[index] = v;
      xoff += inc;
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0); // for every vector, rotate according to angle of that random vector
      // pop();
    }
    yoff += inc;
    zoff += 0.00004;  // fixed flow field, if you comment this
  }

  for (var i = 0; i < particles.length; i++) {
    let col = random(100, 255);
    // stroke(100, col, map(sin(angle), -1, 1, 100, 255), ); //color
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update(col);
    particles[i].show(col);
    particles[i].edges();
  }
}
