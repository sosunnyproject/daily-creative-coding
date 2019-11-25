// 마우스 따라가는 로즈, 파티클의 repeller
class Vehicle {
  constructor(x, y, receivedVelX, receivedVelY) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(receivedVelX, receivedVelY);
    this.position = createVector(hand.x, hand.y);
    this.r = 6;
    this.maxspeed = 10;
    this.maxforce = 0.2;
    this.d = 8;
    this.n = 5;
    this.power = biggest*2;
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

  // 타겟 = 손/마우스 따라가도록.
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

  // 좌, 우 는 막혀있음. 상, 하는 뚫려있음
  boundaries() {
    let bound = 20;
    let desired = null;

    // 좌, 우 벽으로 가면 부딪혀서 튕겨나오도록.
    if (this.position.x < -width/2 + bound || this.position.x > width/2 - bound) {
      this.velocity.x *= -1;
    }
    // 위 - 막는 것
    // if (this.position.y < -height/2 + bound) {
    //   desired = createVector(-this.velocity.y, this.maxspeed);
    // } else if (this.position.y > height/2 - bound) {
    //   // desired = createVector(-this.velocity.y, -this.maxspeed);
    //   // disappear;
    // }

    // 개체(로즈)가 화면 위/아래로 넘어간 경우
    // 현재 위치/속도 정보 SEND
    if (this.position.y < -height/2 - bound*6 || this.position.y > height/2 + bound*4) {
      send(this.position.x + width/2, this.position.y + height/2, this.velocity.x, this.velocity.y);
    }


    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed * 5);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce*5);
      this.applyForce(steer);
    }
  }

  // rose 그리기
  display() {
    this.d = map(sin(frameCount*0.012),-1, 1, 3, 10); // 3, 7
    this.n = map(cos(frameCount*0.015),1, -1, 5, 10); // 3, 10
    let k = this.n / this.d;
    let count = map(cos(frameCount*0.006), -1 , 1, 3, 8);

    background(0);
    colorMode(HSB);

    push();
    translate(this.position.x, this.position.y); // 전체 회전의 축 = 손/마우스

    for(let i=0; i<TWO_PI; i+= TWO_PI/count){
      rotate(TWO_PI/count);
      translate(d, 0); // 개별 로즈끼리 떨어지는 거리.
      push();
      beginShape();
      noFill();
      // 로즈 색깔
      stroke(map(tan(frameCount*0.025), -1, 1, 0, 360), 50, 255);
      strokeWeight(1.4);

      // change a ++ inc value : circle to n-angled shapes
      // smallest, biggest 변수는 sketch.js 에서 글로벌 변수
      for (var a = 0; a < TWO_PI * this.d; a += 0.3) {
        var r = map(sin(frameCount*0.02), -1, 1, smallest, biggest) * cos(k * a); // 반지름
        var x = r  * cos(a);
        var y = r * sin(a);
        vertex(x,y);
      }
      endShape();
      pop();
     }
    pop();
    }

  // 로즈 = 나비 파티클의 repeller
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
