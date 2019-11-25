// 객체 없이 변수만 사용하는 예제입니다
// 드래그하면 움직입니다
// * 표시가 있는부분을 자기 작업에 맞게 적절히 사용해주시면 됩니다


// 필수 변수 !!!!
float x;
float y;
float vx;
float vy;

//
float ax = 0;
float ay = 0;
float friction = 0.98;
float radius = 50;

// 인터랙션 관련 변수
boolean isDragging = false;
float mx;
float my;
float pmx;
float pmy;
float smx;
float smy;
float sx;
float sy;

void setup(){
  
  //// 16:9 에 맞춰 원하시는 크기로 테스트 해주세요 *
  size(337,600);
  
  x = width/2;
  y = height/2;
  vx = 0;
  vy = 0;
}

void draw(){
  background(222);
  
  
  if(!isDragging){
    vx += ax;
    vy += ay;
    
    vx *= friction;
    vy *= friction;
    
    x += vx;
    y += vy;
    
    ax = ay = 0;
    
    if(x<radius){
        vx *= -1;
        x = radius;
    }
    else if(x>width-radius){
        vx *= -1;
        x = width-radius;
    }
  }

  fill(0);
  noStroke();
  ellipse(x, y, radius*2, radius*2);
  
  
  
  //// 개체가 화면 위/아래 로 넘어간 경우 *
  if(y < 0 || y > height){
    
    //// send 함수에 좌표와 속도 값을 전달합니다 *
    send(x, y, vx, vy);
    
  }
}

//// create 함수 안에서 값을 받아 개체 생성 및 변경 *
void create(float posX, float posY, float velX, float velY){
  x = posX;
  y = posY;
  vx = velX;
  vy = velY;
}


// 인터랙션 관련
// 이부분은 예시입니다 무시하셔도 좋습니다
void mousePressed(){
  if(dist(mouseX,mouseY,x,y) < radius){
      isDragging = true;
      vx = vy = 0;
       
      smx = mx = mouseX;
      smy = my = mouseY;
      
      sx = x;
      sy = y;
    }
}

void mouseDragged(){
  if(isDragging){
      pmx = mx;
      pmy = my;
      
      mx = mouseX;
      my = mouseY;
    
      float moveX = mx - smx;
      float moveY = my - smy;
    
      x = sx + moveX;
      y = sy + moveY;
    }
}

void mouseReleased(){
  if(isDragging){
    isDragging = false;
    
    ax = mx - pmx;
    ay = my - pmy;
  }
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
