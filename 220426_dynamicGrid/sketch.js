let x1 = 0, y1 = 0, w = 0, h = 0
let r = 50
let speed = 100
let canvas;

function setup() {
  canvas = createCanvas(400, 400);
  w = width/2 + r
  h = height/2 + r
}

function draw() {
  background(220);
  // h = mouseY
  
  rect(x1, y1, w, h)
  rect(x1 + w, y1, width - w, h)
  
  // bottom row
  rect(x1, h, w, height-h)
  rect(x1 + w, h, width-w, height-h)
  
  // w += 1
  // h += 1
  
  if(w > width) w = 0
  if(h > height) h = 0
}

function changeHeight() {
}

function circularHeight() {
}
