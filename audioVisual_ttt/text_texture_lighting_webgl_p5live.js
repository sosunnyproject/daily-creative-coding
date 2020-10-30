
let pg
let font, points, bounds;
let mic, micLevel
let angle = 20
let shapes = []
let colArray 
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
    
	for(let i =0; i < 5; i++){
	    let x = random(-width/2, width/2)
	    let y = random(-height/2, height/2)
	    let z = random(-100, 100)
	    
	    let axis = {x : x, y : y, z: z}
	    shapes.push(axis)
	}
}

function draw() {
	background(0)
	orbitControl()
	micLevel = map(mic.getLevel(), 0.0, 1.0, 20, 80)
	
	rotateX(angle)
	rotateY(angle * 1.3)
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
	
	angle = (micLevel % 360) * 0.1

	Shapes3d()
}

function Shapes3d() {
	for(let i = 0; i < shapes.length; i++) {
      push()
      translate(shapes[i].x, shapes[i].y, shapes[i].z)
      sphere(random(50))
      pop()
	}
}