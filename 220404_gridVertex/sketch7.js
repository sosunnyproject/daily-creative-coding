// circle segments - donut, rings
// https://discourse.processing.org/t/how-to-draw-a-ring/3873/6

let colors = []
const nums = 10
let r1 = 20, r2= 40, r3 = 60, r4 = 80, r5 = 100, r6 = 120, r7 = 140, r8 = 160, r9 = 180
let heightSize, heightNums;
let offset = 0.1;
let mic, micLevel
let startAngleSlider, endAngleSlider, startAngleValue, endAngleValue

function setup() {
  createCanvas(9*50, 14*50);
  heightSize = height/(nums+5)
  heightNums = int(height/heightSize)+ 10
  
  // match arr1, arr2 colors
  let arr1 = getColors('https://coolors.co/palette/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08')
  let arr2 = getColors('https://coolors.co/palette/0450b4-046dc8-1184a7-15a2a2-6fb1a0-b4418e-d94a8c-ea515f-fe7434-fea802')

  colors.push(arr1, arr2)

  // audio
	mic = new p5.AudioIn()
	mic.start()

  angleMode(DEGREES)

  startAngleSlider = createSlider(0, 359, 0, 5)
  endAngleSlider = createSlider(2, 360, 360, 5)

}

function draw() {
  background("#000"); // #9792E3 C5D5EA
	micLevel = map(mic.getLevel(), 0.0, 1.0, 20, 80)

  // r1 = sin(frameCount/30)*5 + r1

  let speed1 = 0 // sin(frameCount/100)*TWO_PI
  let speed2 = 0 // cos(frameCount/200)*TWO_PI

  startAngleValue = startAngleSlider.value()
  endAngleValue = endAngleSlider.value()

  translate(width/2, height/2)
  strokeWeight(2)
  noStroke()
  // draw gridlines
  push()
  for(let x = -width/2; x < width/2; x += r1/2 ) {
    for(let y = -height/2; y < height/2; y += r1/2 ) {
      // stroke(255)
      // strokeWeight(0.1)
      // fill(0)
      // rect(x, y, r1)
    }
  }
  pop()

  // outer ring 1
  // push()
  // fill(255, 0, 0)
  // arc(0, 0, r2*2, r2*2, 0, 170)
  // arc(0, 0, r2*2, r2*2, 180, 340)
  // pop()

  // push()
  // fill(0)
  // ellipse(0, 0, r1*2)
  // pop()

  // // inner circle
  // push()
  // fill(0, 255, 0)

  // arc(0, 0, r1*2, r1*2, 0, 30)
  // arc(0, 0, r1*2, r1*2, 40, 90)
  // arc(0, 0, r1*2, r1*2, 100, 190)
  // arc(0, 0, r1*2, r1*2, 200, 340)
  // pop()

  makeDonut(r1*2, r2*2, startAngleValue, endAngleValue, 60, '#ff4800')
  makeDonut(r2*2, r3*2, startAngleValue, endAngleValue, 60, '#ff5400')
  makeDonut(r3*2, r4*2, startAngleValue, endAngleValue, 60, '#ff6000')
  makeDonut(r4*2, r5*2, startAngleValue, endAngleValue, 60, '#ff6d00')
  makeDonut(r5*2, r6*2, startAngleValue, endAngleValue, 60, '#ff7900')
  makeDonut(r6*2, r7*2, startAngleValue, endAngleValue, 60, '#ff8500')
  makeDonut(r7*2, r8*2, startAngleValue, endAngleValue, 60, '#ff9100')
  makeDonut(r8*2, r9*2, startAngleValue, endAngleValue, 60, '#ff9e00')
}

function drawCircleSegments(speed, innerRadius, outerRadius, col) {
  let x1 = cos(speed)*innerRadius
  let y1 = sin(speed)*innerRadius

  let x2 = cos(speed)*outerRadius
  let y2 = sin(speed)*outerRadius

  let thickness = 1
  if(mic.getLevel()*100 > 3) thickness = tan(speed)*2
  else thickness = sin(speed)*2

  // if(frameCount%100 === 0) console.log(micLevel, mic.getLevel()*100)

  push()
  strokeWeight(thickness)
  fill(col)
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

// https://p5js.org/ko/reference/#/p5/beginContour
function makeDonut(innerRadius, outerRadius, startAngle, endAngle, steps, color) {
  push()
  // stroke(255)
  fill(color)

  beginShape()
  // exterior part
  for(let a = startAngle; a < endAngle; a += endAngle/steps) {
    vertex(outerRadius*cos(a), outerRadius*sin(a))
  }

  // interior part
  beginContour()
  for(let a = startAngle; a < endAngle; a += endAngle/steps) {
    vertex(innerRadius*cos(-a), innerRadius*sin(-a))
  }
  endContour()
  endShape(CLOSE)
  pop()
}