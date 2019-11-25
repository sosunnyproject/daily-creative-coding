let flock;
let imgs = [];
let sliderSep;

// 나비 이미지 로드
function preload(){
  for (var i=0; i<4; i++) {
    imgs[i] = loadImage("data/totoro_dust_"+i+".png");
  }
}

function setup() {
  createCanvas(600, 600, WEBGL);
  sliderSep = createSlider(0, 20, 4);
  flock = new Flock();
  for(let i=0;i<30;i++){
   let b = new Boid(0, 0, imgs[floor(random(0,4))]);
   flock.addBoid(b);
  }
}

function draw() {
  background(0);
  flock.run();
}

function mouseDragged() {
  if(mouseX < width) flock.addBoid(new Boid(mouseX-width/2, mouseY-height/2, imgs[floor(random(0,4))]));
}
