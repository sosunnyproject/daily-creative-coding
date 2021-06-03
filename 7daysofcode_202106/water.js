
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
 if(particles.length < 100) {
	 for (let i = 0; i < numParticles; i++){
	   particles.push(new Particle(random(width, 0), 0))
	 } 
  }
} 
 
function draw() {
  background(0)  
  specularMaterial(105) 
  shininess(4); 
  orbitControl();

  let colArray = [ color(0, 32, 250), color(0, 113, 254), 
  color(10, 13, 20), color(10, 53, 254),color(0, 150, 255), color(0, 203, 254)]
  const speed = sin(frameCount/200)/10 
  
  for(i=0;i<colArray.length;i++){
    lightPosx = sin(((TWO_PI*2/colArray.length)*i));
    lightPosy = cos(((TWO_PI/colArray.length)*i));

    directionalLight(colArray[i], 
	lightPosx * cos(frameCount/100) * 45,
	lightPosy * sin(frameCount/105) * 60, 
	sin(frameCount/100) * 30) 
  }
  
  noStroke();
  
  for(let i = 0; i < particles.length; i++){
  	particles[i].run()
  }
  
  push()
  rotateX(frameCount * 0.01)
  rotateY(frameCount * 0.01)
  rotateZ(frameCount * 0.02) 
  plane(width*2, height*2)
  sphere(width) 
  pop()
} 


class Particle {
 
  constructor(x, y) {
    this.acc = createVector(random(0.01), random(0.25))
    this.vel = createVector(0, random(1, 5)); 
    this.pos = createVector(random(x - width/2 - 100, x - width/2 + 100), 
    random(y - height/2 - 100, y - height/2 - 20))

    this.maxforce = 0.5
    this.maxspeed = 3
    this.lifespan = 100.0;
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
	cone(80, 108, 22, 8, false);
	translate(0, -100) 
	sphere(90)  
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