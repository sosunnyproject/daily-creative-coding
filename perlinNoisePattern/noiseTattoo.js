let xInterval = 4;
let yoff = 0.0;
let sound, amp, size, speed;
let mic;
let micLevel;
let slider, sliderSpeed;


function setup() {
  createCanvas(windowWidth,500);
  noFill(0);
  background(255);
  size = 1;
  speed =1;
  slider = createSlider(0, 10, 5, 1)
  sliderSpeed = createSlider(0, 30, 5, 1)

  colorMode(RGB)
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('PerlinTattoo', 'png');
  }
}

function draw() {
  let t = frameCount/10
  let heightVar = map(slider.value(), 0, 10, 0, 1)
  let yVar = sliderSpeed.value()
  size = map(heightVar, 0, 1, 5, 0.1)
  
  background(255)
  for(let i = 0; i < 100; i++) {
    let xoff = 0;
    // let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
  stroke(10, 51, 25);
  strokeWeight(3)
  for (let x = 0; x < width; x += xInterval) {
      let y = map(noise(xoff, yoff), 0, 1, 50, 300);
      ellipse(x + i/2, y * size/2, 1, 1);
      xoff += 0.035;
    }
  yoff += 0.001 * yVar;
  }
}
