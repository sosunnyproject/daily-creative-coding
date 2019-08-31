// 마우스 따라가는 로즈, 파티클의 repeller
class Vehicle {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(3, 4);
    this.position = createVector(x, y); // 마우스 위치 따라감.
    this.r = 6;
    this.maxspeed = 3;
    this.maxforce = 0.15;
    this.d = 8;
    this.n = 5;
    this.power = 50;
  }

  // 위치 속력 업데이트
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // 타겟 = 마우스 따라가도록.
  arrive(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    let des = desired.mag();
    // Scale with arbitrary damping within 100 pixels
    if (des < 100) {
      var m = map(des, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    this.applyForce(steer);
  }

  // 상, 좌, 우 는 막혀있음. 아래는 뚫려있음
  boundaries() {
    let bound = 20;
    let desired = null;
    if (this.position.x < -width/2 + bound || this.position.x > width/2 - bound) {
      this.velocity.x *= -1;
    }
    if (this.position.y < -height/2 + bound) {
      desired = createVector(-this.velocity.y, this.maxspeed);
    } else if (this.position.y > height/2 - bound) {
      // desired = createVector(-this.velocity.y, -this.maxspeed);
      // disappear;
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed * 10);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce*10);
      this.applyForce(steer);
    }
  }

  // rose
  display() {
    this.d = map(sin(frameCount*0.012),-1, 1, 3, 7);
    this.n = map(cos(frameCount*0.015),1, -1, 3, 10);
    let k = this.n / this.d;
    let count = map(cos(frameCount*0.006), -1 , 1, 3, 8);

    background(0);
    colorMode(HSB);

    push();
    translate(this.position.x, this.position.y); // 전체 회전의 축 = 마우스

    for(let i=0; i<TWO_PI; i+= TWO_PI/count){

      rotate(TWO_PI/count);
      translate(d, 0); // 개별 로즈끼리 떨어지는 거리.

      push();
      beginShape();
      noFill();
      stroke(map(tan(frameCount*0.025), -1, 1, 0, 360), 50, 255); // 로즈 색깔
      strokeWeight(0.5);
      // change a ++ inc value : circle to n-angled shapes
      for (var a = 0; a < TWO_PI * this.d; a += 0.5) {
        var r = map(sin(frameCount*0.02), -1, 1, 40, 80) * cos(k * a); // 반지름
        var x = r  * cos(a);
        var y = r * sin(a);
        vertex(x,y);
      }
      endShape();
      pop();
     }
    pop();
    }

  // 파티클의 repeller
  repel(p) {
    let dir = p5.Vector.sub(this.position, p.position); // Calculate direction of force
    let d = dir.mag(); // Distance between objects
    dir.normalize(); // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    d = constrain(d, 1, 120); // Keep distance within a reasonable range
    let force = -1 * this.power / (d * d); // Repelling force is inversely proportional to distance
    dir.mult(force); // Get force vector --> magnitude * direction
    return dir;
  }
}
