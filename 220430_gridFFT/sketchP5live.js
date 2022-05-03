// p5live version
let cols1 = [ "#0075C4", "#EFA00B", "#D65108", "#7dce82", "#e8e288", "#DDFCAD", "#74D3AE"] 
let cols2 = createCols('https://coolors.co/202c39-283845-b8b08d-f2d492-f29559')

var video;
var vScale = 12;
var mic;
var micLevel;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  mic = new p5.AudioIn()
  mic.start();
  getAudioContext().resume();
  micLevel = 0.5;
  // colorMode(HSB, 100);
}

function draw() {
  background(51);
  video.loadPixels(); // pixels of video
  loadPixels(); // pixels of canvas
  micLevel = mic.getLevel() * 10;
  // console.log(micLevel);
  for(var y = 0; y < 100; y++) {
    for (var x = 0; x < 100; x++) {
      var index = ((video.width-x+1) + y * video.width)*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r + g + b) / 3;
      var w = map(bright, 225, 0, vScale, 0);
     // fill(bright);
      noStroke();
      rectMode(CORNER);
      ellipseMode(CORNER);
      // rectMode(CENTER);
        // if ( 8 < w && w < 10 ) {
        //   rect(x*vScale, y*vScale, micLevel*20, micLevel*20);
        // } else

      if (w >= 8 ) {
            // fill( random(100, 200), map(sin(bright),-1, 1, 100, 250), map(bright, 0, 1, 0, 100));
            // fill(map(bright, 0, 1, 0, 100), map(sin(bright),-1, 1, 100, 250), frameCount%250);

            fill(cols1[x%cols1.length])
           rect(x*vScale, y*vScale, micLevel*40, micLevel*40);

          //ellipse(x*vScale, y*vScale, micLevel*40, micLevel*80);
      }
      else if (6 < w ) {
        fill(cols2[(x*y)%cols2.length])

        // fill(frameCount%250, map(tan(bright),-1, 1, 100, 250), map(bright, 0, 1, 0, 50));
        ellipse(x*vScale, y*vScale, micLevel*25, micLevel*25);
      }
    }
  }
}

function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}


//imported
function createCols(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}