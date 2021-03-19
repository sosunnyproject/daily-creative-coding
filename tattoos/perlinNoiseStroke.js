let xInterval = 4;
let yoff = 0.0;
let sound, amp, size, speed;
let mic;
let micLevel;
let slider, sliderSpeed;


function setup() {
  createCanvas(windowWidth,400);
  noFill(0);
  background(255);
  size = 1;
  speed =1;
  slider = createSlider(0, 10, 5, 1)
  sliderSpeed = createSlider(0, 30, 5, 1)
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('PerlinTattooStroke', 'png');
  }
}

function draw() {
  let t = frameCount/10
  let heightVar = map(slider.value(), 0, 10, 0, 1)
  let yVar = sliderSpeed.value()
  size = map(heightVar, 0, 1, 5, 0.1)
  
  background(0, 50)
  strokeWeight(0.5)
  for(let i = 0; i < 100; i++) {
    let xoff = 0
    for (let x = 0; x < width; x += xInterval) {
      let y = map(noise(xoff, yoff), 0, 1, 50, height-50);
      // stroke(50, 100, 100 + (y))
      stroke(`hsb(${(x*10)%360}, 60%, 80%)`)
      ellipse(x + i/2, y * size/2, 1, 1);
      xoff += 0.035;
    }
    yoff += 0.001 * yVar
  }

}
