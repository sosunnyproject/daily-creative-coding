let logo;
function preload(){
  logo = loadImage('tripbtoz.svg')
  // 이미지 사이즈: 36px x 28px
}

// 처음에 환경설정을 세팅하는 함수
function setup() {
  createCanvas(600, 600) 
  // 캔버스를 만드는 함수 (너비값, 높이값)
  
  imageMode(CENTER)
}

// 10밀리초에 한번씩 실행되는 함수
function draw() {
  background(0) // 0 ~ 255
  // console.log(frameCount)
  
  // 빙글빙글 돌아가는 애니메이션
  
  // 좌표의 원점을 바꾸는 함수
  translate(width/2, height/2)
  image(logo, 0, 0)
  
  // x = r 반지름 * cos(각도), 
  // y = r 반지름 * sin(각도)
  let angle = frameCount/10
  let x = 100 * cos(angle)
  let y = 100 * sin(angle)
  image(logo, x, y)
}
