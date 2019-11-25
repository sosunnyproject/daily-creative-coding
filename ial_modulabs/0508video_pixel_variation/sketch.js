var video;
var vScale = 12;
var mic;
var micLevel;

function setup() {
  createCanvas(640, 640);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  mic = new p5.AudioIn()
  mic.start();
  getAudioContext().resume();
  micLevel = 0.5;
  // colorMode(HSB, 100);
}

function draw() {
  background(51);
  video.loadPixels(); // pixels of video
  loadPixels(); // pixels of canvas
  micLevel = mic.getLevel() * 10;
  // console.log(micLevel);
  for(var y = 0; y < 100; y++) {
    for (var x = 0; x < 100; x++) {
      var index = ((video.width-x+1) + y * video.width)*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 225, vScale, 0);
     // fill(bright);
      noStroke();
      rectMode(CORNER);
      ellipseMode(CORNER);
      // rectMode(CENTER);
        // if ( 8 < w && w < 10 ) {
        //   rect(x*vScale, y*vScale, micLevel*20, micLevel*20);
        // } else

      if (w >= 8 ) {
            // fill( random(100, 200), map(sin(bright),-1, 1, 100, 250), map(bright, 0, 1, 0, 100));
           fill(map(bright, 0, 1, 0, 100), map(sin(bright),-1, 1, 100, 250),  random(100, 200));

            ellipse(x*vScale, y*vScale, micLevel*20, micLevel*20);
      }
      else if (6 < w ) {
        fill(50, map(tan(bright),-1, 1, 100, 250), map(bright, 0, 1, 0, 50));
        ellipse(x*vScale, y*vScale, micLevel, micLevel);
      }
    }
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
