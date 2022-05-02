// black and white rectangle
// smaller videoSize
var video;
var vScale = 20;
let 색깔리스트 = [ "#D65108", "#7dce82", "#0075C4", "#EFA00B", "#e8e288", "#DDFCAD", "#74D3AE"] 
// 색깔리스트정하기('https://coolors.co/ff8360-e8e288-7dce82-3cdbd3-00fff5')
// https://coolors.co/7c6a0a-babd8d-ffdac6-fa9500-eb6424

let 시작각도 = 0
function setup() {
  createCanvas(900, 600, WEBGL);
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
  background(0);

  video.loadPixels();
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

      threeD(x, y, w, bright)

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

function threeD(x, y, w, bright) {
	// rect(x * vScale, y * vScale, w, w);
  // noStroke()
  let order = int(Math.ceil(map(bright, 0, 255, 0, 4)))
  // if(bright < 50) order = 0

  // strokeWeight(2)

  let 지름 = vScale

  // noFill()
  // noStroke()
  fill(색깔리스트[order])
  strokeWeight(0.5)
  push()

  switch(order) {
    case 0:
      translate(x*vScale + vScale/2 - width/2, y*vScale + vScale/2 - height/2)      
      // fill('green')
      rotateZ(mouseY)
      rotateY(mouseY)
      box(vScale)
      break;

    case 1: 
      translate(x*vScale + vScale/2 - width/2, y*vScale + vScale/2 - height/2, abs(cos(frameCount*2))*600)      
      rotateZ(mouseX)
      noFill()
      stroke(색깔리스트[order%색깔리스트.length])
      box(vScale/2)
      break;

    case 2: 
      translate(x*vScale + vScale/2 - width/2, y*vScale + vScale/2 - height/2)      
      noFill()
      strokeWeight(2)
      stroke(색깔리스트[order%색깔리스트.length])
      arc(0, 0, vScale/1.5)
      arc(-지름/2, 지름/2, vScale, vScale, 270, 360)
      arc(지름/2, -지름/2, vScale, vScale, 90, 180)
      break;

    case 3: 
      translate(x*vScale + vScale/2 - width/2, y*vScale + vScale/2 - height/2)      
      rotateX(mouseX)
      rotateZ(mouseX)
      box(vScale/1.5)
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
