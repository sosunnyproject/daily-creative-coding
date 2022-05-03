// http://kylehalladay.com/blog/tutorial/2017/02/21/Pencil-Sketch-Effect.html
// 3d 

let size = 30
let COOLOR = createCols('https://coolors.co/006ba6-0496ff-ffbc42-d81159-8f2d56')
let img;
let mic, micLevel;
let cam;

function preload() {
  img = loadImage('strokeTp3.png')
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
  rectMode(CENTER)
  noStroke()
  noFill()

  cam = createCamera();
  // set initial pan angle
  cam.pan(-0.8);

  // audio
	mic = new p5.AudioIn()
	mic.start()
  getAudioContext().resume();
}

function draw() {
  background(0)
  orbitControl()
  // flowfield grid
  let index = 0
  micLevel = mic.getLevel()*10
  let speed = sin(frameCount/2)
  if(micLevel > 4) speed = tan(frameCount)
  if(frameCount % 30 ===0 ) console.log(micLevel)

  let camx = 0, camy = 0, camz = 0
  if(micLevel > 6) {
    camz = cos(micLevel)*180
  } else if (micLevel > 4) {
    camx = abs(sin(micLevel))*120
    camy = tan(micLevel)*90
  } else {
    camx = 0
    camy = 0
    camz = 0
  }

  cam.pan(camx, camy, camz)

  for(let y = -height/2; y < height/2; y += size*2) {
    for(let x = -width/2; x < width/2; x += size*2) {
      texture(img)
      // fill(COOLOR[index%COOLOR.length])
      let curr = createVector(x, y)
      let center = createVector(0, 0)
      zDepth = map(curr.dist(center), 0, height/4, -1000, 1000)
      
      push()
      translate(x*speed*2, y*speed*2, speed*zDepth)
      rotateX(micLevel*10*y/50)
      rotateZ(mouseY)
      rotateY(micLevel*10*y/50)

      if(micLevel > 5) torus(size-10, (size-10)/2, 3, 12);
      else box(size)

      pop()
      index += 1
    }
  }

  for(let y = -height/2; y < height/2; y += size*2) {
    for(let x = -width/2; x < width/2; x += size*2) {
      texture(img)
      // fill(COOLOR[index%COOLOR.length])
      let curr = createVector(x, y)
      let center = createVector(0, 0)
      zDepth = map(curr.dist(center), 0, height/4, -1000, 1000)
      
      push()
      translate(x, y, -speed*zDepth)
      rotateX(micLevel*100*y/50)
      rotateZ(mouseY)
      rotateY(micLevel*100*y/50)

      if(micLevel > 3) torus(size, (size)/2, 3, 12);
      else box(size)

      pop()
      index += 1
    }
  }

  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
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