let size = 100;
let len = 3;

let staticColors = ['rgb(0,0,0)', 'rgba(0, 243, 241,0.5)', 'rgba(178,255,0,0.5)', 'rgba(250,20,83, 0.5)']
let colors = ['rgb(0,0,0)', 
              'rgb(0, 243, 241)', 
              'rgb(178,255,0)', 
              'rgb(250,20,83)']
let colorHSLA = ['hsl(0, 0%, 0%)', 
                 'hsla(180, 100%, 10%, 1.0)', 
                 'hsla(78, 100%, 10%, 1.0)', 
                 'hsla(344, 96%, 10%, 1.0)']
let colorHSL = ['hsl(0, 0%, 0%)', 
                'hsl(180, 100%, 48%)', 
                'hsl(78, 100%, 50%)', 
                'hsl(344, 96%, 53%)']

function setup() {
  createCanvas(windowWidth, windowHeight);
  // angleMode(degrees)
}

function draw() {
  
  background(0, 10);
  // let angle = cos(frameCount / 10)
  
  // static rings
  // for (let i = len+1; i > 0 ; i--) {  //4, 3, 2, 1
  //   fill(colorHSLA[i-1])// 3, 2, 1, 0
  //   // ellipse(width/2, height/2, size*i*2)
  // }
  
  translate(width/2, height/2)
  noStroke()
  let frame = frameCount / 50
  
  for (let i = 0; i < len; i++) {
    push()
    rotate(i/2 + frameCount / 20)
    noFill()
    // noStroke()
    stroke(frameCount%255, 0, frameCount%100)
    strokeWeight(1)
    
    let x = size + size/2 + i * size

    // ellipse(x, 0, size, size)
    // ellipse(x, 0, 
    //         cos(frame)*size * 10,
    //         sin(frame)*size * 10
    //        )
    square(x, 0, 
         sin(frame) * size * 5, 
         10)
    // triangle(60+x, 150, 116+x, 40, 172+x, 150);
    // 지름: 1 ~ -1

    // line(x, 0, x, 20)
    // size * sin(frame)
   // api: ellipse(x, y, size, size)
    pop()

  }
}
