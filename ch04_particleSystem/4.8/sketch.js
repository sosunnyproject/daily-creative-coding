let ps;
let img;
let psArray;
function preload(){
  img = loadImage("data/blueRing.png");
  horsea = loadImage("data/horsea.png");
}

function setup() {
  createCanvas(480, 480);
}

function mousePressed(){
  ps = new ParticleSystem(0, createVector(mouseX-50, mouseY-20), img);
}

function draw() {
  blendMode(ADD);
  clear();
  background(0);
  image(horsea, mouseX, mouseY, 100, 100);
  let dx = map(mouseX/1.5, 0, width, -0.8, 0.8);
  let dy = map(mouseY/1.5, 0, height, -0.8, 0.8);
  let wind = createVector(dx, dy);

  if(ps!=null) {
    ps.applyForce(wind);
    ps.run();
    for (let i = 0; i < 2; i++){
      ps.addParticle();
    }
  }
  // drawVector(wind, createVector(width/2, 50, 0), 500);
}

function drawVector(v, pos, scayl) {
  push();
  let arrowsize = 4;
  translate(pos.x, pos.y);
  stroke(255);
  rotate(v.heading());
  let len = v.mag() * scayl;
  line(0, 0, len, 0);
  line(len, 0, len - arrowsize, +arrowsize / 2);
  line(len, 0, len - arrowsize, -arrowsize / 2);
  pop();
}
