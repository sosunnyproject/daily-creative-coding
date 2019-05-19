class Box {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 16;
    this.h = 16;
  }

  display() {
    rectMode(CENTER);
    // fill(127);
    // stroke(200);
    // strokeWeight(2);

    noStroke();
    colorMode(RGB, 255, 255, 255, 255);
    fill(map(this.x, 0, 640, 200, 255), map(this.y, 0, 640, 100, 200), 10, this.lifespan);

    rect(this.x, this.y, this.w, this.h);
  }
}
