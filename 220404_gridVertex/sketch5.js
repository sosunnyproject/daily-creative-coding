// circle segments

let colors = []
const nums = 10
let r1 = 50, r2= 100, r3 = 150
let heightSize, heightNums;
let offset = 0.1;

function setup() {
  createCanvas(9*50, 16*50);
  heightSize = height/(nums+5)
  heightNums = int(height/heightSize)+ 10
  
  // match arr1, arr2 colors
  let arr1 = getColors('https://coolors.co/ff8360-e8e288-7dce82-3cdbd3-00fff5')
  let arr2 = getColors('https://coolors.co/f55d3e-f7cb15-7dce82-76bed0-002626')

  // match arr3, arr4 colors
  let arr3 = getColors('https://coolors.co/06aed5-086788-03fcba-f0c808-dd1c1a')
  let arr4 = getColors('https://coolors.co/e4572e-29335c-03fcba-f3a712-669bbc')
  arr4 = getColors('https://coolors.co/ffbe0b-fb5607-ff006e-8338ec-3a86ff')
  // arr4 = getColors('https://coolors.co/9b5de5-f15bb5-fee440-00bbf9-00f5d4')
  
  colors.push(arr1, arr2, 
              arr3, arr4)
  // frameRate(40)
  strokeWeight(0.25)
}

function draw() {
  background("#000"); // #9792E3 C5D5EA

  translate(width/2, height/2)
  stroke(255)
  strokeWeight(2)
  noFill()

  // r1 = sin(frameCount/30)*5 + r1

  let speed1 = sin(frameCount/300)*TWO_PI
  let speed2 = sin(frameCount/400)*TWO_PI

  for(let i = 0; i < 8; i++) {
    let speed = speed2
    if(i % 2 === 1) speed = speed1
    drawCircleSegments(speed + TWO_PI/8*i, r1, r1*2, colors[1][i%colors.length])
  }
  // drawCircleSegments(speed1, r1, r1*2, colors[0][1])
  // drawCircleSegments(speed1 + 5, r1, r1*2, colors[0][2])
  // drawCircleSegments(speed1 + 10, r1, r1*2, colors[0][3] )
  // drawCircleSegments(speed2 + 15, r1, r1*2, colors[0][4])
  // drawCircleSegments(speed2 + 20, r1, r1*2, colors[0][0])

  // inner circle
  arc(0, 0, r1*2, r1*2, speed2 + TWO_PI/8*1, speed2 + TWO_PI/8*3)
  arc(0, 0, r1*2, r1*2, speed1 + TWO_PI/8*4, speed1 + TWO_PI/8*7)
  arc(0, 0, r1*2, r1*2, speed1 + TWO_PI/8*6, speed1 + TWO_PI/8*8)

  for(let i = 0; i < 10; i++) {
    let speed = speed2
    if(i % 2 === 1) speed = speed1
    drawCircleSegments(speed + TWO_PI/10*i, r2, r2*1.5, colors[1][i%colors.length])
  }
  // drawCircleSegments(speed2 + TWO_PI/5, r2, r2*1.5, colors[1][0])
  // drawCircleSegments(speed1 + TWO_PI/5*2, r2, r2*1.5, colors[1][1])
  // drawCircleSegments(speed1 + TWO_PI/5*3, r2, r2*1.5, colors[1][2])
  // drawCircleSegments(speed2 + TWO_PI/5*4, r2, r2*1.5, colors[1][3])
  // drawCircleSegments(speed2, r2, r2*1.5, colors[1][4])

  arc(0, 0, r2*2, r2*2, speed2 + TWO_PI/10*6, speed1 + TWO_PI/10*9)
  arc(0, 0, r2*2, r2*2, speed2 + TWO_PI/10*2, speed1 + TWO_PI/10*5)

  for(let i = 0; i < 6; i++) {
    let speed = speed2
    if(i % 2 === 0) speed = speed1
    drawCircleSegments(speed + TWO_PI/6*i, r3, r3*1.25, colors[1][i%colors.length])
  }
  // drawCircleSegments(speed1 + TWO_PI/5, r3, r3*1.5, colors[2][0])
  // drawCircleSegments(speed2 + TWO_PI/5*2, r3, r3*1.5, colors[2][1])
  // drawCircleSegments(speed2 + TWO_PI/5*3, r3, r3*1.5, colors[2][2])
  // drawCircleSegments(speed1 + TWO_PI/5*4, r3, r3*1.5, colors[2][3])
  // drawCircleSegments(speed1, r3, r3*1.5, colors[2][4])
  arc(0, 0, r3*2, r3*2, speed2+TWO_PI/6*3, speed2)
  arc(0, 0, r3*2, r3*2, speed1+TWO_PI/6*6, speed1+ TWO_PI/6*3)

  // arc(0, 0, r3*1.5*2, r3*1.5*2, speed2 + TWO_PI/5*2, speed2 + TWO_PI/5*3)
  // arc(0, 0, r3*1.5*2, r3*1.5*2, speed1 + TWO_PI/5*4, speed2 + TWO_PI/5*3)


  // draw gridlines
  push()
  for(let x = -width/2; x < width/2; x += r1 ) {
    for(let y = -height/2; y < height/2; y += r1 ) {
      strokeWeight(0.1)
      rect(x, y, r1)
    }
  }
  pop()
}

function drawCircleSegments(speed, innerRadius, outerRadius, col) {
  let x1 = cos(speed)*innerRadius
  let y1 = sin(speed)*innerRadius

  let x2 = cos(speed)*outerRadius
  let y2 = sin(speed)*outerRadius

  push()
  strokeWeight(5)
  stroke(col)
  point(x1, y1)
  point(x2, y2)
  line(x1, y1, x2, y2)
  pop()

}


function getColors(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}

function distCheck(vertex1, vertex2) {
  let v1 = createVector(vertex1.x, vertex1.y)
  let v2 = createVector(vertex2.x, vertex2.y)
  let dist = v1.dist(v2)
  if(dist < 100  && dist > 40) return true
  else return false
}
