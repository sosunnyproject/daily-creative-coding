let objects = [];
let fixed = [];
let count = 0;
let ons = ['溫','ON','온', '2020'];
let colors = [];

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  // colorMode(HSB);
  textAlign(CENTER, CENTER);
  runEngine();
  setBall();
}

function draw() {

  if(frameCount%300 ==1) setBall();
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
  textSize(height*0.7);
  textRand = random(ons);
  if(textRand == ons[1]) {
    textFont('Calistoga');
  } else if (textRand == ons[0]){
    textFont('Noto Sans SC');
  } else if (textRand == ons[2]){
    textFont('Song Myung');
  } else {
    textSize(width*0.4);
    textFont('Calistoga');
  }

  text(textRand, width/2, height/2);

  for(let obj of fixed){
    obj.remove();
  }

  fixed = []; //reset the array

  triangleGrid(0, 0, width, height, 10, function(x,y){
    let c = get(x,y);

    if(brightness(c) == 0) {
      fixed.push(new ObjCircle
        (x, y, 3,color('white'), 100, 100, {isSleeping:true})
      );
    }
    else {
      fixed.push(new ObjCircle
        (x, y, 3, color(random(210, 252), 3, 3),{isStatic:true})
      );
    }
  });
  //count++;
  //if(count>9)  count= 0;
}

function mouseDragged(){
  for(let obj of fixed){
    let pos = obj.body.position;
    let d = dist(pos.x, pos.y, mouseX, mouseY);
    if(d<100){
      obj.body.isSleeping= false;
      //console.log(obj.body);
      //obj.body.color= color(100, 100, 100);
    }
  }
}

  // ObjRect(x,y,w,h,shapeColor,option={})
  // ObjCircle(x,y,radius,shapeColor,option={})
