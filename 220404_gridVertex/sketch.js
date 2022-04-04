let colors = []
const nums = 6
let heightSize, heightNums;
let offset = 0.1;

function setup() {
  createCanvas(600, 600);
  heightSize = height/nums
  heightNums = int(height/heightSize)
  
  // match arr1, arr2 colors
  let arr1 = getColors('https://coolors.co/ff8360-e8e288-7dce82-3cdbd3-00fff5')
  let arr2 = getColors('https://coolors.co/f55d3e-f7cb15-7dce82-76bed0-002626')

  // match arr3, arr4 colors
  let arr3 = getColors('https://coolors.co/06aed5-086788-03fcba-f0c808-dd1c1a')
  let arr4 = getColors('https://coolors.co/e4572e-29335c-03fcba-f3a712-669bbc')

  let arr5 = getColors('https://coolors.co/333232-f7b2ad-ceb7b3-b7b7b7-9abca7')
  
  // arr5 = getColors('https://coolors.co/e24466-e66783-e698b8-ddd7a9-9abac0')
  let arr6 = getColors('https://coolors.co/e27396-ea9ab2-efcfe3-eaf2d7-b3dee2')
  
  let arr7 = getColors('https://coolors.co/247ba0-c1cefe-fbd1a2-99c2a2-ff1654')
  // https://coolors.co/247ba0-70c1b3-b2dbbf-f3ffbd-ff1654
  let arr8 = getColors('https://coolors.co/247ba0-ffd9da-f3e1dd-c7d9b7-ff1654')
  
  let arr9 = getColors('https://coolors.co/FDE74C-9d8df1-b8cdf8-95f2d9-1cfeba')
  let arr10 = getColors('https://coolors.co/F0F600-9d8df1-f45b69-95f2d9-517664')
  
  let arr11 = getColors('https://coolors.co/palette/227c9d-17c3b2-ffcb77-fef9ef-fe6d73')
  let arr12 = getColors('https://coolors.co/3d405b-81b29a-f2cc8f-f4f1de-e07a5f')
  
  let arr13 = getColors('ffcbf2-f3c4fb-ecbcfd-e5b3fe-e2afff')
  let arr14 = getColors('deaaff-d8bbff-d0d1ff-c8e7ff-c0fdff')
  
  colors.push(arr1, arr2, 
              arr3, arr4, 
              arr5, arr6, 
              arr7, arr8, 
              arr9, arr10, 
              arr11, arr12, 
              arr13, arr14)
  frameRate(40)
}

function draw() {
  background("#C5D5EA"); // #9792E3 C5D5EA

  noStroke()
  
  for(let i = 0; i < heightNums; i++) {
    if(i%2 == 0) {
      drawOneRow(heightSize*i, heightSize*(i+1), 10+(i+2), 50+(i*2), colors[3], i)        
    } else {
      drawOneRow(heightSize*i, heightSize*(i+1), 10+(i+2), 50+(i*3), colors[2], i)    
    }
  }

  // drawOneRow(0, 50, 25, 70, colors[3])
  // drawOneRow(50, 100, 27, 72, colors[2])
  // drawOneRow(100, 150, 29, 74, colors[3])
  // drawOneRow(150, 200, 31, 76, colors[2])
  // drawOneRow(200, 250, 33, 78, colors[3])
  // drawOneRow(250, 300, 35, 80, colors[2])
  // drawOneRow(300, 350, 33, 82, colors[3])
  // drawOneRow(350, 400, 31, 84, colors[2])
  // drawOneRow(400, 450, 29, 82, colors[3])
  // drawOneRow(450, 500, 27, 80, colors[2])
  // drawOneRow(500, 550, 25, 78, colors[3])
  // drawOneRow(550, 600, 23, 76, colors[2])

}


function drawOneRow(topY, bottomY, slow, fast, colorArr){
  
  let xSize = width/nums
  let change1 = sin(frameCount/slow*2)*xSize/2
  let change2 = cos(frameCount/slow*2)*xSize/2
  let change3 = sin(frameCount/slow*2)*xSize/2
  
  let vertexOffset1 = cos(frameCount/slow)*xSize
  let vertexOffset2 = sin(frameCount/slow)*xSize
  let vertexOffset3 =  cos(frameCount/slow)*xSize
  
  let sinSpeed = abs(sin(frameCount/(slow*2)))
  let cosSpeed = abs(cos(frameCount/(slow*2)))
  
  let curveNum = 4
  let cosOffset = cosSpeed * map(sin(frameCount/slow), -1, 1, -xSize/3, xSize/3)
  let sinOffset = sinSpeed * map(cos(frameCount/slow), -1, 1, -xSize/3, xSize/3)
  
  const changes = [change1, change2, change3]
  const vOffsets = [vertexOffset1, vertexOffset2, vertexOffset3]
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
  fill(colorArr[0])
  vertex(0, topY)  // left top
  vertex(xSize + change1 + vertexOffset1, topY) // right top
  vertex(xSize + change1, bottomY) // right bottom
  vertex(0, bottomY)  // left bottom
  endShape(CLOSE)
  // Draw rest 9 Rectangles
  for(let i = 0; i < nums-1; i++) {               // start from i = 0
    let index = i % changes.length // 0, 1, 2
    let nextIndex = (i+1) % changes.length    
  
    
    beginShape()
    fill(colorArr[colorInd[i]])
    
    let leftTopX = xSize * (i+1) + changes[index] + vOffsets[index]
    
    // VERTEX 1 (LEFT TOP)
    vertex(leftTopX, topY) 

    
    if(i == (nums-2)) {  // Fix Last One (rightmost) to the right side
      let rightTopX = xSize * (i+2)
      
      // VERTEX 2 (RIGHT TOP), VERTEX 3 (RIGHT BOTTOM)
      vertex(rightTopX, topY) 
      vertex(rightTopX, bottomY)
    
    } else {
      let rightTopX = xSize * (i+2) + changes[nextIndex] + vOffsets[nextIndex]
      
      // VERTEX 2 (RIGHT TOP), VERTEX 3 (RIGHT BOTTOM)
      vertex(rightTopX, topY) 
      vertex(xSize * (i+2) + changes[nextIndex], bottomY)
    }

    // VERTEX 4 (LEFT BOTTOM)
    let leftBottomX = xSize * (i+1) + changes[index]
    vertex(leftBottomX, bottomY)

    // VERTEX 1 (LEFT TOP)
    vertex(leftTopX, topY) 
    

    endShape(CLOSE)
    offset += 0.1
  }
  
  /*
  beginShape()
  fill(colorArr[1])
  vertex(xSize+change1 + vertexOffset1, topY) // left top
  vertex(xSize*2+change2 + vertexOffset2, topY) // right top
  vertex(xSize*2+change2, bottomY) // right bottom
  vertex(xSize+change1, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[2])
  vertex(xSize*2+change2 + vertexOffset2, topY) // left top
  vertex(xSize*3+change3 + vertexOffset3, topY) // right top
  vertex(xSize*3+change3, bottomY) // right bottom
  vertex(xSize*2+change2, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[3])
  vertex(xSize*3+change3 + vertexOffset3, topY) // left top
  vertex(xSize*4+change1 + vertexOffset1, topY) // right top
  vertex(xSize*4+change1, bottomY) // right bottom
  vertex(xSize*3+change3, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[4])
  vertex(xSize*4+change1 + vertexOffset1, topY) // left top
  vertex(xSize*5+ change2 + vertexOffset2, topY) // right top
  vertex(xSize*5+ change2, bottomY) // right bottom
  vertex(xSize*4+change1, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[4])
  vertex(xSize*5+change2 + vertexOffset2, topY) // left top
  vertex(xSize*6 + change3 + vertexOffset3, topY) // right top
  vertex(xSize*6 + change3, bottomY) // right bottom
  vertex(xSize*5+change2, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[3])
  vertex(xSize*6+change3 + vertexOffset3, topY) // left top
  vertex(xSize*7+change1 + vertexOffset1, topY) // right top
  vertex(xSize*7+change1, bottomY) // right bottom
  vertex(xSize*6+change3, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[2])
  vertex(xSize*7+change1 + vertexOffset1, topY) // left top
  vertex(xSize*8 + change2 + vertexOffset2, topY) // right top
  vertex(xSize*8 + change2, bottomY) // right bottom
  vertex(xSize*7+change1, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[1])
  vertex(xSize*8+change2 + vertexOffset2, topY) // left top
  vertex(xSize*9 + change3 + vertexOffset3, topY) // right top
  vertex(xSize*9 + change3, bottomY) // right bottom
  vertex(xSize*8+change2, bottomY) // left bottom
  endShape(CLOSE)
  
  beginShape()
  fill(colorArr[0])
  vertex(xSize*9+change3 + vertexOffset3, topY) // left top
  vertex(xSize*10, topY) // right top
  vertex(xSize*10, bottomY) // right bottom
  vertex(xSize*9+change3, bottomY) // left bottom
  endShape(CLOSE)
  */
  
}
function getColors(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}
