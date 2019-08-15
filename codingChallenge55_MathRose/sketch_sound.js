var song;
var button;
var amp;
let d = 8;
let n = 5;
let angle, count, dist;
let hue1 = 0;
let hue2 = 0;
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function preload() {
  song = loadSound('peggy-rose.mp3');
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB)
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}


function draw() {
  var vol = amp.getLevel();
  background(hue2, 50, 10);
  //color
  hue1 = map(vol, 0, 1, 360, 0)
  hue2 = (hue1-180)%360;
  // k
  d = map(vol,0, 1, 1, 10);
  n = map(vol,0, 1, 5, 10);
  // d = map(sin(frameCount*0.002),-1, 1, 1, 10);
  // n = map(cos(frameCount*0.005),1, -1, 5, 10);
  angle = map(vol, 0, 1, 0.001, 0.05);
  // count = map(vol, 0, 1, 4, 10);
  count = 5
  dist = map(vol, 0, 1, 0, 300);

  let k = n / d;
  translate(width/2, height/2);
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push();
    translate(dist, 0);
    beginShape(LINES);
    stroke(hue1, 200, 255);
    noFill();
    strokeWeight(1.5);
    // for loop
    for (let a = 0; a < TWO_PI * d; a+= angle) {
      let r = 200 * cos(k * a);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape();
    pop();
  }

}
