let objects = [];
let fixed = [];
let count = 0;
let ons = ['溫','ON','온'];
let colors = [];

function preload() {
  //myFont = loadFont('assets/inconsolata.otf');
}

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  colorMode(HSB);
  textAlign(CENTER, CENTER);
  runEngine();
  setBall();

   // objects.push(new ObjRect(width/2, height*0.8, width/2, 20, color('white'), {isStatic:true}));
}

function draw() {

  if(frameCount%30 ==1) {
    setBall();
    setRose(200, 100);
  }

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

  if(count == ons.length) count=0;
  textSize(height*0.5);
  /*
  if(count == 1) {
    textFont('Calistoga');
  } else if (count == 0){
    textFont('Noto Sans SC');
  } else if (count == 2){
    textFont('Song Myung');
  }
  */

  // console.log(count);
  text(ons[count], width/2, height/2);

  for(let obj of fixed){
    obj.remove();
  }
  fixed = []; //reset the array

  for(let x=0; x<width; x+=7) {
    for(let y=0; y<height; y+=7) {
      let c = get(x, y);
      if(brightness(c) == 0) {
        fixed.push(new ObjCircle(x, y, 4, color(frameCount%20, 80, 80), {isStatic:true}));
      }
    }
  }
  count++;
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

function setRose(posX, posY) {
  let d = 4 // sliderD.value(); // d=4
  let n = 6 // sliderN.value(); // n=6
  let k = n / d;
  push();
  translate(posX, posY); //  translate(width*0.25, height*0.8);
  // colorMode(HSB);
  beginShape();
  noFill();
  stroke(30, 100, 100);
  //stroke(map(tan(frameCount*0.025), -1, 1, 200, 360), 50, 255);
  strokeWeight(10);
  // change a ++ inc value : circle to n-angled shapes
   for (var a = 0; a < TWO_PI * d; a += 0.1) {
     var r = 10 * cos(k * a);
     var x = r  * cos(a);
     var y = r * sin(a);
     vertex(x,y);
   }
   endShape();
   pop();
}
