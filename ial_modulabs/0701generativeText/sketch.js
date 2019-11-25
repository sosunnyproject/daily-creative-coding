var pg;
var tileWidth = 3;
var tileHeight = 3;
var gap = 12;
var t = 'lovers';
var t2 = '2019';

function setup() {
  createCanvas(800, 600, P2D);

  // 가상의 캔버스 생성
  pg = createGraphics(width,height);
  // 가상의 캔버스안에 텍스트를 그린다
  pg.background(255);
  pg.textSize(width*0.25);
  pg.textAlign(LEFT,TOP);
  pg.text(t,120,100);

  pg2 = createGraphics(width,height);
  // 가상의 캔버스안에 텍스트를 그린다
  pg2.background(255);
  pg2.textSize(width*0.25);
  pg2.textAlign(LEFT,TOP);
  pg2.text(t2,150,300);
}

function draw() {
  background(0);

  var startX = 120;
  var startY = 100;
  var w = pg.textWidth(t);
  var h = height*0.3;
  var rand = random(8, 20);
  // 각 타일 위치마다
  // fill(255, 190, 241);
  // fill(231, 139, 144);
  // fill(251,140,152);
  // fill(248, 144, 165);

  // noStroke();
  // var rdm = map(sin(random(0, 10)), -1, 1, 5, 20);
  // console.log(rdm);
  fill(250, 144, random(120,200));
  stroke(255, 50);
  for(var y=startY; y<startY+h; y+=gap){
    for(var x=startX; x<startX+w; x+=gap){
      var c = pg.get(x,y);
      if(brightness(c) < 5){
        var off = frameCount * 0.1 + (x+y)*0.01;
        var dx = x + sin(off)*gap*2.5;
        var dy = y + sin(off)*gap*0.2;
        ellipse(dx,dy,rand, rand);
      }
    }
  }

  var startX2 = 150;
  var startY2 = 300;
  var w2 = pg2.textWidth(t2);
  // fill(255, 128, 139);
  fill(255, 163, 181);
  // strokeWeight(random(5, 10));
  stroke(255, 120);
  // noStroke();
  for(var y=startY2; y<startY2+h; y+=gap){
    for(var x=startX2; x<startX2+w2; x+=gap){
      var c = pg2.get(x,y);
      // console.log();
      if(brightness(c) < 5){
        var off = frameCount * 0.1 + (x+y)*0.01;
        var dx = x + sin(off)*gap*2;
        var dy = y + sin(off)*gap*0.1;
        ellipse(dx,dy, rand, rand);
      }
    }
  }

}
