// circle segments

let colors = []
const nums = 10
let r1 = 50, r2= 100, r3 = 150, r4 = 200, r5 = 250, r6 = 300
let heightSize, heightNums;
let offset = 0.1;

function setup() {
  createCanvas(9*50, 16*50);
  heightSize = height/(nums+5)
  heightNums = int(height/heightSize)+ 10
  
  // match arr1, arr2 colors
  let arr1 = getColors('https://coolors.co/palette/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08')
  let arr2 = getColors('https://coolors.co/palette/0450b4-046dc8-1184a7-15a2a2-6fb1a0-b4418e-d94a8c-ea515f-fe7434-fea802')

  colors.push(arr1, arr2)
  // frameRate(40)
  strokeWeight(0.25)
}

function draw() {
  background("#000"); // #9792E3 C5D5EA

  // r1 = sin(frameCount/30)*5 + r1

  let speed1 = sin(frameCount/100)*TWO_PI
  let speed2 = cos(frameCount/200)*TWO_PI

  translate(width/2, height/2)
  stroke(255)
  strokeWeight(sin(frameCount/10)*2)
  noFill()

  for(let i = 0; i < 8; i++) {
    let speed = speed2
    if(i % 2 === 1) speed = speed1
    drawCircleSegments(speed + TWO_PI/8*i, r1, r1*2, colors[0][i])
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
    drawCircleSegments(speed + TWO_PI/10*i, r2, r2*1.5, colors[1][i])
  }

  arc(0, 0, r2*2, r2*2, speed2 + TWO_PI/10*6, speed1 + TWO_PI/10*9)
  arc(0, 0, r2*2, r2*2, speed2 + TWO_PI/10*2, speed1 + TWO_PI/10*5)

  for(let i = 0; i < 6; i++) {
    let speed = speed2
    if(i % 2 === 0) speed = speed1
    drawCircleSegments(speed + TWO_PI/6*i, r3, r3*1.25, colors[0][i])
  }

  arc(0, 0, r3*2, r3*2, speed2+TWO_PI/6*3, speed2)
  arc(0, 0, r3*2, r3*2, speed1+TWO_PI/6*6, speed1+ TWO_PI/6*3)

  for(let i = 0; i < 6; i++) {
    let speed = speed1
    if(i % 2 === 0) speed = speed2
    drawCircleSegments(speed + TWO_PI/6*i, r4, r4*1.25, colors[1][i])
  }

  arc(0, 0, r4*2, r4*2, speed2 + TWO_PI/6*3, speed1 + TWO_PI/6*6)
  arc(0, 0, r4*1.25*2, r4*1.25*2, speed1 + TWO_PI/6*3, speed1 + TWO_PI/6*5)
  arc(0, 0, r4*1.25*2, r4*1.25*2, speed1 + TWO_PI/6*1, speed2 + TWO_PI/6*2)

  for(let i = 0; i < 10; i++) {
    let speed = speed2
    if(i % 2 === 0) speed = speed1
    drawCircleSegments(speed + TWO_PI/10*i, r5, r5*1.25, colors[0][i])
  }

  arc(0, 0, r5*2, r5*2, speed2 + TWO_PI/10*3, speed1 + TWO_PI/10*6)
  arc(0, 0, r5*1.25*2, r5*1.25*2, speed1 + TWO_PI/10*2, speed2 + TWO_PI/10*5)
  arc(0, 0, r5*1.25*2, r5*1.25*2, speed1 + TWO_PI/10*8, speed2 + TWO_PI/10*5)


  for(let i = 0; i < 6; i++) {
    let speed = speed1
    if(i % 2 === 0) speed = speed2
    drawCircleSegments(speed + TWO_PI/10*i, r6, r6*1.25, colors[1][i])
  }

  arc(0, 0, r6*1.25*2, r6*1.25*2, speed1 + TWO_PI/6*2, speed2 + TWO_PI/6*5)
  arc(0, 0, r6*1.25*2, r6*1.25*2, speed2 + TWO_PI/6*1, speed1 + TWO_PI/6*5)


  // draw gridlines
  push()
  for(let x = -width/2; x < width/2; x += r1/2 ) {
    for(let y = -height/2; y < height/2; y += r1/2 ) {
      strokeWeight(0.01)
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
  strokeWeight(tan(speed)*2)
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
