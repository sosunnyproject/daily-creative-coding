// 객체를 사용하는 예제입니다
// 드래그하면 움직입니다
// * 표시가 있는부분을 자기 작업에 맞게 적절히 사용해주시면 됩니다


Mover mover;

void setup(){
  
  //// 16:9 에 맞춰 원하시는 크기로 테스트 해주세요 *
  size(337,600);
  
  mover = new Mover(
    new PVector(width/2, height/2),
    new PVector()
  );
}

void draw(){
  background(222);
  mover.run();
  
  if(mover.pos.y < 0 || mover.pos.y > height){
    
    // send 함수에 좌표와 속도 값을 전달합니다 *
    send(mover.pos.x, mover.pos.y, mover.vel.x, mover.vel.y);
    
  }
}

//// create 함수 안에서 값을 받아 개체 생성 및 변경 *
void create(float posX, float posY, float velX, float velY){
  mover = new Mover(
    new PVector(posX, posY),
    new PVector(velX, velY)
  );
}


// 인터랙션 관련
// 이부분은 예시입니다 무시하셔도 좋습니다
void mousePressed(){
  mover.dragDetect();
}

void mouseDragged(){
  mover.dragging();
}

void mouseReleased(){
  mover.release();
}


//// 아래는 서버 관련부분입니다 고치지 마세요 ////

void receive(String msg){
  
  String[] data = split(msg, ",");
  
  if(data.length>=5 && parseInt(data[0]) == 0 ){
    create(float(data[1]), float(data[2]), float(data[3]), float(data[4]));
  }
  
}

void send(float posX, float posY, float velX, float velY){
  String msg = 0 + "," + posX + "," + ( posY>=height?0:height ) + "," + velX + "," + velY;
  receive(msg);
}
