// black and white rectangle
// smaller videoSize
var video;
var vScale = 12;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale)
  // ㄴ original video size.
  // ㄴ divide by vScale: makes less lagging.
}

//////////////////////////////////////////
/// No loadPixels, updatePixels, pixels //
/// because we are drawing shapes ////////
//////////////////////////////////////////

function draw() {
  video.loadPixels();
  
  background(51);
  video.updatePixels();

  for(var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4;
			var mirrorIndex = ((video.width-x+1) + y * video.width)*4; // reverse mirror 
      
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 225, 0, vScale);

      // noStroke();
      grayMosaic(x, y, bright)
      colorMosaic(x, y, w, bright)

    }
  }
}

function grayMosaic(x, y, color) {
  fill(color);
  rect(x*vScale, y*vScale, vScale, vScale);
}

function colorMosaic(x, y, w, bright) {
	// rect(x * vScale, y * vScale, w, w);
  
    fill(map(bright, 0, 225, 50, 100), map(sin(bright), -1, 1, 0, 200), map(tan(bright), -1, 1, 100, 200));

	if ( 5 < w && w < 7 ) {
		rect(x*vScale, y*vScale, w, w);
	} else if ( w >= 7) {
		ellipse(x*vScale, y*vScale, w, w);
	}
}
