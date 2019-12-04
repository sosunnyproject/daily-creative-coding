function triangleGrid(x,y,w,h,vertexDist,func=function(){}){
  let vertexNum = 3;
  let gridPoint = new p5.Vector();
  let gap = cos(TWO_PI/vertexNum ) * vertexDist*2;
  let yDist = sin(TWO_PI/vertexNum ) * vertexDist;
  let xFix = cos(TWO_PI/vertexNum ) * vertexDist + gap + x;
  while(gridPoint.y < y+h){
    let pos = gridPoint.copy();
    
    func(pos.x,pos.y);
   
    gridPoint.x += vertexDist*2 + cos(TWO_PI/vertexNum ) * vertexDist*2;
    
    if(gridPoint.x > x+w){
       gridPoint.x = xFix;
       gridPoint.y += yDist;
       if(xFix == x) xFix = cos(TWO_PI/vertexNum ) * vertexDist + gap + x;
       else xFix = x;
    }
  }
}