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
  fft = new p5.FFT(0.8, 512);
  w = width / 64;
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  console.log(spectrum.length); //default: 1024 frequency length
  stroke(255);
  noFill();
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 512, height, 0);
    // line(i, height, i , y);
    // rect(i*w, y, i*w, height - y);
    rect(i*w, y, w, height - y);

  }
}
