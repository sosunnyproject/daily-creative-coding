// ref: https://www.openprocessing.org/sketch/942270

let palette = ['#3399CC', '#67B8DE', '#91C9E8', '#B4DCED','#E8F8FF' ];

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100, 100)
  // hsb, h, s, b, alpha
  angleMode(DEGREES)
  // ellipseMode(CORNERS)
}

function draw() {
  background(0, 0, 90)

  noStroke()
  drawingContext.shadowColor = color(0, 0, 0,60)
  drawingContext.shadowBlur = 11

  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  // CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  // https://p5js.org/examples/color-radial-gradient.html

  for (let i = 0; i < width+20; i+= 20) {
    for (let j = 0; j < height+20; j+= 20) {
      let linearGrad = drawingContext.createLinearGradient(i+random(-10, -1), j+random(-10, -1), i+random(-3,6), j+random(-3,7))
      let radialGrad = drawingContext.createRadialGradient(i+random(-10, -1), j+random(-10, -1), 3 , i+random(-3,6), j+random(-3,7), 6)
      
      // assign color palette
      palette = shuffle(palette, true);
      let c1 = random(palette);
      let c2 = random(palette);
      while (c1 == c2) {
        c2 = random(palette);
      }
      linearGrad.addColorStop(0, c2);
      linearGrad.addColorStop(1, c1);
      drawingContext.fillStyle = linearGrad;
      
      let ratio = 1;
      
      ellipse(i, j, 20)
      // rect(i, j, 15, 15)
    }
  }

  frameRate(0.8)
}