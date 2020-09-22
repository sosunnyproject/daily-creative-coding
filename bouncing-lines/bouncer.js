//https://github.com/Coding-Pool/processing/blob/master/bouncer_line/bouncer_line.pde

// https://github.com/Coding-Pool/processing/blob/master/bouncing_in_spiky_polygon/Bouncer.pde

class Bouncer {
  constructor() {
    this.radius = 25    // 바운스 볼의 반지름
    this.pos = createVector(width*0.5, height*0.5)  //  원의 초기 위치
    this.vel_mag = random(1,4)                     // 속력의 크기 - 랜덤한 값
    this.vel_angle = random(2 * PI)                // 원의 각도  - 랜덤한 값
    this.vel = createVector(cos(this.vel_angle)*this.vel_mag, sin(this.vel_angle)*this.vel_mag)
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

      let lineAB = createVector(bx - ax, by - ay)
      let lineAP = createVector(xPos - ax, yPos - ay)

      lineAB.normalize()  // AB 선분의 길이가 1이 되었다
      

    }

    // 

  }



}