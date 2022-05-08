
let leftX, rightX, topY, bottomY;
let resolution, numCols, numRows, defaultAngle;
let grid = []
// grid = [numCols][numRows]
let COOLOR = createCols('https://coolors.co/006ba6-0496ff-ffbc42-d81159-8f2d56')
let particles = []

let wscl, hscl;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	leftX = width* -2
	rightX = width* 2
	topY = height* -2
	bottomY = height*2;
	resolution = width*0.1
	numCols = (rightX - leftX)/resolution
	numRows = (bottomY - topY)/resolution
	hscl = height/numRows;
	wscl = width/numCols;
	// colorMode(HSB)
  angleMode(DEGREES)

	defaultAngle = 180 * 0.25;
	// create 2d array of angles
	let yoff = 0.0
	let xoff = 0.0
	for(let y = 0; y < numRows; y++) {
		grid[y] = []
		yoff += 2
	  for(let x = 0; x < numCols; x++) {
			let angle = 360/atan(y/x) + noise(xoff,yoff) * 45;
			grid[y][x] = angle;
			xoff += 1
		}
	}

  for(let y = 0; y <= numRows; y+=4) {
	  for(let x = 0; x <= numCols; x+=4) {
      let numSteps = random(10, 45)
      let radius = numSteps/12
      strokeWeight(random(0.5,2))
      let startX = x*wscl
      let startY = y*hscl

      let pos = createVector(0, 0)
      let target = createVector(0, 0)

      for(let n = 0; n < numSteps; n++) {
        let xOffset = startX - leftX
        let yOffset = startY - topY
        colIdx = floor(xOffset/resolution)
        rowIdx = floor(yOffset/resolution)
        let randOff1 = random(-5, 5)
        let randOff2 = numSteps/1.5
        if(n === 0) pos = createVector(startX-randOff1, startY-randOff1);

        if(n === int(numSteps)-1) {
          target = createVector(startX-randOff1, startY-randOff1);

          let p = new Particle(pos, target)
          particles.push(p)
        }
        
        
      }
		}
	}

  console.log(particles.length)
}

function draw() {
	background(0);
	stroke(255)
	noFill()

  for(let i = 0; i < particles.length; i++) {
    particles[i].render()
  }

}

class Particle {
  constructor(pos, target) {
    this.pos = pos
    this.target = target
    console.log(this.pos, this.target)
  }

  update() {
    this.pos.x = lerp(this.pos.x, this.target.x, 0.01)
    this.pos.y = lerp(this.pos.y, this.target.y, 0.01)
  }

  render() {
    this.update()
    ellipse(this.pos.x, this.pos.y, 10, 10)
  }
}

function drawShapes(startX, startY) {
	let numSteps = random(10, 45)
	let radius = numSteps/12
	strokeWeight(random(0.5,2))
	// stroke(random(COOLOR))

	for(let n = 0; n < numSteps; n++) {
  	beginShape()
		curveVertex(startX, startY);
		let xOffset = startX - leftX
		let yOffset = startY - topY
		colIdx = floor(xOffset/resolution)
		rowIdx = floor(yOffset/resolution)
		let randOff1 = random(-5, 5)
		let randOff2 = numSteps/1.5
		
		// curveVertex(startX-randOff1, startY-randOff1);

		if(rowIdx >= 0 && colIdx >= 0 && rowIdx <= grid.length) {
			if(colIdx <= grid[rowIdx]?.length){
				let angle = grid[rowIdx][colIdx]
				xStep =	radius * cos(angle)
				yStep = radius * sin(angle)
				startX += xStep
				startY += yStep
				curveVertex(startX, startY)
				// curveVertex(startX+randOff2, startY-randOff2)

			}
		}
		endShape(CLOSE)
	}	
}

//imported
function createCols(url) {
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}
