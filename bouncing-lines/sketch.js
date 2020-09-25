let bouncers = []
let edges = [] 
let edgesRadius = [] // 랜덤한 반지름을 선택해서, 다각형을 그리고, 그 다각형의 변들이 엣지가 된다.

// 바운스 볼(원)의 개수, 변 (벽)의 개수
let boc_num = 1, edgs_num = 10

function setup() {
  createCanvas(400, 400);
  
  //boc_num 개수만큼 Bouncer 클래스 오브젝트를 만들어서 bouncers 배열에 추가한다.
  // 자바스크립트는 배열 안에 어떤 오브젝트가 들어가는지 미리 선언하지 않고, 
  // push 로 배열에 새로운 원소를 추가한다.
  for(let i=0; i < boc_num; i++){
    bouncers.push(new Bouncer())
  }
  
  // 다각형의 변 반지름 선정
  for(let i=0; i < edgs_num; i++){
    edgesRadius.push(random(80, width*0.5))
  }

  //닫힌 다각형을 그리기
  for(let i = 0; i < edgs_num; i++) {
    let angle = i * 2 * PI / edgs_num

    let r1 = edgesRadius[i]
    let r2 = i===edgs_num-1 ? edgesRadius[0] : edgesRadius[i+1]

    // 각 변의 첫번째 좌표
    let x1 = width * 0.5 + r1 * cos(angle)
    let y1 = height * 0.5 + r1 * sin(angle)

    // second coord
    let x2 = width * 0.5 + r2 * cos(angle + 2* PI / edgs_num)
    let y2 = height * 0.5 + r2 * sin(angle + 2 * PI / edgs_num)

    console.log('convert radians to degree  value')
    console.log(angle * 180 / PI, (angle +2*PI/edgs_num) * 180 / PI)

    edges.push(new Edge(x1, y1, x2, y2))
  }
  edges[edgs_num - 1] = new Edge(0, 0, width, 0)
  edges[edgs_num - 2] = new Edge(width, height, width, 0)
  edges[edgs_num - 3] = new Edge(0, 0, 0, height)
  edges[edgs_num - 4] = new Edge(width, 0, width, height)
}

function draw() {
  background(220)
  strokeWeight(20)

  for(let i = 0;i < boc_num; i++){
    bouncers[i].update() 
  }

  // 다각형 바운더리 선분 그리기
  strokeWeight(20)
  stroke(255, 0, 255) // purple

  for(let i=0; i<edgs_num; i++){
    line(edges[i].x_1, edges[i].y_1, edges[i].x_2, edges[i].y_2) // API: line(x1, y1, x2, y2)
  }
}