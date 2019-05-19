let boxes = [];

function setup() {
  createCanvas(640, 640);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    let b = new Box(mouseX, mouseY);
    boxes.push(b);
  }

  for(let i = 0; i < boxes.length; i++) {
    boxes[i].display();
  }
}
