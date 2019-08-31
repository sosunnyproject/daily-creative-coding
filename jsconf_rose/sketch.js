//rose
let v;
let d = 85;

//particle
let psArray =[];
// let repeller;
let attractor;
let img;

function preload(){
  img = loadImage("data/b2_1.png");
}

function setup() {
  // webgl: 가로 세로 좌표 변경. -width/2 ~ width/2, -height/2 ~ height/2
  createCanvas(550, 600, WEBGL);

  // rose, 마우스 위치
  v = new Vehicle(mouseX - width/2, mouseY - height/2);
  // 화면 center에 안보이는 attractor 설정
  attractor = new Attractor();

  // 나비 파티클 나오는 particleSystem 어레이 혹은 하나만.
  psArray.push(new ParticleSystem(createVector(-width/2, height/2), img)); // 좌측 하단.
  // psArray.push(new ParticleSystem(createVector(-width/2, -height/2), img)); // 좌측 상단
  // psArray.push(new ParticleSystem(createVector(width/2, -height/2), img)); // 우측 상단
  // psArray.push(new ParticleSystem(createVector(width/2, height/2), img)); // 우측 하단
}

function draw() {
  // attractor: 파티클들이 중심으로 모이게.
  // attractor.display();

  // rose (파티클의 repeller로 작용)
  v.boundaries();
  v.arrive(createVector(mouseX - width/2, mouseY - height/2)); // auto agent: 마우스 따라가도록.
  v.update();
  v.display();

  // butterfly 파티클
  // let gravity = createVector(0, -0.001);
  for(i = 0; i < psArray.length; i++) {
    // 파티클 개수 제한
    if(frameCount % 4 == 0) {
      psArray[i].addParticle();
    }
    // psArray[i].applyForce(gravity);
    psArray[i].applyRepeller(v);
    psArray[i].applyAttractor(attractor);
    psArray[i].run();
  }


}
