function preload() {
  baliImg = loadImage('bali-beach1.jpg');
}

function setup() {
  createCanvas(400, 400);
  baliImg.resize(400, 400);
}

function draw() {
  background(0);
  background(baliImg);


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
  let heightGap = 7;
  let noiseScale = 0.05;

  // noise
  for (let y = 3; y < height; y += heightGap) {
    strokeWeight(1);

    let startX = 0;
    let startY = y;
    let endX = width;
    let endY = y;
    for (let x = startX+gap; x < endX - gap ; x += 0.7) {
      let col = baliImg.get(x, y);
      stroke(col);
      let noiseVal = noise((frameCount + x) * noiseScale,
                           frameCount * 0.22 * noiseScale);
      line(x, y + noiseVal * 37, x, y + noiseVal * 35);
    }

    gap += 3;
  }
}
