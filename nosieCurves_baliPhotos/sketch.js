function preload() {
  baliImg = loadImage('bali-beach2.jpg');
}

let slider, slider2, slider3;

function setup() {
  createCanvas(400, 400);
  baliImg.resize(400, 400);
  slider = createSlider(0, 60, 10);
  slider2 = createSlider(0, 60, 10);
  slider3 = createSlider(0, 10, 2);

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
  let noiseScale = 0.05;
  let sliderVal = slider.value();
  let sliderVal2 = slider2.value();
  let sliderVal3 = slider3.value();
  // noise
  for (let y = 3; y < height; y += heightGap) {
    strokeWeight(3);

    let startX = 0;
    let startY = y;
    let endX = width;
    let endY = y;
    for (let x = startX+gap; x < endX - gap ; x += 1) {
      let col = baliImg.get(x, y);
      stroke(col);
      let noiseVal = noise((frameCount*0.1 + x) * noiseScale,
                           frameCount*0.1 + y * noiseScale);
      line(x, y + noiseVal * sliderVal, x, y + noiseVal * sliderVal2);
    }

    gap += sliderVal3;  // x width control
  }
}
