function preload() {
  baliImg = loadImage('bali-beach2.jpg');
}

let slider, slider2;

function setup() {
  createCanvas(400, 400);
  baliImg.resize(400, 400);
  slider = createSlider(0, 60, 10);
  slider2 = createSlider(0, 60, 10);
}

function draw() {
  background(0);
  // background(baliImg);
  // straight line
  /*
    for(let y = 10; y < height; y += 10) {
      stroke(255);
      strokeWeight(3);
      let startX = 0;
      let startY = y;
      let endX = width;
      let endY = y;
      line(startX + gap, startY, endX - gap, endY);
      gap += 10;
    }
    */

  let gap = 0;
  let heightGap = 15;
  let noiseScale = 0.25;
  let sliderVal = slider.value();
  let sliderVal2 = slider2.value();

  // noise
  for (let y = 3; y < height; y += heightGap) {
    strokeWeight(1);

    let startX = 0;
    let startY = y;
    let endX = width;
    let endY = y;
    for (let x = startX+gap; x < endX - gap ; x += 1) {
      let col = baliImg.get(x, y);
      stroke(col);
      let noiseVal = noise((frameCount + x) * noiseScale,
                           frameCount * 0.22 * noiseScale);
      line(x, y + noiseVal * sliderVal, x, y + noiseVal * sliderVal2);
    }

    gap += 0;  // x width control
  }
}
