let cnv, slider;
let balls = [];
let counter = 0.00;

function setup(){
  cnv = createCanvas(500, 500,  WEBGL);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  for(let i = 0; i < 20; i++) {
    let b = new Ball();
    balls.push(b);
  }
  slider = createSlider(-1, 1, -0.25, 0.25);
}

function draw(){
  background(0);
  // background(100, 60, 250);
  orbitControl();
  
  // Array of 5 colors
  c1 = color(15, 76, 129); // classic blue
  c2 = color(108, 182, 206); // cool blue
  // try with 2, 3, or 5 colors
  let colArray = [c1,c2,c1];
  // for the rotation of light colors
  counter++;
  
  // If you want accelerate or slow dow the rotation
  // let spd = noise(frameCount%40)/ slider.value();
  let spd = 0.025;
  for(i=0;i<colArray.length;i++){
    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));    
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
    // directionalLight
    directionalLight
    (colArray[i],  // color
     lightPosx,    // x
     lightPosy,    // y
     slider.value()// z
    ); 
  }
    directionalLight
    (color('#7D7AEB'),  // bottom left
     -width/2,    // x
     height/2,    // y
     0 // z
    ); 
 
  
  directionalLight
    (color('#0904B8'),  // top right
     width/2,    // x
     -height/2,    // y
     0 // z
    ); 
   
//   directionalLight
//     (color('#104A85'),  // center
//      0,    // x
//      0,    // y
//      -50 // z
//     ); 
  
//   directionalLight
//     (color('#916436'),  // bottom right
//      width/2,    // x
//      height/2,    // y
//      -20 // z
//     ); 
  
  directionalLight
    (color('#B84404'),  // top left
     -width/2,    // x
     -height/2,    // y
     -20 // z
    );
  for(let i = 0; i < balls.length; i++){
    push();
    translate(balls[i].loc.x, balls[i].loc.y, balls[i].loc.z);
    balls[i].display();
    balls[i].update();
    balls[i].bound();
    pop();
  }
}
