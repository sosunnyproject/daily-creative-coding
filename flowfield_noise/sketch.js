//flowfield
let scl = 20;
let inc = 0.2;
let bound = 20;
let zoff = 0;
let flowfield;
//particle
let particles = [];

function setup() {
  // colorMode(HSB)
  createCanvas(600, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  //particle.js
  for (var i = 0; i < 250; i++) {
    particles[i] = new Particle();
  }
}

function mouseClicked() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      // let ind = (x + y * width) *4;
      let ind = (x + y * cols);

      xoff += inc;
      // stroke(100);
      if ((x * scl > mouseX - bound && x * scl < mouseX + bound) &&
        (y * scl > mouseY - bound && y * scl < mouseY + bound)) {
        let angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
        let v = p5.Vector.fromAngle(angle);
        flowfield[ind] = v;
        push();
        translate(x * scl, y * scl);
        // rotate(v.heading());
        // stroke(255, 100, 100)
        // line(0, 0, scl, 0);
        pop();
      }

    }
    yoff += inc;
    // zoff += (mouseX+mouseY)/2*0.000003
    zoff += 0.004;
  }
}

function draw() {
  background(0, 100);

  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let ind = (x + y * cols);
      // strokeWeight(5);
      // stroke(255);
      // flowfield[ind] && point(flowfield[ind].x , flowfield[ind].y)
      // flowfield[ind] && point(flowfield[ind].x, flowfield[ind].y)
      if (flowfield[ind] && flowfield[ind].x !== 0) {
        // rotate the flowfield vectors

        let angle = random(5) * TWO_PI * 3;
        let v = p5.Vector.fromAngle(angle);
        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        noStroke()
        strokeWeight(1)
        stroke(255, 100, 100)
        line(0, 0, scl, 0);
        pop();

        for (var i = 0; i < particles.length; i++) {

          // let col = random(frameCount%360);
          // stroke(map(sin(i), -1, 1, 0, 360), 100, 100 ); 
          // particles[i].follow(flowfield);
          // // find appropriate, nearby vector
          // particles[i].update();
          // particles[i].show(flowfield);
          // particles[i].edges();
        }
      }
    }
  }
}