let loc;
let vel;
let r = 20;

function setup(){
  createCanvas(300, 300);
  background(255);
  loc = createVector(100, 100);  
  vel = createVector(5, 8);
  // colorMode(HSB);
}

function draw(){
  // background(255);

  loc = loc.add(vel);
  if((loc.x > width) || (loc.x < 0)){
    vel.x *= -1 ; 
    // 벡터 연산이 아님
  }
  if((loc.y > height) || (loc.y < 0)){
    vel.y *= -1 ;
  }

  noStroke();
  r = map(loc.x, 0, width, 10, 40);
  fill(map((loc.x+loc.y)/2, 0, height, 0, 360), 60, 100);
  ellipse(loc.x, loc.y, r, r);
}