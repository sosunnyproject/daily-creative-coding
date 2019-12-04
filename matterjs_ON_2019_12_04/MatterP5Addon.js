
class ObjCircle{
  constructor(x,y,radius,shapeColor,option={}){
    this.radius = radius;
    this.body = Bodies.circle(x, y, this.radius, option);
    this.color = shapeColor;
    World.add(engine.world, this.body);
  }
  
  display(){
    let pos = this.body.position;
    push();
      translate(pos.x, pos.y);
      rotate(this.body.angle);
      noStroke();
      fill(this.color);
      circle(0,0,this.radius*2);
    pop();
  }
  
  isOnScreen(){
    let pos = this.body.position;
    if(pos.x+this.radius > 0
      && pos.x-this.radius < width
      && pos.y+this.radius > 0
      && pos.y-this.radius < height){
      return true;
    }
    else return false;
  }
  
  remove(){
    World.remove(engine.world, this.body);
  }
}

class ObjRect{
  constructor(x,y,w,h,shapeColor,option={}){
    
    this.width = w;
    this.height = h;
    this.color = shapeColor;
    
    this.body = Bodies.rectangle(x, y, this.width,this.height, option);
    World.add(engine.world, this.body);
  }
  
  display(){
    let pos = this.body.position;
    push();
      translate(pos.x, pos.y);
      rotate(this.body.angle);
      noStroke();
      fill(this.color);
      rect(0,0,this.width,this.height);
    pop();
  }
  
  isOnScreen(){
    let pos = this.body.position;
    let radius = dist(0,0,this.width/2,this.height/2);
    if(pos.x+radius > 0
      && pos.x-radius < width
      && pos.y+radius > 0
      && pos.y-radius < height) return true;
    else return false;
  }
  
  remove(){
    World.remove(engine.world, this.body);
  }
}

class Letter{
  constructor(text,x,y,letterHeight,letterColor,type){
    textSize(letterHeight);
    let letterWidth = 
    
    this.text = text;
    this.height = letterHeight;
    this.width = textWidth(text);
    this.color = letterColor;
    
    switch(type){
      case "rect":this.body = Bodies.rectangle(x, y, this.width, this.height);
                  break; 
      case "circle":this.body = Bodies.circle(x, y, this.height/2);
    } 
    World.add(engine.world, this.body);
  }
  
  display(){
    let pos = this.body.position;
    push();
      translate(pos.x, pos.y);
      rotate(this.body.angle);
      textSize(this.height);
      fill(this.color);
      text(this.text,0,0);
    pop();
  }
}