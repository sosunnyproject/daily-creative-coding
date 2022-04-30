// http://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html
let size = 30
let COOLOR = createCols('https://coolors.co/006ba6-0496ff-ffbc42-d81159-8f2d56')
let img;
let mic, micLevel;

function preload() {
  img = loadImage('strokeTp3.png')
}
function setup() {
  createCanvas(400, 600, WEBGL)
  angleMode(DEGREES)
  rectMode(CENTER)
  noStroke()
  noFill()

  // audio
	mic = new p5.AudioIn()
	mic.start()
}

function draw() {
  background(0)
  orbitControl()
  // flowfield grid
  let index = 0
  micLevel = mic.getLevel()*100
  let speed = sin(frameCount/2)
  if(micLevel > 4) speed = tan(frameCount)
  if(frameCount % 10 ===0 ) console.log(micLevel*100)

  for(let y = -height/2; y < height/2; y += size) {
    for(let x = -width/2; x < width/2; x += size) {
      texture(img)
      // fill(COOLOR[index%COOLOR.length])
      let curr = createVector(x, y)
      let center = createVector(0, 0)
      zDepth = map(curr.dist(center), 0, height/4, -1000, 1000)
      
      push()
      translate(x, y, speed*zDepth)
      rotateX(micLevel*100 )
      rotateZ(micLevel*100 )
      // rotateY(micLevel*100*y/50)

      // if(micLevel > 7) torus(size-10, (size-10)/2, 3, 12);
      box(size)

      pop()
      index += 1
    }
  }
}

//imported
function createCols(url)
{
	let slaIndex = url.lastIndexOf("/");
	let colStr = url.slice(slaIndex + 1);
	let colArr = colStr.split("-");
	for(let i = 0; i < colArr.length; i++)colArr[i] = "#" + colArr[i];
	return colArr;
}