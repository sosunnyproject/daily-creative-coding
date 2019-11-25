let flock;

function setup() {
  createCanvas(400, 400);
  flock = new Flock();
  for(let i=0;i<60;i++){
   let b = new Boid(width/2, height/2);
   flock.addBoid(b);
  }
}

function draw() {
  background(220);
  flock.run();
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}