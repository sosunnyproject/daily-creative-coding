let xInterval = 10;
let yoff = 0.0;
let sound, amp, size, speed;
let mic;
let micLevel;


function preload() {
  // song = loadSound('loversPHS.mp3');
}


function setup() {
  createCanvas(710, 400);
  noFill(0);
  background(0);
  // frameRate(30);
  // mic = new p5.AudioIn();
  // mic.start();
  // getAudioContext().resume();
  // song.play();
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
  background(0, 30);

  let start1 = createVector(-50, height)
  let start2 = createVector(-20, height)
  let start3 = createVector(-30, height)

  renderNoiseCurve(start1, 0.01, color('#F7B538'))
  renderNoiseCurve(start2, 0.025, color('#FF674D'))
  renderNoiseCurve(start3, 0.04, color('#89DAFF'))
  
}

function renderNoiseCurve(start, xInc, col) {
  beginShape();
  let xoff = 0;
  let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
  stroke(col);
  for (let x = 0; x < width; x += xInterval) {
      let y = map(noise(xoff, yoff), 0, 1, 50, 300);
      // y = y + size;
      vertex(x, y * size - 100);
      xoff += xInc;
    }
  yoff += 0.002 * speed;
  vertex(width + 50, height);
  vertex(start.x, height);
  endShape(CLOSE);
}