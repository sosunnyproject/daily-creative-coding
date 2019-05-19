//video copy and paste
var video;
var vScale = 12;
var particles = [];

function setup() {
  createCanvas(480, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  video.hide();
  for (var i = 0; i < 200; i++){
    particles[i] = new Particle(320, 240);
  }
  background(0);
}

function draw() {
  // background(51);
  video.loadPixels(); // pixels of video
  // loadPixels(); // pixels of canvas
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}
