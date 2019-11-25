var pg;
var tileWidth = 3;
var tileHeight = 3;
var gap = 12;
var t = 'LOVERS';
var t2 = 'LOVERS';
var startX = 0;
var startY = 0;
var startX2 = 100;
var startY2 = 200;

function setup() {
  createCanvas(800, 600, P2D);

  // 가상의 캔버스 생성
  pg = createGraphics(width,height);
  // 가상의 캔버스안에 텍스트를 그린다
  pg.background(255);
  pg.textSize(random(24, 100));
  pg.textFont('Lovers Quarrel');
  pg.textAlign(LEFT,TOP);
  pg.text(t,startX, startY);

  pg2 = createGraphics(width,height);
  // 가상의 캔버스안에 텍스트를 그린다
  pg2.background(255);
  pg2.textSize(width*0.20);
  pg.textFont('Work Sans');
  pg2.textAlign(LEFT,TOP);
  pg2.text(t2,startX2, startY2);
}

function draw() {
  background(0);

  var w = pg.textWidth(t);
  var h = height;
  var rand1 = noise(frameCount % 100 / 30) * 20 ;
  var rand2 = noise(frameCount % 80 / 30) * 20 ;

  fill(217, 126, 150);
  for (let i = 0; i < 30; i++) {
      for(var y=startY; y<startY-h; y+=gap){
        for(var x=startX; x<startX-w; x+=gap){
          var c = pg.get(x,y);
          if(brightness(c) < 100){
            var off = frameCount / 20;
             // + (x+y)*0.01;
            var dx = x + sin(off)*gap*0.4;
            var dy = y + sin(off)*gap*0.2;
            ellipse(dx,dy,rand1, rand1);
          }
        }
    }
    startX = random(0, width - 20);
    startY = random(0, height - 30);
  }
  /**
  fill(217, 126, 150);
   140, 42, 78
    217, 78, 129
     242, 206, 219
     242, 196, 218

  // fill(250, 144, random(120,200));
  fill(217, 126, 150)
  //stroke(255, 50);
  for(var y=startY; y<startY+h; y+=gap){
    for(var x=startX; x<startX+w; x+=gap){
      var c = pg.get(x,y);
      if(brightness(c) < 100){
        var off = frameCount / 20
         // + (x+y)*0.01;
        var dx = x + sin(off)*gap*0.4;
        var dy = y + sin(off)*gap*0.2;
        ellipse(dx,dy,rand1, rand1);
      }
    }
  }
     */
/**
  var w2 = pg2.textWidth(t2);
  // fill(255, 128, 139);
  // fill(255, 163, 181);
  fill(140, 42, 78);
  // strokeWeight(random(5, 10));
  // stroke(255, 120);
  // noStroke();
  for(var y=startY2; y<startY2+h; y+=gap){
    for(var x=startX2; x<startX2+w2; x+=gap){
      var c = pg2.get(x,y);
      // console.log();
      if(brightness(c) < 100){
        var off = frameCount * 0.05  // + (x+y)*0.01;
        var dx = x + sin(off)*gap* 0.1 ;
        var dy = y + sin(off)*gap*0.1;
        ellipse(dx,dy, rand2, rand2);
      }
    }
  }
  */
}
