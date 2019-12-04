let objects = [];

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  runEngine();
  textFont('Calistoga');
  setBall();

  objects.push(new ObjRect(width/2, height*0.8, width/2, 20, color('white'), {isStatic:true}));
}

function draw() {

  background(0);
  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].display();
    if (!objects[i].isOnScreen()) {
      objects[i].remove();
      objects.splice(i, 1);
    }
  }
}

function setBall(){
  background(255);
  textSize(height*0.5);
  text('ON', width/2, height/2);

  for(let x=0; x<width; x+=15) {
    for(let y=0; y<height; y+=15) {
      let c = get(x, y);
      if(brightness(c) == 0) {
        objects.push(new ObjCircle(x, y, 5, color('red'), {restitution:1}));
      }
    }
  }
}

function setParticle() {
  background(255);
  textAlign(CENTER, CENTER);
  textSize(height);
  text('A', width / 2, height*0.6);


  // triangleGrid(x,y,width,height,gap,trigger)

  triangleGrid(10, 10, width-20, height-20, 20, function(x, y) {
    var c = get(x, y);
    if (brightness(c) == 0)
      objects.push(
        new ObjCircle(x, y, 5, 255, {
          isStatic: true
        })
    );
  });

  // ObjRect(x,y,w,h,shapeColor,option={})
  // ObjCircle(x,y,radius,shapeColor,option={})
}
