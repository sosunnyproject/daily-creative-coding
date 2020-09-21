let img;
let pixels = []
let points, bounds, font
let count1 =0
let quote1 = "Women belong in all places where decisions are being made. It shouldn't be that women are the exception."
let quoteInd = 0
let canvas 
let fontSize = 20
let palette = ['#26030D','#590826', '#BF3467', '#64758C', '#BF9F9F']
function preload() {
  img = loadImage('rbg-photo-whitebg.jpg');
  font = loadFont('fonts/static/PlayfairDisplay-Black.ttf')
}

function setup() {
  canvas = createCanvas(windowHeight, windowHeight);
  image(img, 0, 0)

  points = font.textToPoints('ruth ginsburg', 0, 0, 30, {
    sampleFactor: 5,
    simplifyThreshold: 0
  });
  bounds = font.textBounds('ruth ginsburg', 0, 0, 40);

  textSize(fontSize)
  textFont('Montserrat');

}

function draw() {

  canvas.mouseOver(drawText)
  canvas.mouseOut(drawImg)
  // textPoints
  // beginShape();
  // translate(40, 800);
  // stroke(200)
  // noFill()
  // for (let i = 0; i < points.length; i++) {
  //   let p = points[i];
  //   vertex(
  //     p.x * width / bounds.w +
  //       sin(20 * p.y / bounds.h + millis() / 1000) * width / 30,
  //     p.y * height / bounds.h
  //   );
  // }
  // endShape(CLOSE);

}

function drawText(){
  background(255)
  textFont('Montserrat');

  for (let i = 0; i < width; i+=14) {
    for (let j = 0; j < height; j+=8) {
      let c = img.get(j, i)
      noStroke()
      if(c[1] >200 && c[2] > 200) {
        fill(200)
      } else {
        // fill(255, 0, 255)
        fill(random(palette))
      }
      textSize(10)
      textFont('Calistoga')
      text(quote1[quoteInd], j, i)  

      quoteInd++
      if(quoteInd > quote1.length) {
        quoteInd = 0
      }
      // console.log(quoteInd)
    }
  }
  noLoop()
}

function drawImg(){
  background(255)
  image(img, 0, 0)
}