// https://editor.p5js.org/sosunnyproject/sketches/T71iLSf6
let counter = 0.00;
let radius = 80;
let slider, s2, btn;
let btnVal = 0;
let c1, c2;
let Y_AXIS = 1;

function setup() {
  createCanvas(600, 600, WEBGL);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  background(20);

  // the slider make move the light from behind (1) to front (1);
   slider = createSlider(4, 10, 6, 0.05);
   s2 = createSlider(0.005, 0.03, 0.015, 0.005);
  // https://p5js.org/examples/color-linear-gradient.html
  c1 = color(255,128,0); // color(204, 102, 0);
  c2 = color(0, 102, 153);
  
   btn = createButton('breathe');
   btn.mousePressed(drawGradient);
 
}

function draw() {
  // background(110, 0, 200);  // purple
  // background('#fb6b15'); // amber
  // https://colorpalette.org/reflection-nature-sunset-color-palette/

  orbitControl();

  // for the rotation of light colors
  counter++;
  let spd = s2.value();   // If you want accelerate or slow dow the rotation
  let colArray = [ color(204, 102, 0), color(0,30, 71), color(204,93,0), color(0,57,135)]
  // [color(236,130,39) , color(250,128,4), color(186,57,4)];

  // ambientLight(color(100, 0, 200));

  // For each color, we create the position of the light around a circle
  // and we add the position of all colors already calculated
  // 조명이 이동하는 것.
  for(i=0;i<colArray.length;i++){
    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
    directionalLight(colArray[i], lightPosx*slider.value()/2,lightPosy, lightPosx*lightPosy*slider.value());
  }

  // 고정된 directional Light
  /*
  directionalLight(color('#7D7AEB'), -width/2, height/2, 0); // bottom left
  directionalLight(color('#0904B8'), width/2, -height/2, 0); // top right
  directionalLight(color('#6E00C8'), 0, 0, -50);
  directionalLight(color('#916436'),width/2, height/2, -20);
  directionalLight(color('#FA8072'), -width/2,-height/2, -20);
  */

  // Materials: Sphere
  // ambientMaterial(map(sin(frameCount*0.05),-1, 1, 100, 255)); 
  specularMaterial(0);
  // specularMaterial(204, 102, 0);

  // setGradient(-width/2, -height/2, width, height, c1, c2, Y_AXIS);
  // normalMaterial(); // 디폴트 색깔이 있음.
  noStroke();
  sphere(180);
}


function setGradient(x, y, w, h, c1, c2, axis){
  // noFill();
  for(let i = y; i <= y+h; i++){ // 0 ~ height
    let inter = map(i, y, y+h, 0, 1);
    // console.log(i, y, y+h); // i : -300 ~ 300, 
    let c = lerpColor(c1, c2, inter*(frameCount*s2.value()*0.5));
    stroke(c);
    line(x, i, x+w, i);
  }
}

function drawGradient(){
  btnVal += 1;
  for(let i = -height/2; i <= -height/2+height; i++){ // 0 ~ height
    let inter = map(i, -height/2, -height/2+height, 0, 1);
    console.log("inter var", btnVal*0.05);
    let c = lerpColor(c2, c1, inter*(btnVal*0.05));
    stroke(c);
    line(-width/2, i, -width/2 + width, i);
  }
  // rect(-width/2, -height/2, width, btnVal);

}