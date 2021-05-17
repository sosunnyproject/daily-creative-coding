export default class IntroSketch 
{
  constructor(width, height, div) {
    new p5( function(p) {
      let font1;
      let rightImg, leftImg, leap1, leap2;
      p.preload = function() {
        font1 = p.loadFont('fonts/Sam3KRFont.ttf')
        rightImg = p.loadImage('images/right.png');
        leftImg = p.loadImage('images/left.png');
        leap1 = p.loadImage('images/leapmotion1.png');
        leap2 = p.loadImage('images/leapmotion2.png');
      }
      p.setup = function() {
        p.createCanvas(width, height);
        rightImg.resize(200, 200)
        leftImg.resize(200, 200)
        leap1.resize(500, 500)
        leap2.resize(500, 500)
      }
      p.draw = function() {
        p.background(0);
        p.fill(255)
        p.textFont(font1)
        p.textSize(70)
        p.text('의식의 방에 온 것을 환영합니다.', 20, 50, width, 400)
        p.text('기계를 직접 만지지 말고, 손이 잘 인식되었는지 확인해주세요', 20, 600, p.width, 400)
        p.image(leftImg, 100, height/2)
        p.image(rightImg, 300, height/2)
        p.image(leap1, width/8, 140)
        p.image(leap2, width/2, 140)
      }
    }, div);
  }
}

