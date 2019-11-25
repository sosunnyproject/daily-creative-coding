var pg;
var tileWidth = 10;
var tileHeight = 10;

function setup() {
  createCanvas(600, 600, P2D);

  // 가상의 캔버스 생성
  pg = createGraphics(width,height);

  // 가상의 캔버스안에 텍스트를 그린다
  pg.background(248, 204, 215);
  pg.textAlign(CENTER,CENTER);
  pg.textSize(width*0.2);
  pg.text('LOVERS',width/2,height*0.5);
  fill(255);
}

function draw() {
  background(254, 111, 94);

  fill(255);
  // 각 타일 위치마다
  for(var y=0; y<height; y+=tileHeight){
    for(var x=0; x<width; x+=tileWidth){
      // fill(255);
      var off = frameCount * 0.2 + (x + y) * 0.012;
      var sx = parseInt(x + sin(off)*40);
      var sy = y;

      // 가상 캔버스를 움직여 픽셀 복사
      copy(pg,sx,sy,tileWidth+5,tileHeight+5,x,y,tileWidth,tileHeight);
      // 그리드라인
      // noFill();
      // noStroke();
      // rect(x,y,tileWidth,tileHeight);
    }
  }
}
