var song;
var button;
var amp; // volume
var volhistory = [];

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('Billie Eilish - bad guy.mp3');
}

function setup() {
  createCanvas(480, 480);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  var vol = amp.getLevel();
  vol = vol * 2.25;
  // console.log(vol);
  volhistory.push(vol);
  // stroke(255);
  // colorMode(HSB, 100);
  fill(map(vol, 0, 1, 230, 50), 0, map(vol, 0, 1, 50, 250));
  // fill(map(vol, 0, 1, 230, 50), map(sin(vol), -1, 1, 50, 200), map(vol, 0, 1, 50, 150));
  stroke(0);
  // noFill();
  strokeCap(ROUND);
  strokeWeight(7);
  push();
  var currentY = map(vol, 0, 1, height, 0);
  // console.log(currentY);
  translate(0, height / 2 - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  pop();

  if(volhistory.length > width - 20) {
    volhistory.splice(0, 1);
  }

}
