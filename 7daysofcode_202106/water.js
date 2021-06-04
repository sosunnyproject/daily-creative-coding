
let detailX = 24
let detailY = 16
let lightPosx, lightPosy

let particles = [] 
const numParticles = 5

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	blendMode(REPLACE);
	
	for (let i = 0; i < numParticles; i++){
	  particles.push(new Particle(random(width, 0), 0))
	} 
}

function keyPressed() { 
  console.log(particles.length)
  if(particles.length < 200) {
	 for (let i = 0; i < numParticles; i++){
	   particles.push(new Particle(random(width, 0), 0))
    }
  }
} 
 
function draw() {
  background(0)  
  specularMaterial(155) 
  shininess(2)
  orbitControl()

  if(frameCount%1000 ===0) {
  	particles = []
  }
  
  let colArray = [ color(0, 32, 250), color(0, 0, 255), color(15, 150, 100), 
    color(123,80,154)]
  const speed = sin(frameCount/100) 
 
  for(i=0;i<colArray.length;i++){
    lightPosx = sin(((TWO_PI/colArray.length)*2*i));
    lightPosy = cos(((TWO_PI/colArray.length)*3*i));

    directionalLight(colArray[i], 
	lightPosx * cos(frameCount/100) * 45,
	lightPosy * sin(frameCount/105) * 60, 
	sin(frameCount/100) * 30) 
  }
  
  noStroke() 
   
  for(let i = 0; i < particles.length; i++){
  	particles[i].run()
  }
  
  push()
  rotateX(frameCount * 0.001)
  rotateY(frameCount * -0.015)
  rotateZ(frameCount * 0.001)
  //plane(width*4, height*4)
  sphere(width) 
  pop() 
  
  for(let i = 0; i < 100; i++){
  	push()
  	translate(0, 0, 0) 
	rotateX(frameCount * -0.0001 * i)
	rotateY(frameCount * -0.00002 * i)
	rotateZ(frameCount * 0.00003 * i)
	torus(width/2, 200) 
	pop()
  }
} 


class Particle {
 
  constructor(x, y) {
    this.acc = createVector(random(0.01), 1 * random(0.25)) 
    this.vel = createVector(0, 1*random(1, 5)) 
    this.pos = createVector(x-width/2, y-height/2)

    this.maxforce = 0.5
    this.maxspeed = 3 
    this.lifespan = 50.0;
    this.randomOffset = random(-TWO_PI, TWO_PI)
  }

  run() {
    this.update()
    this.display() 
    this.isDead()
  }

  update() {
    //update acc, vel, pos,
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.applyForce(p5.Vector(0.1, -0.2));
    this.acc.mult(0)
    this.lifespan -= 10.0 
  }

  applyForce(force) {
    //add force to acc
    this.acc.add(force)
  }

  display() {
    noStroke()
    push() 
    translate(this.pos.x, this.pos.y) 
    rotateX(cos(frameCount/120) * TWO_PI + this.randomOffset) 
    rotateZ(sin(frameCount/100) * TWO_PI + this.randomOffset)
 
    // cone(30, 38, 20, 4, false)
    // translate(0, -40)
    // sphere(36) 
	cone(50,  66, 22, 8, false); 
	translate(0, -60)
	sphere(55) 
    pop() 
  }

  isDead() {
    if (this.lifespan < 0.0) {  
      return true;
    } else {
      return false;
    } 
  }
}