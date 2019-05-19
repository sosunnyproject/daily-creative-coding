var song;
var button;
var amp; // volumne

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('Loudness  Clarity — Joakim Karud.mp3');
}

function setup() {
  createCanvas(600,600);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  var vol = amp.getLevel();
  vol = vol * 2;
  noStroke();
  //center
  fill(map(sin(vol), -1, 1, 0, 255), 0, map(sin(millis()), -1, 1, 0, 255));
  ellipse(300, 300, 300, vol * 600);

  fill(map(sin(vol), -1, 1, 50, 150), 0, map(sin(second()), -1, 1, 0, 255));
  ellipse(100, 100, 100, vol * 200);

  fill(map(sin(vol), -1, 1, 100, 150), 0, map(sin(second()), -1, 1, 0, 255));
  ellipse(500, 500, 100, vol * 200);

  fill(map(sin(vol), -1, 1, 150, 200), 0, map(sin(second()), -1, 1, 0, 255));
  ellipse(100, 500, 100, vol * 200);

  fill(map(sin(vol), -1, 1, 200, 255), 0, map(sin(second()), -1, 1, 0, 255));
  ellipse(500, 100, 100, vol * 200);

}
