//flowfield
let scl = 30;
let inc = 0.1;
let bound = 30;
let zoff = 0;
let flowfield;
//particle
let particles = [];
let angle;

function setup() {
  createCanvas(400, 400);
  cols = floor(width/scl);
  rows = floor(height/scl);
  flowfield = new Array(rows*cols);
  //particle.js
  for (var i = 0; i < 400; i++) {
    particles[i] = new Particle();
  }
}


function draw() {
  background(0);
  let yoff = 0;

  for(let y = 0; y < height/4; y++){
    let xoff = 0;

    for(let x = 0 ; x < width/4; x++) {
      // let ind = (x + y * width) *4;
      let ind = (x + y);

      angle = noise(xoff, yoff, zoff) * TWO_PI * 3
      let v = p5.Vector.fromAngle(angle)
      flowfield[ind] = v
      xoff += inc;
      stroke(255);
      // if(frameCount % 200 === 0) {
        push();
        translate(x*scl, y*scl);
        rotate(v.heading());
        line(0, 0, scl, 0);
        pop();
      // }
      // if((x*scl < mouseX - bound || x*scl > mouseX + bound) && 
      //    (y*scl < mouseY - bound || y*scl > mouseY + bound)) {
      //     push();
      //     translate(x*scl, y*scl);
      //     rotate(v.heading());
      //     line(0, 0, scl, 0);
      //     pop();
      //   }
      }
    yoff += inc;
    // zoff += (mouseX+mouseY)/2*0.003
    zoff += 0.0004; 
  }
  for (var i = 0; i < particles.length; i++) {
    let col = random(100, 255);
    // console.log(col);
    stroke(100, col, map(sin(angle), -1, 1, 100, 255), ); //color
    particles[i].follow(flowfield);
    // find appropriate, nearby vector
    particles[i].update(col);
    particles[i].show(col);
    particles[i].edges();
  }
}

function mouseDragged() {
  
  let ind = 0
  stroke(255)
  line(mouseX, mouseY, mouseX+scl, mouseY+scl);
  angle = random(10) * TWO_PI * 3
  let v = p5.Vector.fromAngle(angle)
  flowfield[ind] = v
  ind++
}