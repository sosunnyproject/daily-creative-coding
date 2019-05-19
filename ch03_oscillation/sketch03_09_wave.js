let startAngle = 0;
let angleVel = 0.1;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);

  let angle = startAngle;
  for(let x = 0; x <= width; x+= 24) {
    let y = map(sin(angle), -1, 1, 0, height);
    noStroke();
    fill(map(cos(angle), -1, 1, 150, 255), map(sin(startAngle), -1, 1, 0, 255), 0);
    ellipse(x, y, map(sin(angle), -1, 1, 5, 40), map(sin(angle), -1, 1, 5, 40));
    angle += angleVel;
  }

  let angle2 = startAngle;
  for(let x = 0; x <= width; x+= 24) {
    let y = map(sin(angle2), -1, 1, height, 0);
    noStroke();
    fill(map(cos(angle2), -1, 1, 150, 255), map(sin(startAngle), -1, 1, 0, 255), 0);
    ellipse(x, y, map(sin(angle2), -1, 1, 5, 40), map(sin(angle2), -1, 1, 5, 40));
    angle2 += angleVel;
  }

  startAngle += 0.02;
}
