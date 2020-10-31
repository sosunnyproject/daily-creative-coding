
let pg
let font, points, bounds;
let angle = 20
let shapes = []
let colArray 
let counter = 0.01

function preload() {
  font = loadFont('Arita-buriM.otf')
}
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	pg = createGraphics(200, 200)
	textFont(font)
	colArray = [color(14, random(frameCount%255), 0), 
	  color(random(100),30, 71), 
	  color(20,193,random(25)), 
	  color(0,random(255),135)]
	
	setAttributes('antialias',true);
    setAttributes('perPixelLighting',true);

	//shapes
	resetShapes()
}
function resetShapes(){
	shapes = []
	for(let i = 0; i < 10; i++){
	    let x = random(-width/2, width/2)
	    let y = random(-height/2, height/2)
	    let z = random(-300, 300)
    
    	let axis = {x : x, y : y, z: z}
    	shapes.push(axis)
	}
}
function draw() {
	background(0)
	orbitControl()

	// camera
	let u = sin(frameCount/10)*10
	let v = cos(frameCount/10)*10
	camera(10 + u * 2, u * 2, v * 2, // position
      0, 0, 0,  // center XYZ
      sin(frameCount*0.1),
      sin(frameCount*0.1), 
      sin(frameCount*0.1));   // up
      
	// rotateX(angle * 10)
	rotateY(angle)
	rotateZ(angle * 10)
    
    pg.background(10, 10)
    pg.textAlign(CENTER)
	pg.textSize(50)
	pg.strokeWeight(5)
	pg.stroke(255, 100, 150)
	
	pg.text('슬픔', 100, 40)
	pg.text('없는', 100, 80)
	pg.text('꿈', 100, 120)
	texture(pg)

	ambientLight(255)
	directionalLight(frameCount%255, 255, 255, 0, 0, 0)
	
	applyLighting()
    specularMaterial(0)
	noStroke()
	Shapes3d()
	
	if(frameCount % 500 === 0) {
	  resetShapes()
	}
}

function Shapes3d() {
	
	for(let i = 0; i < shapes.length; i++) {
      push()
      translate(shapes[i].x, shapes[i].y, shapes[i].z)
      //box(50)
      sphere(100*sin(((frameCount*0.01)%10)*i))
      pop()
	}
}

function applyLighting() {
	let spd = 0.04 //map(sin(micLevel%100), -1, 1, 0.001, 0.005)
    counter += 0.1
    
	// lighting
	 for(i=0;i<colArray.length;i++){
	    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
	    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
	    directionalLight(colArray[i], lightPosx/2,lightPosy, 
	    lightPosx*lightPosy);
	  }
}