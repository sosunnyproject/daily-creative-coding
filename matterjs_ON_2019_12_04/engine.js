let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine = Engine.create();

let pointer;

function runEngine(){
   Engine.run(engine); 
}

function setPointer(){
  pointer = Bodies.circle(0, 0, 30);
  World.add(engine.world, pointer);
}