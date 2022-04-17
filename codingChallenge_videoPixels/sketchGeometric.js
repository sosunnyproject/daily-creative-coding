// black and white rectangle
// smaller videoSize
var video;
var vScale = 20;
let 색깔리스트 = ["#ff8360", "#e8e288", "#7dce82", "#3cdbd3", "#00fff5", "8ea604", "f5bb00", "d76a03", "bf3100"] 
// 색깔리스트정하기('https://coolors.co/ff8360-e8e288-7dce82-3cdbd3-00fff5')
// https://coolors.co/7c6a0a-babd8d-ffdac6-fa9500-eb6424

let 시작각도 = 0
function setup() {
  createCanvas(240*4, 320*2);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale)
  rectMode(CENTER)
  angleMode(DEGREES)
  // ㄴ original video size.
  // ㄴ divide by vScale: makes less lagging.
}

//////////////////////////////////////////
/// No loadPixels, updatePixels, pixels //
/// because we are drawing shapes ////////
//////////////////////////////////////////

function draw() {
  video.loadPixels();
  
  background(0);
  // video.updatePixels();

  // 시작각도 = map(mouseX, 0, width, 0, 360)

  for(var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4;
			var mirrorIndex = ((video.width-x+1) + y * video.width)*4; // reverse mirror 
      
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];


      var bright = (r + g + b) / 3;
      var w = map(bright, 0, 225, 10, vScale);

      colorMosaic(x, y, w, bright)

    }
  }

  // addAngle()
}

function mouseClicked() {
  시작각도 += 30;
}

function addAngle() {
  시작각도 += 10
}

function colorMosaic(x, y, w, bright) {
	// rect(x * vScale, y * vScale, w, w);
  noFill()
  let order = int(map(bright, 0, 255, 0, 4))
  // if(bright < 50) order = 0

  strokeWeight(2)
  stroke(색깔리스트[order%색깔리스트.length])

  let 지름 = w

  push()
  translate(x*vScale + vScale/2, y*vScale + vScale/2)      

  switch(order) {
    case 0: 
      // rotate(-45)
      // ellipse(0, 0, 지름/3, 지름+5)
      push()
      fill(색깔리스트[order%색깔리스트.length])
      ellipse(-지름/4, -지름/4, w/2)
      ellipse(지름/4, -지름/4, w/2)
      ellipse(-지름/4, 지름/4, w/2)
			ellipse(지름/4, 지름/4, w/2)
      pop()

      // rotate(90)
      // ellipse(0, 0, 지름/3, 지름+5)
      // arc(-지름/2, -지름/2, 지름*2, 지름*2, 시작각도, 시작각도+90)
      // arc(-지름/2, -지름/2, 지름, 지름, 시작각도, 시작각도+90)
      break;

    case 1: 
      // push()
      rotate(시작각도)
      // arc(-지름/2, 지름/2, 지름, 지름, 270, 360)
      // arc(지름/2, -지름/2, 지름, 지름, 90, 180)
      // pop()

      arc(지름/2, -지름/2, w*2, w*2, 시작각도+90, 시작각도+180)
      arc(지름/2, -지름/2, w, w, 시작각도+90, 시작각도+180)

      // ellipse(-지름/4, -지름/4, 지름/2, 지름/2)
      // ellipse(지름/4, 지름/4, 지름/2, 지름/2)
      // ellipse(지름/4, -지름/4, 지름/2, 지름/2)
      // ellipse(-지름/4, 지름/4, 지름/2, 지름/2)
      break;

    case 2: 
      // push()
      // rotate(시작각도)
      // arc(-지름/2, 지름/2, w, w, 270, 360)
      // arc(지름/2, -지름/2, w, w, 90, 180)
      // pop()

      arc(-지름/2, 지름/2, w*2, w*2, 시작각도+270, 시작각도+360)
      arc(-지름/2, 지름/2, w, w, 시작각도+270, 시작각도+360)
      break;

    case 3: 
      // push()
      // rotate(시작각도)
      // arc(- 지름/2, -지름/2, w, w, 0, 90)
			// arc( 지름/2, 지름/2, w, w, 180, 270)
      // pop()
      arc(w/2, -w/2, w*2, w*2, 시작각도+180, 시작각도+270)
      arc(w/2, -w/2, w, w, 시작각도+180, 시작각도+270)
      break;

    case 4: 
      arc(지름/2, 지름/2, 지름*2, 지름*2, 180, 270)
      arc(지름/2, 지름/2, 지름, 지름, 180, 270)
      
      // noFill()
      // stroke(색깔리스트[order])
      // arc(-지름, -지름, 지름*1.5, 지름*1.5, 0, 90)
      // arc(-지름/2, -지름/2, 지름*2, 지름*2, 0, 90)
      // arc(0, 0, 지름*2.5, 지름*2.5, 0, 90)
      break;

    case 5: 
      arc(지름/2, -지름/2, 지름*2, 지름*2, 90, 180)
      arc(지름/2, -지름/2, 지름, 지름, 90, 180)
      break;

    case 6: 
      arc(-지름/2, -지름/2, 지름*2, 지름*2, 0, 90)
      arc(-지름/2, -지름/2, 지름, 지름, 0, 90)
      break;
  }
  pop()
}

function 색깔리스트정하기(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}
