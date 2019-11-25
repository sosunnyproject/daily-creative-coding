function setup() {
  createCanvas(640, 640);

  rectMode(CENTER);
}

function draw() {
  background(0);

  var centerX = width/2;
  var centerY = height/2;

  var moveX = mouseX - centerX;
  var moveY = mouseY - centerY;

  noFill();
  // colorMode(HSB);
  //further
  strokeWeight(2);
  stroke(random(0, 225), 220, map(mouseX, 0, width, 10, 80));
  rect(centerX - moveX * 0.05, centerY - moveY * 0.05, 10, 10);

  strokeWeight(4);
  stroke(random(0, 225), 200, map(mouseX, 0, width, 50, 120));
  rect(centerX - moveX * 0.125, centerY - moveY * 0.125, 20, 20);

  strokeWeight(8);
  stroke(random(0, 225), 180 , map(mouseX, 0, width, 80, 150));
  rect(centerX - moveX * 0.25, centerY - moveY * 0.25, 40, 40);
  //closer
  strokeWeight(16);
  stroke(random(0, 225), 140, map(mouseX, 0, width, 100, 180));
  rect(centerX - moveX * 0.5, centerY - moveY * 0.5, 80, 80);

  strokeWeight(32);
  stroke(random(0, 225), 120, map(mouseX, 0, width, 120, 220));
  rect(centerX - moveX, centerY - moveY, 160, 160);

  strokeWeight(48);
  stroke(random(0, 225), 100, map(mouseX, 0, width, 150, 225));
  rect(centerX - moveX * 2, centerY - moveY * 2, 320, 320);
}
