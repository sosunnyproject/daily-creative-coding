// https://editor.p5js.org/sosunnyproject/sketches/n9QmB3GQ8
// iwd logo - rose
let fontSize = 50
let count = 12
let speedX, speedY, speed
let sliderX, roseX, sliderY, roseY
let darkness, opacity
// korean women fighter names
let pg, font
let particles = [] // 생성할 파티클들을 담을 리스트
let particleNum = 0 // 생성될 파티클의 개수, 가장처음에는 0개이므로 0.
let tileSize = 6
let tileGap = 4
let doChange = false

//math rose
let d = 5;
let n = 5;
let hue1, hue2, strokeW = 2
let newX = 0, newY = 0, angle = 0.01, diff;

let sliderC;

function setup() {
  createCanvas(1080/3, 1920/3) //800
  sliderX = createSlider(0, 100, 50)
  sliderY = createSlider(0, 100, 50)  
  fontSize = round(map(width, 0, 1280, 14, 20))
  tileGap = 1 //round(map(fontSize, 10, 50, 2, 4))
  tileSize = 2 //round(map(fontSize, 10, 50, 4, 4))
  
    // count
  sliderC = createSlider(1, 10, 3, 1);
  // sliderC.position(10, 160)
}

function draw() {
  background(0, 100);
  speed = frameCount/20
  speedX = map(sin(frameCount / 20), -1, 1, 0, 7)
  speedY = map(sin(frameCount / 10), -1, 1, 0, 7)
  roseX = map(sliderX.value(), 0, 100, 0.1, 1.0)
  roseY = map(sliderY.value(), 0, 100, 0.1, 1.0)
  darkness= map(speedX, 0, 7, 80, 0)
  opacity = map(speedX, 0, 7, 1.0, 0.0)
  
  count = map(sin(speed)*10, -10, 10, 1, 8)
  // count = sliderC.value();

  textSize(fontSize)
  
  stroke(`hsla(${frameCount%360}, 100%, 70%, 0.8)`)
  noFill()
  strokeWeight(3)
  // drawRose()
  drawMathRose()
}

function drawRose() {
  // make dividend of frameCount different to see rotation movement
  translate(width/2, height/2) // center or height/3
  for (let i = 0; i < TWO_PI; i += TWO_PI/count) {
    // 하나의 원 - 다른 i 값
    // +TWO_PI / count
    rotate(TWO_PI / count * roseX) 
    
    push()
    translate(12 * TWO_PI * roseX, //roseX, roseY
              24 * TWO_PI * roseY)
    // give translate x and y different multiplier to see rotation movement more clearly
    ellipse(0, 0, 1400/count, 1400/ count)
    
    pop()
  }
}

function drawMathRose() {
  let k = n / d;
  translate(width/2, height/2);
  diff = 0;
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push();
    translate(newX, newY);
    beginShape(LINES);
    // stroke(hue2, 50, 255);
    // noFill();
    strokeWeight(strokeW);
    // k += diff;
    // for loop
    for (let a = 0; a < TWO_PI * d; a+= angle) {
      let r = 100 * cos(k * a);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
    }
    endShape();
    pop();
    diff += 0.25
  }
}