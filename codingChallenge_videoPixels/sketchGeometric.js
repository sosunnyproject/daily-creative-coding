// black and white rectangle
// smaller videoSize
var video;
var vScale = 15;
let 색깔리스트 = [ "#0075C4", "#EFA00B", "#D65108", "#7dce82", "#e8e288", "#DDFCAD", "#74D3AE"] 
// 색깔리스트정하기('https://coolors.co/ff8360-e8e288-7dce82-3cdbd3-00fff5')
// https://coolors.co/7c6a0a-babd8d-ffdac6-fa9500-eb6424

let 시작각도 = 0
function setup() {
  createCanvas(300*3, 200*4);
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
  // noStroke()
  let order = int(map(bright, 0, 255, 0, 6))
  // if(bright < 50) order = 0

  // strokeWeight(2)
  // fill(색깔리스트[order%색깔리스트.length])

  let 지름 = vScale

  noFill()
  noStroke()
  strokeWeight(2)
  push()
  translate(x*vScale + vScale/2, y*vScale + vScale/2)      

  switch(order) {
    case 0:
      fill(50)
      // stroke("#335C67") // #791E94") //#74D3AE")
      // stroke("#9b5de5")

      rotate(-45)
      ellipse(0, 0, w/2, w+10)
      rotate(90)
      ellipse(0, 0, w/2, w+10)

      // ellipse(-w/4, -w/4, w/2)
      // ellipse(w/4, -w/4, w/2)
      // ellipse(-w/4, w/4, w/2)
			// ellipse(w/4, w/4, w/2)

      // arc(-지름/2, -지름/2, 지름*2, 지름*2, 시작각도, 시작각도+90)
      // arc(-지름/2, -지름/2, 지름, 지름, 시작각도, 시작각도+90)
      break;

    case 1: 
      rotate(시작각도)
      stroke(80)
      // stroke("#E09F3E")
      // stroke("#f15bb5")
      arc(-지름/2, 지름/2, 지름, 지름, 270, 360)
      arc(지름/2, -지름/2, 지름, 지름, 90, 180)

      // fill("#EFA00B")
      // arc(w/2, -w/2, w*2, w*2, 시작각도+90, 시작각도+180)
      // arc(w/2, -w/2, w, w, 시작각도+90, 시작각도+180)

      // ellipse(-지름/4, -지름/4, 지름/2, 지름/2)
      // ellipse(지름/4, 지름/4, 지름/2, 지름/2)
      // ellipse(지름/4, -지름/4, 지름/2, 지름/2)
      // ellipse(-지름/4, 지름/4, 지름/2, 지름/2)
      break;

    case 2: 
      // push()
      stroke("#9E2A2B") // red
      stroke("#00bbf9")
      rotate(시작각도)
      // arc(- 지름/2, -지름/2, 지름, 지름, 0, 90)
      // arc( 지름/2, 지름/2, 지름, 지름, 180, 270)

      stroke(120)
      arc(-w/2, -w/2, w/2, w/2, 0, 90)
      arc(-w/2, -w/2, w, w, 0, 90)
      arc(-w/2, -w/2, w*1.5, w*1.5, 0, 90)
      arc(-w/2, -w/2, w*2, w*2, 0, 90)
      // pop()

      // fill("#8A84E2") // ("#7dce82")
      // arc(w/2, w/2, w*2, w*2, 시작각도+180, 시작각도+270)
      // arc(w/2, w/2, w, w, 시작각도+180, 시작각도+270)
      break;

    case 3: 
      stroke("#DE6449") // #F7FFF7") // "#e8e288")
      stroke("#00f5d4")
      stroke(180)

      // arc(w/2, w/2, w*2, w*2, 180, 270)
      // arc(w/2, w/2, w, w, 180, 270)
      
      // noFill()
      // stroke(색깔리스트[order])
      arc(w/2, -w/2, w/2, w/2, 90, 180)
      arc(w/2, -w/2, w, w, 90, 180)
      arc(w/2, -w/2, w*1.5, w*1.5, 90, 180)
      arc(w/2, -w/2, w*2, w*2, 90, 180)
      // arc(0, 0, 지름*2.5, 지름*2.5, 0, 90)
      break;

    case 4: 
       // push()
       stroke(220)
       // stroke("#FFF3B0")
       // stroke("#fee440")
       rotate(시작각도)
       arc(-지름/2, 지름/2, 지름, 지름, 270, 360)
       arc(지름/2, -지름/2, 지름, 지름, 90, 180)
       // pop()
 
       // fill("#4ECDC4") //#D65108")
       // arc(-w/2, w/2, w*2, w*2, 시작각도+270, 시작각도+360)
       // arc(-w/2, w/2, w, w, 시작각도+270, 시작각도+360)
      break;

    case 5: 
      stroke(255)
      // stroke("#B4C5E4") // "#FF6B6B") // ("#DDFCAD")
      // arc(0, 0, w, w, 0, 90)
      // arc(0, 0, w, w, 180, 270)
      // stroke("#073b4c")
      arc(w/2, w/2, w/2, w/2,180, 270)
      arc(w/2, w/2, w, w,180, 270)
      arc(w/2, w/2, w*1.5, w*1.5, 180, 270)
      arc(w/2, w/2, w*2, w*2, 180, 270)
      break;

    case 6: 
      fill("#0075C4")
      stroke(255)
      arc(-w/2, -w/2, w*2, w*2, 0, 90)
      arc(-w/2, -w/2, w, w, 0, 90)

      
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
