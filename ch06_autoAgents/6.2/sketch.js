let v;

function setup() {
  createCanvas(640, 640);
  v = new Vehicle(width/2, height/2);
}

function draw() {
  background(0);
  let mouse = createVector(mouseX, mouseY);
  // let dirX = (mouseX / width - 0.5) * 2;
  // let dirY = (mouseY / height - 0.5) * 2;
  // directionalLight(250, 250, 250, -dirX, -dirY, -1);
  fill(map(mouseX, 0, 640, 100, 255), map(mouseY, 0, 640, 200, 0), 20);
  noStroke();
  ellipse(mouse.x, mouse.y, 50 , 50 );

  v.arrive(mouse);
  v.update();
  v.display();

}
