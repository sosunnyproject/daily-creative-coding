
// let palette = ['#3399CC', '#67B8DE', '#91C9E8', '#B4DCED','#E8F8FF' ]
// let palette = ["#EDF7F5", "#B7D7D8", "#FF8984", "#204E5F", "#FFC6A8"];
// let palette = ["#B34E4B", "#FFA19E", "#FF8985", "#39B363", "#85FFAF"]
// let palette = ["#814BB3", "#FFD99E", '#C485FF', '#85FFAF', '#39B363']
let palette = [ '#BFA3D9', '#D9B4A3', '#C9B8D9', '#D7D9A3', '#ADD9D5']
let bgGraphics;
let offset = 0.01;

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100, 100)
  // hsb, h, s, b, alpha
  angleMode(DEGREES)
  // ellipseMode(CORNERS)
  
  bgGraphics = createGraphics(width, height)
  bgGraphics.colorMode(HSB)
  bgGraphics.fill(0, 0, 90)
  bgGraphics.strokeWeight(0.5)

  row(0, width/5, palette[4])
  row(width/5, width/5*2, palette[3])
  row(width/5*2, width/5*3, palette[2])
  row(width/5*3, width/5*4, palette[1])
  row(width/5*4, width, palette[0]) 
}

function row(startHeight, endHeight, sectionColor){
  for (let i = 0; i < width; i+=2) {
    for (let j = startHeight; j < endHeight; j+=2) {
      let rand = int(random(0, 1))
      if (rand) {
        bgGraphics.stroke(color(0, 0, 90))
      } else {
        bgGraphics.stroke(sectionColor)
      }
      // bgGraphics.point(i, j)
    }
  }
}

function draw() {
  blendMode(BLEND)
  background(182, 15, 80,50);
  image(bgGraphics, 0, 0);
  drawingContext.shadowColor = color(0, 0, 0,60)
  drawingContext.shadowBlur = 11

  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient
  // CanvasGradient ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);
  // https://p5js.org/examples/color-radial-gradient.html

  let sinOffset = sin(frameCount*20)
  
  for (let i = -20; i < width+20; i+= 30) {
    for (let j = 0; j < height+20; j+= 30) {
      
      let linearGrad = drawingContext.createLinearGradient(i+(sinOffset)*30, j+(sinOffset)*30, i+(sinOffset)*100, j+(sinOffset)*-10 )
//       let radialGrad = drawingContext.createRadialGradient(i+random(-10, -1), j+random(-10, -1), 3 , i+random(-3,6), j+random(-3,7), 6)
      noStroke()
      
      // assign color palette
      palette = shuffle(palette, true);
      let c1 = palette[0]
      let c2 = palette[1]

      drawingContext.fillStyle = linearGrad;
      
      linearGrad.addColorStop(0, c2);
      linearGrad.addColorStop(1, c1);
      
      let ratio = 1;
      // let rand = int(random(0, 4))
      let off = sin(frameCount*20)

      offset += random(20, 40)
      bezier(i, j, 
           i+off*40, j+noise(offset)*off*4, 
           i+off*8, j+noise(offset)*off*-100, 
           i+100, j )
    }
  }
  frameRate(4)
}
