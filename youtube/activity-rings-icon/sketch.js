// editor: https://editor.p5js.org/sosunnyproject/sketches/hxYeOoT3a

let size = 50;
let len = 3;
let staticColors = ['rgb(0,0,0)', 'rgba(0, 243, 241,0.5)', 'rgba(178,255,0,0.5)', 'rgba(250,20,83, 0.5)']
let colors = ['rgb(0,0,0)', 'rgb(0, 243, 241)', 'rgb(178,255,0)', 'rgb(250,20,83)']
let colorHSLA = ['hsl(0, 0%, 0%)', 'hsla(180, 100%, 10%, 1.0)', 'hsla(78, 100%, 10%, 1.0)', 'hsla(344, 96%, 10%, 1.0)']
let colorHSL = ['hsl(0, 0%, 0%)', 'hsl(180, 100%, 48%)', 'hsl(78, 100%, 50%)', 'hsl(344, 96%, 53%)']


function setup() {
  createCanvas(windowWidth, windowHeight);
  // angleMode(degrees)
}

function draw() {
  
  background(0, 5);
  let angle = cos(frameCount / 10)
  
  // static rings
  for (let i = len+1; i > 0 ; i--) {  //4, 3, 2, 1
    fill(colorHSLA[i-1])// 3, 2, 1, 0
    // ellipse(width/2, height/2, size*i*2)
  }
  
  translate(width / 2, height / 2)
  noStroke()
  let frame = frameCount / 10
  
  for (let i = 0; i < len; i++) {
    push()
    rotate(i + frameCount / 20)
    fill(colorHSL[i+1])
    let x = size + size/2 + i * size

    ellipse(x, 0, 
            size )

    // stroke(255)
    // line(x, 0, x, 20)
    // size * sin(frame)
   // api: ellipse(x, y, size, size)
    pop()

  }
}