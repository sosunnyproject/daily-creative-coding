// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let movers = [];

function setup() {
  createCanvas(640,360);
  mover = new Mover();
  for (let i = 0; i < 20; i++) {
    movers[i] = new Mover();
  }
}

function draw() {
  background(51);
  for (let i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].display();
  }
}
