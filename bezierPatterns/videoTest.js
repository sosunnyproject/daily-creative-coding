var video;
var vScale = 12;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  setPoints();
  // video.size(width/vScale, height/vScale)
}

function draw() {
  background(51);
  video.loadPixels(); // pixels of video
  loadPixels(); // pixels of canvas
  for(var y = 0; y < video.height; y+=2) {
    for (var x = 0; x < video.width; x+=2) {

      // var index = ((video.width-x+1) + y * video.width)*4;
      // var r = video.pixels[index+0];
      // var g = video.pixels[index+1];
      // var b = video.pixels[index+2];

      // var bright = (r + g + b) / 3;
      // pixels[(index+0)*vScale] = bright;
      // pixels[(index+1)*vScale] = bright;
      // pixels[(index+2)*vScale] = bright;
      // pixels[(index+3)*vScale] = 255;

      drawBezier(v[0], v[1], v[2], v[3]);
    //   var w = map(bright, 0, 225, vScale, 0);
    //   fill(bright);
    //   noStroke();
    //   fill(map(bright, 0, 225, 100, 50), map(sin(bright),-1, 1, 200, 0), map(tan(bright),-1, 1, 200, 100) );
    //   rectMode(CENTER);
    //     if ( 5 < w && w < 7 ) {
    //       rect(x*vScale, y*vScale, 3, 3);
    //     } else if ( w >= 7) {
    //       ellipse(x*vScale, y*vScale, 3, 3);
    //     }
    }
  }
}

function setPoints(x, y, off) {
  let pointS = { x: x, y: y}
  let pointE = {
    x: pointS.x + random(-15, 15),
    y: pointS.y + sin(off)*15
  }
  // points.push(pointS)
  // points.push(pointE)

  let anchorS = {
    x: pointS.x + random(-25, 25), //(off)*25,
    y: pointS.y + random(-20, 40),
  }
  let anchorE = {
    x: pointE.x + sin(off)*25,
    y: pointE.y + sin(off)*20,
  }
  // anchors.push(anchorS)
  // anchors.push(anchorE)
let vertices = [pointS, anchorS, anchorE, pointE]

return vertices
}

function drawBezier(pointS, anchorS, anchorE, pointE) {
  bezier(pointS.x, pointS.y,
    anchorS.x, anchorS.y,
    anchorE.x, anchorE.y,
    pointE.x, pointE.y)
}
