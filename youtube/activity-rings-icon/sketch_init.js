let size = 50;
let len = 3;
let colors = ['#00f3f1', '#b2ff00', '#fa1453']


// STEP 1: structure
// STEP 2: structure detail
// STEP 3: Visual
// STEP 4: Movement

function setup() {  // STEP 1
  createCanvas(400, 400); // STEP 1
}

function draw() {  // STEP 1
  background(0);  // STEP 1, STEP 3 add opacity
  translate(width/2, height/2) // STEP 1
  // noStroke() // STEP 3

  for(let i = 0; i < len; i++){  // STEP 1
    push()  // STEP 2
    rotate(i + frameCount/20) // STEP 4
    // fill(colors[i])  // STEP 3
    ellipse(size+i*size, 0, size) // STEP 2

    // STEP 4
    //ellipse(x, y, size, size)
    // try: add frameCount variables to x/y params in ellipse
    // try: variating x, y depends on mouse positions
    // try: variating size
    // try: variating colors

    pop() // STEP 2

  }
} 