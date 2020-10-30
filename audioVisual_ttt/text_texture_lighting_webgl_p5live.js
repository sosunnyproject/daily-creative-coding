
let pg
let font, points, bounds;
let mic, micLevel
let angle = 20
let shapes = []
let colArray 
let counter = 0.01

function preload() {
	font = loadFont("includes/demos-data/fonts/RobotoMono-Regular.otf");
}
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	pg = createGraphics(200, 200)
	textFont(font)
	colArray = [color(204, 102, 0),color(0,30, 71), color(204,93,0), color(0,57,135)]
	
	// audio
	mic = new p5.AudioIn()
	mic.start()
	
	setAttributes('antialias',true);
    setAttributes('perPixelLighting',true);

	//shapes
	resetShapes()
}
function resetShapes(){
	shapes = []
	for(let i = 0; i < 20; i++){
	    let x = random(-width/4, width/4)
	    let y = random(-height/3, height/3)
	    let z = random(-500, 500)
    
    	let axis = {x : x, y : y, z: z}
    	shapes.push(axis)
	}
}
function draw() {
	background(0)
	orbitControl()
	micLevel = map(mic.getLevel(), 0.0, 1.0, 20, 80)
	
	rotateX(angle * 10)
	rotateY(angle)
	rotateZ(angle * 0.7)
    
    pg.background(0, 100)
    pg.textAlign(CENTER)
	pg.textSize(30)
	pg.strokeWeight(10)
	pg.stroke(micLevel*10, micLevel, 255)
	
	pg.text('love love love love', 100, 50)
	pg.text('death death death', 100, 100)
	texture(pg)

	ambientLight(200)
	directionalLight(255, 255, 255, 0, 1, 1)
	
	angle = (micLevel % 360) * 0.01

	applyLighting()
    specularMaterial(0)
	noStroke()
	Shapes3d()
	
	if(frameCount % 200 === 0) {
	  resetShapes()
	}
}

function Shapes3d() {
	
	for(let i = 0; i < shapes.length; i++) {
      push()
      translate(shapes[i].x, shapes[i].y, shapes[i].z)
      sphere(10+tan(((frameCount*0.01)%100)*i))
      pop()
	}
}

function applyLighting() {
	let spd = map(sin(frameCount%100), -1, 1, 0.001, 0.005)
    counter += 0.1
    
	// lighting
	 for(i=0;i<colArray.length;i++){
	    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
	    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
	    directionalLight(colArray[i], lightPosx/2,lightPosy, 
	    lightPosx*lightPosy);
	  }
}