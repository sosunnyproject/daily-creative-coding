let v;

function setup() {
  createCanvas(640, 640);
  v = new Vehicle(width/2, height/2);
}

function draw() {
  background(0);
  let mouse = createVector(mouseX, mouseY);
  fill(map(mouseX, 0, 640, 100, 255), 20, map(mouseY, 0, 640, 200, 0));
  noStroke();
  ellipse(mouse.x, mouse.y, 50 * (mouseX+mouseY)/2 * 0.005, 50 * (mouseX+mouseY)/2 * 0.005 );

  v.seek(mouse);
  v.update();
  v.display();

}
