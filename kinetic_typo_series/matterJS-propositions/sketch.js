var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Runner = Matter.Runner;

var engine = Engine.create();
var runner = Runner.create();
var world = engine.world;
var mConstraint;
var event;
var boxA, boxB, groundRect;
var boxes = [];
var canvas; 
function setup() {
  canvas = createCanvas(500, 500);
  rectMode(CENTER)
  // create boundary blocks
  groundMiddle = Bodies.rectangle(width/2, height/2, width*2/3-50, 30, {isStatic: true});
  groundMiddleOffset = Bodies.rectangle(width/2, height/2, width*2/3, 140, {isStatic: true});

  groundBottom = Bodies.rectangle(width/2, height, width, 80, {isStatic: true}), counter= -1;
  
  wallLeft = Bodies.rectangle(0, 0, 10, height*2, {isStatic: true});
  wallRight = Bodies.rectangle(width-10, 0, 10, height*2, {isStatic: true});

  // add static bodies to the world
  Composite.add(world, [groundMiddle, groundMiddleOffset, groundBottom, wallLeft, wallRight]);
  Runner.run(runner, engine);

  var canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasMouse,
  }
  mConstraint = MouseConstraint.create(engine, options)
  Composite.add(world, [canvasMouse, mConstraint])

  
  Events.on(engine, 'beforeUpdate', function(event) {
    counter += 0.034;

    if (counter < 0) {
        return;
    }

    var px = width/2 + 150 * Math.sin(counter);

    // body is static so must manually update velocity for friction to work
    Body.setVelocity(groundMiddle, { x: px - groundMiddle.position.x, y: 0 });
    Body.setPosition(groundMiddle, { x: px, y: groundMiddle.position.y });
});

  const startX = width/2 - 80
  // top ㄴ 
  // add horizontal boxes
  for (let i = 0; i < 6; i++) {
    const w = 30
    let b = new Box(startX + (w*i), groundMiddle.position.y-60, w, w)
    boxes.push(b)
  }

  // add vertical boxes
  for (let i = 0; i < 4; i++) {
    const w = 30
    const startY = 50
    let b = new Box(startX, startY + (w*i), w, w)
    boxes.push(b)
  }

  // bottom ㄴ
    // add horizontal boxes
    for (let i = 0; i < 6; i++) {
      const w = 30
      let b = new Box(startX + (w*i), height-(w*2), w, w)
      boxes.push(b)
    }
  
    // add vertical boxes
    for (let i = 0; i < 4; i++) {
      const w = 30
      const startY = height/2
      let b = new Box(startX, startY + (w*i), w, w)
      boxes.push(b)
    }
}

function draw() {
  background(0, 40);

  noStroke()
  // fill(map(sin(frameCount/10),-1, 1, 0, 255), 
  //     map(sin(frameCount/100),1, -1, 0, 255), 
  //     map(tan(frameCount/20),-10, 10, 0, 255)
  // )
  rect(groundMiddle.position.x, groundMiddle.position.y, width*2/3-50, 30)

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].show()
  }

}