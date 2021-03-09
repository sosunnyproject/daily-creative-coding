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
let hue1, hue2, strokeW = 5
let newX = 0, newY = 0, angle = 0.01, diff;

let sliderC;

function setup() {
  createCanvas(1080/3, 1920/3) //800
  // background(0)
  // sliderX = createSlider(0, 100, 50)
  // sliderY = createSlider(0, 100, 50)  
  fontSize = round(map(width, 0, 1280, 14, 20))
  tileGap = 1 //round(map(fontSize, 10, 50, 2, 4))
  tileSize = 2 //round(map(fontSize, 10, 50, 4, 4))
  
    // count
  sliderC = createSlider(1, 10, 3, 1);
  // sliderC.position(10, 160)
  strokeWeight(strokeW);
  
  const c1 = 'rgba(138, 34, 242, 1.0)'
  const c2 = 'rgba(242, 39, 229, 1.0)'
  const c3 = 'rgba(41, 252, 174, 1.0)'
  //23, 163, 137,
  drawMathRose(width/2-80, 60, 1, c3)
  drawMathRose(60, height/4, 5, c2)
  drawMathRose(0, height/3, 10, c1)
}

function drawMathRose(x, y, count, colorStr) {
  let k = n / d;
  diff = 0;
  translate(x, y);
  stroke(colorStr)
  
  for(let i=0; i<TWO_PI; i+= TWO_PI/count){
    rotate(TWO_PI/count);
    push();
    // translate(newX, newY);
    beginShape(LINES);
    // stroke(hue2, 50, 255);
    // noFill();
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

function mouseClicked(){
  saveCanvas('rose-iwd', 'png')
}
