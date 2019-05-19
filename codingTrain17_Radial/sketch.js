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
  song = loadSound('Daddy YankeeDura.mp3');
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  // fill(map(vol, 0, 1, 230, 50), 0, map(vol, 0, 1, 50, 250));
  // stroke(255);
  stroke(255);
  // noStroke();
  // strokeCap(ROUND);
  strokeWeight(2);
  translate(width / 2, height / 2);
  var rad = random(0, map(vol, 0, 1, 100, 200));
  var rad2 = map(sin(vol), -1, 1, 20, 100);
  push();
  for (var i = 0; i < 360; i++) {
    var r = map(volhistory[i], 0, 1, 100, 250);
    var x = r * cos(i);
    var y = r * sin(i);
    // vertex(x, y);

    // green
    // fill(map(vol, 0, 1, 255, 100),map(vol, 0, 1, 0, 200) ,map(vol, 0, 1, 0, 200));
    //orange, blue
    // fill(0);
    // fill(map(vol, 0, 1, 255, 100), map(vol, -1, 1, 0, 100),map(vol, 0, 1, 100, 200));
    fill(map(vol, 0, 1, 255, 100), map(vol, -1, 1, 50, 200),map(vol, 0, 1, 0, 200));
    // ellipse(x, y, rad, rad2);

    // ellipse(x, y, rad2, rad2);
    // ellipse(x, y, rad, rad);
    ellipse(x, y, random(map(vol, 0, 1, 50, 200)), random(map(vol, 0, 1, 50, 250)));

    // rectMode(CENTER);
    // rect(x, y, rad, rad);
    // triangle(x, y, x + 20, y-50, x + 50, y);

  }
  pop();
    /**
    beginShape();
    for (var i = 0; i < 360; i++) {
      var r = map(volhistory[i], 0, 1, 100, 250);
      var x = r * cos(i);
      var y = r * sin(i);
      vertex(x, y);
    }
    endShape();
    */

  if(volhistory.length > 360) {
    volhistory.splice(0, 1);
  }

}
