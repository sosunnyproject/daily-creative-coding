let objects = [];
let fixed = [];
let count = 0;
let ons = ['溫','ON','온'];
let colors = [];

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);

  colorMode(HSB);

  textAlign(CENTER, CENTER);
  runEngine();
  setBall();

  objects.push(new ObjRect(width/2, height*0.8, width/2, 20, color('white'), {isStatic:true}));
}

function draw() {

  if(frameCount%30 ==1) setBall();
  background(0);

  for (let i = objects.length - 1; i >= 0; i--) {
    objects[i].display();
    if (!objects[i].isOnScreen()) {
      objects[i].remove();
      objects.splice(i, 1);
    }
  }

  //fixed
  for (let i = fixed.length - 1; i >= 0; i--) {
    fixed[i].display();
    if (!fixed[i].isOnScreen()) {
      fixed[i].remove();
      fixed.splice(i, 1);
    }
  }

}

// text part: 글자 부분 고정 시키기.
// restitution --> isStatic
function setBall(){
  background(255);
  textSize(height*0.5);
  textRand = random(ons);
  if(textRand == ons[1]) {
    console.log(textRand);
    textFont('Calistoga');
  } else if (textRand == ons[0]){
    console.log(textRand);
    textFont('NotoSansSC');
  } else if (textRand == ons[2]){
    console.log(textRand);
    textFont('SongMyung');
  }

  text(textRand, width/2, height/2);

  for(let obj of fixed){
    obj.remove();
  }
  fixed = []; //reset the array

  for(let x=0; x<width; x+=5) {
    for(let y=0; y<height; y+=5) {
      let c = get(x, y);
      if(brightness(c) == 0) {
        fixed.push(new ObjCircle(x, y, 3, color(random(20, 50), 100, 100), {isStatic:true}));
      }
    }
  }

  //count++;
  //if(count>9)  count= 0;
}

function mouseDragged(){
  objects.push(new ObjCircle(mouseX, mouseY, 5, color('white')));

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
