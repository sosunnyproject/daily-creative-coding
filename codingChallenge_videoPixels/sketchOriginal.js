//video copy and paste
var video;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
	video.size(width, height) // original, grayscale
}

///////////////////////////////////////////
/// Use loadPixels, updatePixels, pixels //
/// when changing the canvas pixels[ ], ///
/// not when you draw shapes //////////////
///////////////////////////////////////////

function draw() {
  background(51);
  
	video.loadPixels(); // pixels of video

  loadPixels(); // pixels of canvas
  for(var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var index = (x + y * width) * 4; 
			
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

			copyOriginalVideo(index, r, g, b);

			var bright = (r+g+b)/3;

			grayscaleVideo(index, bright)

    }
  }
  updatePixels(); // update pixels of canvas
}

function copyOriginalVideo(index, r, g, b) {
	pixels[index+0] = r;
	pixels[index+1] = g;
	pixels[index+2] = b;
	pixels[index+3] = 255;
}

function grayscaleVideo(index, bright) {
	pixels[index+0] = bright;
	pixels[index+1] = bright;
	pixels[index+2] = bright;
	pixels[index+3] = 255;
}

