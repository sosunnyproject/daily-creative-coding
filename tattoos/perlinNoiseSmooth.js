let xInterval = 8;
let yoff = 0.0;
let sound, amp, size, speed;
let mic;
let micLevel;
let slider;

function preload() {
  // song = loadSound('loversPHS.mp3');
}


function setup() {
  createCanvas(900, 200);
  noFill(0);
  background(255);
  // frameRate(30);
  // mic = new p5.AudioIn();
  // mic.start();
  // getAudioContext().resume();
  // song.play();
  // amp = new p5.Amplitude();
  // micLevel = 0.9;
  size = 1;
  speed =1;
  slider = createSlider(0, 10, 5, 1)
}

function mouseClicked() {
  // if (sound.isPlaying() ){
  //     sound.stop();
  //   } else {
  //     sound.play();
  //   }
}
function keyTyped() {
  if (key === 's') {
    saveCanvas('PerlinTattoo', 'png');
  }
}

function draw() {
  // let level = mic.getLevel();
  let level = map(slider.value(), 0, 10, 0, 1)
  let speed = map(level, 0, 1, 1, 10);
  size = map(level, 0, 1, 2, 0.1);
  background(255, 25);
  beginShape();
  let xoff = 0;
  let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
  stroke(0);
  for (let x = 0; x < width; x += xInterval) {
      let y = map(noise(xoff, yoff), 0, 1, 50, 300);
      // y = y + size;
      vertex(x, y * size - 100);
      xoff += 0.035;
    }
  yoff += 0.001 * speed;
  vertex(width + 50, height - 20);
  vertex(-50, height-20);
  endShape(CLOSE);
}
