var song;
var button;
var fft;

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('Daddy YankeeDura.mp3');
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT(0.65, 512);
  w = width / 64;
  colorMode(HSB);
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  // console.log(spectrum.length); //default: 1024 frequency length
  // stroke(255);
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 512, 0, height);
    fill(i, 255, 255);
    rect(i*w,y, w - 2, height - y * 2, 5);

  }
}
