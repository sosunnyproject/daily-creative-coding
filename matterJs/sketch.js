var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
var boxA;

let fixCircles = [];
let radius = 200;
var letters = [];
var w = 20;
var words = ['위', '잉']
let index = 0;
let slider1;
let val;

function setup(){
  createCanvas(600,600);

  engine.world.gravity.y = -0.7;
  Engine.run(engine);
  ellipseMode(CENTER);
  // colorMode(HSB);
  for (let angle = 0; angle < 720; angle+= 60)   {

    let x = width/2 + radius * cos(angle);
	let y = height/2 + radius * sin(angle);
    fixCircles.push(
      new ObjCircle(
        x, y, 20,
        color(angle%360,70,100),{isStatic:true}
      )
    );
  }

  console.log(fixCircles.length);

  slider1 = createSlider(0, 10, 2); //text velocity
  //slider1.position(10, 10);
  slider1.style('width', '80px');
  val = slider1.value();
}

function mouseDragged() {

  let letter = Bodies.circle(mouseX, mouseY, w/2, {restitution:0.2});
  World.add(engine.world, letter);
  letter.text = words[index%2];
  letters.push(letter);
  Body.setVelocity(letter, {x:0, y:3});
  index++;
}

function mouseClicked() {
 console.log(mouseX, mouseY);
}

function draw(){
  ellipseMode(CENTER);
  background(0);
  // radians(30) 회전을 적용. 회전축 적용위해 push, pop
  for(let obj of fixCircles){
    obj.display();
  }

  fill(255);
  textSize(w);
  textAlign(CENTER, CENTER);

  for(let letter of letters) {
    let pos = letter.position
    push();
    translate(pos.x, pos.y);
    rotate(letter.angle);
    fill(100, 40, 30+val*3);
    text(letter.text, 0,0);
    pop();
  }
}
