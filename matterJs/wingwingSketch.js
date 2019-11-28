var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();
var boxA;
var groundA, groundB;

var letters = [];
var w = 25;
var words = ['위', '잉']
let index = 0;

function setup(){
  createCanvas(400,400);

  groundA = Bodies.rectangle(157, 300, 120, 10, {isStatic:true, angle:radians(-130)});
  groundB = Bodies.rectangle(110, 150, 100, 10, {isStatic:true, angle:radians(-40)});
  groundC = Bodies.rectangle(250, 128, 80, 10, {isStatic:true, angle:radians(50)});
  groundD = Bodies.rectangle(270, 242, 60, 10, {isStatic:true, angle:radians(140)});


  console.log(groundA);

  World.add(engine.world, [groundA, groundB, groundC,groundD]);
  engine.world.gravity.y = -0.7;
  Engine.run(engine);
  rectMode(CORNER);
}

function mouseDragged() {

  let letter = Bodies.circle(mouseX, mouseY, w/2, {restitution:0.4});
  World.add(engine.world, letter);
  letter.text = words[index%2];
  letters.push(letter);
  Body.setVelocity(letter, {x:4, y:10});
  index++;
}

function mouseClicked() {
 console.log(mouseX, mouseY);
}

function draw(){
  background(0);
  let gposA = groundA.position;
  let gposB = groundB.position;
  let gposC = groundC.position;
  let gposD = groundD.position;

  // radians(30) 회전을 적용. 회전축 적용위해 push, pop
  push();
  translate(gposA.x, gposA.y);
  rotate(groundA.angle);
  rect(0, 0, 120, 10);
  pop();

  push();
  translate(gposB.x, gposB.y);
  rotate(groundB.angle);
  rect(0, 0, 100, 10);
  pop();

  push();
  translate(gposC.x, gposC.y);
  rotate(groundC.angle);
  rect(0, 0, 80, 10);
  pop();

   push();
  translate(gposD.x, gposD.y);
  rotate(groundD.angle);
  rect(0, 0, 60, 10);
  pop();

  fill(255);
  textSize(w);
  textAlign(CENTER, CENTER);

  for(let letter of letters) {
    let pos = letter.position
    push();
    translate(pos.x, pos.y);
    rotate(letter.angle);
    text(letter.text, 0,0);
    pop();
  }
}
