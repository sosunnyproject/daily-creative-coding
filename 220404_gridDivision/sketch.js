function setup() {
  createCanvas(400, 400);
  ellipseMode(CORNER);
  noFill();
  noStroke();
  colorMode(HSB);
  frameRate(10)
}

function draw(){
  // background(0, 10); // RGB
  let rand = Math.round(random(5, 15));
  if(frameCount % rand === 0) {
    background(0);
    division(0,0,width,height,1, 100); 
  }
}

function division(x,y,w,h,prob, hue){

  if(random() < prob && w>10 && h>10){
    let probRand = random(0.7, 0.95);
    let colRand = random(w, w*h);
    hue = (hue+colRand)%360;
        
    prob = prob * probRand;
    for(let row=0; row<2; row++){
      for(let col=0; col<2; col++){
        division(x+w/2*col,y+h/2*row,w/2,h/2,prob, hue);
      }
    }
  }
  else{
    // fill(random(255),random(255),random(255)); //RGB
    fill(hue, 100, 100); // HSB
    ellipse(x, y, h*0.7, h);
    // egg(x, y, 0, 0.7, col, w);
  }
}

// ang: angle
// size: width
// val: fill 
function egg(posx,posy,ang,size,val,x) { 
  fill(val);
  noStroke(0); 
  //egg
  push();
  // translate(posx,posy);
  rotate(ang);
  scale(size);
  arc(0, 0, 2*x, 1.5*x, 0, PI);
  arc(-x, 0, 4*x, 4*x, 7*PI*0.25, 2*PI);
  arc(x, 0, 4*x, 4*x, PI, 5*PI*0.25);
  arc(0, -x, (((2*x *sin (radians (45)))-x)/ sin (radians (45)))*2, (((2*x *sin (radians (45)))-x)/ sin (radians (45)))*2, 5*PI*0.25, 7*PI*0.25 );
  pop();
}