//https://github.com/Coding-Pool/processing/blob/master/bouncer_line/bouncer_line.pde

// https://github.com/Coding-Pool/processing/blob/master/bouncing_in_spiky_polygon/Bouncer.pde

class Bouncer {
  constructor() {
    this.radius = 25    // 바운스 볼의 반지름
    this.pos = createVector(width*0.5, height*0.5)  //  원의 초기 위치
    this.vel_mag = random(1,4)                     // 속력의 크기 - 랜덤한 값
    this.vel_angle = random(2 * PI)                // 원의 각도  - 랜덤한 값
    this.vel = createVector(cos(this.vel_angle)*this.vel_mag, sin(this.vel_angle)*this.vel_mag)
    this.collided = false
    // 원의 이동 속도 = 사인함수(각도) * 크기 
  }

  // 모든 변들의 위치와 원 자신의  위치를 비교한다. 
  // 변에 접근하는 경우, 원이 다른 방향으로 반사된다.
  checkEdges(){
    // 변-원 사이의 거리를 이전 거리와 비교하고, 최단거리를 찾기 위한 임의의 초기값 지정
    let minDistance = width * 20.0;

    // 최단거리인 경우, 원에서 해당 선분(벽)에 수직으로 내리는 (직교) orthogonal 수선의 발의 좌표 저장
    let minX = 0
    let minY = 0

    for(let i = 0; i < edgs_num; i++){
      // edge 하나의 선분
      let ax = edges[i].x_1
      let ay = edges[i].y_1
      let bx = edges[i].x_2
      let by = edges[i].y_2

      // 현재 원의 위치
      let xPos = this.pos.x
      let yPos = this.pos.y
      // noStroke()
      // fill(50)
      // ellipse(xPos, yPos, 20)

      let a2b = createVector(bx - ax, by - ay)
      let a2p = createVector(xPos - ax, yPos - ay)
      // strokeWeight(2)
      // noFill()
      // stroke(255, 0, 0) // edge
      // line(ax, ay, bx, by)
      // stroke(0, 0, 255) // blue
      // ellipse(a2b.x, a2b.y, 10)
      // stroke(0, 255, 0) // green
      // ellipse(a2p.x, a2p.y, 10)


      a2b.normalize()  // AB 선분의 길이가 1이 되었다
      let lineAXlen = a2p.dot(a2b) // AX length

      let coordA = createVector(ax, ay) // a 좌표
      let a2x = a2b.mult(lineAXlen)  // AX 선분
      let coordX = coordA.add(a2x) // AB 선상에 있는 x 의 좌표
      // stroke(255, 0, 255) // purple
      // ellipse(coordA.x, coordA.y, 10)
      // ellipse(coordX.x, coordX.y, 30)

      // 공과 x좌표 사이
      let XtoBall = createVector(xPos - coordX.x, yPos - coordX.y)
      XtoBall.normalize() //  크기가 1인 수직벡터

      let reflectVector = this.vel.add(XtoBall.mult(-2 * (XtoBall.dot(this.vel)))) 
      // lineAB.dot(velVector) 선분ab와 속력 벡터의내적
      // 반사되는 속도벡터

      // https://p5js.org/reference/#/p5.Vector/dist
      if(dist(ax, ay, coordX.x, coordX.y) < dist(ax, ay, bx, by) + this.radius * 0.5  && 
        dist(bx, by, coordX.x, coordX.y) < dist(ax, ay,bx, by) + this.radius * 0.5) {

          if(minDistance > dist(coordX.x, coordX.y, xPos, yPos) ) {
            minDistance = dist(coordX.x, coordX.y, xPos, yPos)
            minX = coordX.x
            minY = coordX.y
          }
          if(dist(coordX.x, coordX.y, xPos, yPos) < this.radius * 0.5){
            if(!this.collided) {
              this.collided = true
              this.vel.x = reflectVector.x
              this.vel.y = reflectVector.y
            }
          } else {
            this.collided = false
          }

          }
        }

    strokeWeight(10)
    stroke(0, 0, 255)
    if(minX !== 0 && minY !== 0) {
      line(minX, minY, this.pos.x, this.pos.y)
    }
  }

  update() {

    this.checkEdges()
    this.pos.add(this.vel)
    strokeWeight(10)
    
    // 속도 그려주는 선
    stroke(255, 0, 0)
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x*20, this.pos.y + this.vel.y*20)
    // 바운스 볼 원  그리기
    stroke(0)
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
  }


}