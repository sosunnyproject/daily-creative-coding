
class Walker{

  constructor(numWidth, numHeight) {
    this.x = floor(random(numWidth))
    this.y = floor(random(numHeight))
    this.numW = numWidth
    this.numH = numHeight
  }

  render(){
    fill(255, 0, 255)
    ellipse(this.x * w + margin * 0.5, this.y * h + margin * 0.5, 10, 10)
  }

  update(){
    // const pick = floor(random(4)) // 0,1, 2, 3
    let pick = []
    // vector in 4 different directions
    // left
    const leftVec = createVector(-1, 0)
    // up
    const upVec = createVector(0, 1)
    // right
    const rightVec = createVector(1, 0)
    // down
    const downVec = createVector(0, -1)

    // 4가지 방향에 대한 정보를 리스트에 저장
    // 특정 방향으로 이동이 가능한지 먼저 확인
    // list에 방향에 대한 정보를 더해줄지 결정
    if(this.x < this.numW) {
      // to right
      pick.push(rightVec)
    } 
    if(this.y < this.numH){
      // to up
      pick.push(upVec)
    } 
    if(this.x > 0) {
      // to left
      pick.push(leftVec)
    }
    if(this.y > 0) {
      // to down
      pick.push(downVec)
    }

    // list 길이 만큼의 랜덤한 양의 점수 뽑기
    const rand = floor(random(pick.length))

    // 위에서 뽑힌 숫자를 list 에서 참조할 목차번호로 활용
    const dirVector = pick[rand]

    // 뽑힌 방향대로 이동
    this.x += dirVector.x
    this.y += dirVector.y
  }
}