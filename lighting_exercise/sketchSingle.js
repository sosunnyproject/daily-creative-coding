let counter = 0.00;
let radius = 80;
let slider;
function setup() {
  createCanvas(400, 400, WEBGL);
  setAttributes('antialias',true);
  setAttributes('perPixelLighting',true);
  background(20);

  // the slider make move the light from behind (1) to front (1);
   slider = createSlider(-1, 1, -0.25, 0.25);

}

function draw() {
  background(110, 0, 200);  // purple
  // background('#fb6b15'); // amber
  // https://colorpalette.org/reflection-nature-sunset-color-palette/

  // test to manipulate with the mouse
  orbitControl();

  // Array of 5 colors
  c1 = color(15, 76, 129); // classic blue
  c2 = color(108, 182, 206); // cool blue

  // try with 2, 3, or 5 colors
  let colArray = [c1,c1,c1];

  // for the rotation of light colors
  counter++;

  // If you want accelerate or slow dow the rotation
  // let spd = noise(frameCount%40)/ slider.value();
  let spd = 0.005;

  // point light
  let pointX = width/2; // webgl coord
  let pointY = height/2; // webgl coord
  // pointLight(color, locX, locY, locZ);

  // amber color(250, 215,122)
  
  // pointLight(
  //   color(250,
  //         map(mouseX, 0, width, 170, 255),
  //         map(mouseY, 0, width, 75, 175)),
  //            pointX, pointY, 120);

  //ambientLight
  ambientLight(color(100, 0, 200));

  // For each color, we create the position of the light around a circle and we add the position of all colors already calculated
  // 조명이 이동하는 것.

  for(i=0;i<colArray.length;i++){

    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));

    // directionalLight
    directionalLight
    (colArray[i],  // color
     lightPosx,    // x
     lightPosy,    // y
     lightPosx*lightPosy*slider.value() // z
    );

  }

  // 고정된 directional Light
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

  directionalLight
    (color('#6E00C8'),  // center
     0,    // x
     0,    // y
     -50 // z
    );

  // directionalLight
  //   (color('#916436'),  // bottom right
  //    width/2,    // x
  //    height/2,    // y
  //    -20 // z
  //   );

  directionalLight
    (color('#FA8072'),  // top left
     -width/2,    // x
     -height/2,    // y
     -20 // z
    );


  // Materials
  ambientMaterial(255);

  
  ambientMaterial(
    map(sin(frameCount*0.005),
        -1, 1,     // original sin values
        100, 255));  // map to 0 ~ 255
  

  // 변수: color: original obj color
  /*
  specularMaterial(map(sin(frameCount*0.025),
        -1, 1,     // original sin values
        100, 150));
  */

  // normalMaterial(); // 디폴트 색깔이 있음.
  noStroke();
  sphere(90);
}
