let xInterval = 10;
let yoff = 0.0;
let sound, amp, size, speed;
let mic;
let micLevel;


function preload() {
  song = loadSound('loversPHS.mp3');
}


function setup() {
  createCanvas(710, 400);
  noFill(0);
  background(0);
  // frameRate(30);
  // mic = new p5.AudioIn();
  // mic.start();
  // getAudioContext().resume();
  song.play();
  amp = new p5.Amplitude();
  // micLevel = 0.9;
  size = 1;
  speed =1;
}

function mouseClicked() {
  if (sound.isPlaying() ){
      sound.stop();
    } else {
      sound.play();
    }
}

function draw() {
  // let level = mic.getLevel();
  let level = amp.getLevel();
  let speed = map(level, 0, 1, 1, 10);
  size = map(level, 0, 1, 2, 0.1);
  background(0, 9);
  beginShape();
  let xoff = 0;
  let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
  stroke(251, 140, 152 + extra, 50);
  for (let x = 0; x < width; x += xInterval) {
      let y = map(noise(xoff, yoff), 0, 1, 50, 300);
      // y = y + size;
      vertex(x, y * size - 100);
      xoff += 0.035;
    }
  yoff += 0.002 * speed;
  vertex(width + 50, height);
  vertex(-50, height);
  endShape(CLOSE);
}
