let rows, cols, scl = 20;
let w = 1000;
let h = 1000;
let terrain = [];
let noisePeriod = 50;
let noiseScale = 100;
let xNoiseInterval = 0.1;
let yNoiseInterval = 0.1;
let img;

function preload() {
  //img = loadImage("water.jpg");
}

function setup() {
  frameRate(30);
  createCanvas(600, 600, WEBGL);
  noFill();
  stroke(random(0, 255), random(0, 255), random(0, 255));
}

function draw() {
  background(0);
  makeTerrain()
}

function makeTerrain() {
  let yoff;

  for (let y = 0; y < row)
}
