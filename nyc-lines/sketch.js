let bgImg;
let rad = 5;
let gap = 10;
let imgs = [];
let ind = 0;
let slider1, slider2;
let mic, micLevel;
let ellButton, rectButton;
let col;
let angle, spacing;

function preload() {
  for (let i = 0; i < 20; i++) {
    imgs[i] = loadImage("s" + i + ".JPG");
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  console.log(getAudioContext().state);
  console.log(micLevel);
}

function setup() {
  createCanvas(600, 600, WEBGL);
  bgImg = imgs[0];
  bgImg.resize(width, height);
  slider1  = createSlider(0, 100, 20);
  slider2  = createSlider(0, 120, 20);

  // audio in
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();

  angleMode(DEGREES);
  spacing = 50;
}


function draw() {
  // brightness threshold slider
  let bVal = slider1.value();
  rad = slider2.value();

  micLevel = mic.getLevel();

  background(0);
  bgImg.resize(width, height);
  if (mouseIsPressed) {
    bgImg.resize(width, height);
    let temp = image(bgImg, -width/2, -height/2);
    // background(bgImg);
  }

  for (let x = -width/2; x < width/2; x += gap) {
    for (let y = -height/2; y < height/2; y += gap) {
      col = bgImg.get(x + bgImg.width/2, y + bgImg.height/2);

      if (brightness(col) > bVal) {
        col[3] = map(micLevel, 0, 1, 200, 255);
        noFill();
        stroke(col);
        let thickness =  map(micLevel, 1, 0, 5, 1);
        strokeWeight(thickness);
        //ellipse(x, y, rad * noise(micLevel)*1.5, rad * noise(micLevel)*1.5);
        // rect(x, y, rad * micLevel*10, rad * micLevel*20);
        push();
        for(let a = 0; a < 360; a += rad) {
          line(x, y, x + rad/2*sin(a)+ micLevel*20, y + rad/2*cos(a)+micLevel*30);
        }
        pop();
      }
    }
  }
}

function changeShape(){
    ellipse(x, y, rad * noise(frameCount * 0.5), rad * noise(frameCount * 0.5));
    rect(x, y, 5, rad * noise(frameCount * 0.5) * random(3));
}

function keyPressed() {
  console.log(ind);
  if(keyCode === LEFT_ARROW){
    if(ind > 0) {
      ind--;
    } else {
      ind = imgs.length - 1;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if(ind < imgs.length - 1) {
      ind++;
    } else {
      ind = 0;
    }
  }
  console.log(ind);
  bgImg = imgs[ind];
}
