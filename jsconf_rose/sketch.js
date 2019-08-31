//rose
let v;
let d = 85;

//particle
let psArray =[];
// let repeller;
let attractor;
let img;

function preload(){
  img = loadImage("data/b2_1.png");
}

function setup() {
  createCanvas(550, 600, WEBGL);

  //rose
  v = new Vehicle(mouseX, mouseY);

  //repel
  attractor = new Attractor();
  // psArray.push(new ParticleSystem(createVector(-width/2, -height/2), img));
  psArray.push(new ParticleSystem(createVector(-width/2, height/2), img));
  // psArray.push(new ParticleSystem(createVector(width, 0), img));
  // psArray.push(new ParticleSystem(createVector(width, height), img));
}

function draw() {
  // repeller = new Repeller(mouseX - width/2, mouseY - height/2);
  // repeller.display();
  attractor.display();
  // Call the appropriate steering behaviors for our agents
  v.boundaries();
  v.arrive(createVector(mouseX - width/2, mouseY - height/2));
  v.update();
  v.display();
  // let gravity = createVector(0, -0.001);

  for(i = 0; i < psArray.length; i++) {
    if(frameCount % 4 == 0) {
      psArray[i].addParticle();
    }
    // psArray[i].applyForce(gravity);
    psArray[i].applyRepeller(v);
    psArray[i].applyAttractor(attractor);
    psArray[i].run();
  }


}
