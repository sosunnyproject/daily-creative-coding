let bouncers = []
let edges = []
// 바운스 볼(원)의 개수, 변 (벽)의 개수
let boc_num = 10, edgs_num = 10

function setup() {
  createCanvas(400, 400);
  
  //boc_num 개수만큼 Bouncer 클래스 오브젝트를 만들어서 bouncers 배열에 추가한다.
  // 자바스크립트는 배열 안에 어떤 오브젝트가 들어가는지 미리 선언하지 않고, 
  // push 로 배열에 새로운 원소를 추가한다.
  for(let i=0; i < boc_num; i++){
    bouncers.push(new Bouncer())
  }
  
  // 변의 개수만큼, 클래스 오브젝트 생성, 배열에 추가
  for(let i=0; i < edgs_num; i++){
    edges.push(new Edge())
  }
}

function draw() {
  background(220)
  strokeWeight(20)
  for(let i = 0;i < boc_num; i++){
    bouncers[i].update() 
  }

  // 원에서 뻗어나가는 선분  그려주기
  strokeWeight(20)
  for(let i=0; i<edgs_num; i++){
    line(edges[i].x_1, edges[i].y_1, edges[i].x_2, edges[i].y_2) // API: line(x1, y1, x2, y2)
  }
}