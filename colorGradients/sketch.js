// ref: https://www.openprocessing.org/sketch/942270

let palette = ['#3399CC', '#67B8DE', '#91C9E8', '#B4DCED','#E8F8FF' ]

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100, 100)
  // hsb, h, s, b, alpha
  angleMode(DEGREES)
  // ellipseMode(CORNERS)
}

function draw() {
  background(0, 0, 90)

  
  drawingContext.shadowColor = color(0, 0, 0,60)
  drawingContext.shadowBlur = 11

  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  // CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  // https://p5js.org/examples/color-radial-gradient.html

  for (let i = 0; i < width+20; i+= 30) {
    for (let j = 0; j < height+20; j+= 30) {
      let linearGrad = drawingContext.createLinearGradient(i+random(-10, -1), j+random(-10, -1), i+random(-10, 30), j+random(-20, 40))
//       let radialGrad = drawingContext.createRadialGradient(i+random(-10, -1), j+random(-10, -1), 3 , i+random(-3,6), j+random(-3,7), 6)
      noStroke()
      
      // assign color palette
      palette = shuffle(palette, true);
      let c1 = random(palette);
      let c2 = random(palette);
      while (c1 == c2) {
        c2 = random(palette);
      }
      drawingContext.fillStyle = linearGrad;
      
      linearGrad.addColorStop(0, c2);
      linearGrad.addColorStop(1, c1);
      
      let ratio = 1;
      let rand = int(random(0, 4))

      drawShape(rand, i, j)
    }
  }

  frameRate(0.8)
}

function drawShape(rand, i, j){
  if(rand === 0) {
         bezier(i+random(10, 40), j+random(10, 40), 
           random(i-30, i+50), random(j-30, j+50),  
           random(i-30, i+50), random(j-20, j+40), 
           i+random(-10,40), j+random(-10,40))
  } else if (rand === 1){
    ellipse(i+10, j+10, 25, 25) 
  } else if(rand === 2){
                 bezier(i+random(10, 40), j+random(10, 40), 
           random(i-30, i+50), random(j-30, j+50),  
           random(i-30, i+50), random(j-20, j+40), 
           i+random(-10,40), j+random(-10,40))
    // rect(i+10, j, 20, 20, 5) 
  } else if(rand===3){
    triangle(i, j+26, i+15, j, i+30, j+26)
  }
  
}