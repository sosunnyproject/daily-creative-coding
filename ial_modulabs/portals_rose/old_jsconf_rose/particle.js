class Particle {
  // 위치, 파티클 이미지 인자
  constructor(x, y, img) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-10, 10), random(-0.5, 0.5));
    this.acceleration = createVector(0,0);
    this.lifespan = 100.0;
    this.img = img;
  }

  // 업데이트 및 렌더
  run() {
    this.update();
    this.render();
  }

  // force 적용
  applyForce(f) {
    this.acceleration.add(f);
  }

  // 위치 업데이트
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 0.5;
    this.velocity.limit(7);
  }

  // 도형 그리기 대신 이미지 렌더
  render() {
    imageMode(CENTER);
    tint(this.lifespan*3);
    image(this.img, this.position.x, this.position.y, 64, 64);
  }

  // // Method to display
  // display() {
  //   fill(255, this.lifespan);
  //   ellipse(this.position.x, this.position.y, 12, 12);
  // }

  // 파티클 수명
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
