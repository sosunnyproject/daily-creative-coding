let radiusSlider;
let extraLen = 0;

function setup() {
  createCanvas(400, 400);
  radiusSlider = createSlider(0, 180, 70);
}

function draw() {
  // background(220);
  let radius = radiusSlider.value();

  push();
  translate(width/2, height/2);

  // hexagon with flat line at the top.
  // rotate(PI/2);

  let drawAngle = TWO_PI/6;
  // drawHexagon(0, 0, radius);

  // 여러 육각형
  for (let i = 0; i < TWO_PI; i += drawAngle) {
    let xPos = cos(i) * 30;
    let yPos = sin(i) * 30;

    drawHexagon(xPos, yPos, radius);
  }

  pop();
}

function drawHexagon(x, y, radius) {
  let hexAngle = TWO_PI / 6; // hexagon: 6, square: 4;
  let ind = 0;

  beginShape();

  for (let a = 0; a < TWO_PI - PI/4; a += hexAngle) {
    ind++;

    if(degrees(a) === 0) {
      console.log(degrees(a));
      // console.log(degrees(a));
      // radius = radius + 50;
      extraLen = 10;
    }

    /*
    // 꼭짓점마다 각도값 표시
    fill(255, 0, 0);
    textSize(10);
    textAlign(CENTER, CENTER);
    text( ind + " ," + degrees(a), x + cos(a) * radius,  y + sin(a) * radius );  // text location
    */

    let sx = x + cos(a) * (radius + extraLen);
    let sy = y + sin(a) * (radius + extraLen);
    vertex(sx, sy);

  }
  endShape(CLOSE);
}
