class Mover{
  PVector pos;
  PVector vel;
  PVector acc;
  float friction;
  
  float radius;
  
  boolean isDragging;
  PVector mouse;
  PVector pmouse;
  PVector startPos;
  PVector startMouse;
  
  Mover(PVector pos_, PVector force){
    pos = pos_;
    vel = new PVector();
    acc = new PVector();
    
    friction = 0.98;
    
    applyForce(force);
    
    radius = 50;
    isDragging = false;
  }
  
  void applyForce(PVector force){
    acc.add(force);
  }
  
  void detectEdge(){
    if(pos.x<radius){
        vel.x *= -1;
        pos.x = radius;
    }
    else if(pos.x>width-radius){
        vel.x *= -1;
        pos.x = width-radius;
    }
  }
  
  void update(){
    if(!isDragging){
      vel.add(acc);
      vel.mult(friction);
      pos.add(vel);
      acc.mult(0);
      detectEdge();
    }
  }
  
  void display(){
    fill(0);
    noStroke();
    ellipse(pos.x, pos.y, radius*2, radius*2);
  }
  
  void run(){
    update();
    display();
  }
  
  // 인터랙션
  void dragDetect(){
    if(dist(mouseX,mouseY,pos.x,pos.y) < radius){
      isDragging = true;
      vel.mult(0);
       
      mouse = new PVector(mouseX,mouseY);
      
      startPos = pos.copy();
      startMouse = mouse.copy();
    }
  }
  
  void dragging(){
    if(isDragging){
      pmouse = mouse.copy();
      mouse = new PVector(mouseX,mouseY);
      PVector move = PVector.sub(mouse, startMouse);
      
      pos = PVector.add(move, startPos);
    }
  }
  
  void release(){
    if(isDragging){
      isDragging = false;
      PVector force = PVector.sub(mouse, pmouse);
      applyForce(force);
    }
  }

}
