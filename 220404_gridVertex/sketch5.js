// circle segments

let colors = []
const nums = 10
const r1 = 50, r2= 100, r3 = 150
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
  strokeWeight(5)
  noFill()

  drawCircleSegments(frameCount/20, r1, r1*2)
  drawCircleSegments(frameCount/20 + 5, r1, r1*2)
  drawCircleSegments(frameCount/20 + 10, r1, r1*2)
  drawCircleSegments(frameCount/20 + 15, r1, r1*2)
  drawCircleSegments(frameCount/20 + 20, r1, r1*2)

  drawCircleSegments(frameCount/30 + 10, r2, r2*1.5)
  drawCircleSegments(frameCount/30 + 20, r2, r2*1.5)
  drawCircleSegments(frameCount/30 + 30, r2, r2*1.5)
  drawCircleSegments(frameCount/30 + 40, r2, r2*1.5)
  drawCircleSegments(frameCount/30, r2, r2*1.5)

  push()
  strokeWeight(0.5)
  ellipse(0, 0, r1*2)  // entire path
  ellipse(0, 0, r2*2)  // entire path
  ellipse(0, 0, r2*1.5*2)  // entire path
  pop()

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

function drawCircleSegments(speed, innerRadius, outerRadius) {
  let x1 = cos(speed)*innerRadius
  let y1 = sin(speed)*innerRadius

  point(x1, y1)

  let x2 = cos(speed)*outerRadius
  let y2 = sin(speed)*outerRadius

  point(x2, y2)

  push()
  strokeWeight(1)
  line(x1, y1, x2, y2)
  pop()
}


function drawOneRow(topY, bottomY, slow, fast, colorArr){
  noStroke()
  
  let xSize = (width*2)/nums
  
  let speedSin = sin(frameCount/slow)
  let speedCos = cos(frameCount/slow)
  let speedTan = tan(frameCount/slow)
  
  let change1 = speedCos*xSize
  let change2 = speedSin*xSize
  let change3 = speedTan*xSize*2
  
  let xOffset1 = speedCos*xSize
  let xOffset2 = speedSin*xSize
  let xOffset3 = speedTan*xSize
  
  const changes = [change1, change2, change3]
  const xOffsets = [xOffset1, xOffset2, xOffset3] // make rectangle to trapezoid/triangle
  const colorInd = [1, 2, 3, 4, 
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0,
                    1, 2, 3, 4,
                    3, 2, 1, 0]
    
  // Draw First One Seperately (leftmost)
  beginShape()
  fill(colorArr[colorArr.length-1])
  vertex(-50, topY)  // left top

  let rtx = xSize + change1
  vertex(rtx, topY) // right top  
  vertex(rtx, bottomY) // right bottom
    
  vertex(-50, bottomY)  // left bottom
  endShape(CLOSE)
  
  // Draw Last One (rightmost)
  beginShape()
  fill(colorArr[0])
  vertex(width+200 - change1, topY)  // left top
  
  vertex(width+500 + change1, topY) // right top  
  vertex(width+500 + change1, bottomY) // right bottom
    
  vertex(width+200 - change1, bottomY)  // left bottom
  endShape(CLOSE)

  // Draw rest number of Rectangles
  // besides leftmost and rightmost
  for(let i = 0; i < nums+1; i++) {
    stroke(colorArr[colorInd[i]])
    
    let index = i % changes.length // 0, 1, 2
    let nextIndex = (i+1) % changes.length    
  
    beginShape()
    // fill(colorArr[colorInd[i]])
    
    let xInc = map(speedCos, -1, 1, 1, 2)
    let leftTopX = xSize * (i+xInc) + changes[index] + xOffsets[index]
    let v1 = {x: leftTopX, y: topY}
    
    // VERTEX 1 (LEFT TOP)
    vertex(v1.x, v1.y) 
    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v1.x, v1.y)
    pop()

    // VERTEX 2 (RIGHT TOP)
    let rightTopX = xSize * (i+2) + changes[nextIndex] + xOffsets[nextIndex]
    let v2 = {x: rightTopX, y: topY}  
    vertex(v2.x , v2.y)
    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v2.x , v2.y)
    pop()

    // VERTEX 3 (RIGHT BOTTOM)      
    let rightBottomX = xSize * (i+2) + changes[nextIndex] + xOffsets[nextIndex]
    let v3 = {x: rightBottomX, y: bottomY}
    vertex(v3.x, v3.y)

    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v3.x, v3.y)
    pop()

    // VERTEX 4 (LEFT BOTTOM)
    let leftBottomX = xSize * (i+1) + changes[index] + xOffsets[nextIndex]
    let v4 = {x: leftBottomX, y: bottomY}
    vertex(v4.x, v4.y)
    
    push()
    stroke(colorArr[colorInd[i]])
    strokeWeight(3)
    point(v4.x, v4.y)
    pop()

    let closeRight = distCheck(v1, v2)
    let closeLeft = distCheck(v3, v4)
    if(closeLeft && closeRight) fill(colorArr[colorInd[i]]) 
    else noFill()

    // VERTEX 1 (LEFT TOP)
    vertex(leftTopX, topY) 

    endShape()
  }
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
