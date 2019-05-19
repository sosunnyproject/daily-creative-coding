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
  fft = new p5.FFT();
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  console.log(spectrum.length); //default: 1024 frequency length
  stroke(255);
  noFill();
}
