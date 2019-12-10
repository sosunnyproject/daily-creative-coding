let counter = 0.00;
let radius = 80;
let slider;
function setup() {
  createCanvas(200, 200, WEBGL);
  setAttributes('antiAlias',true);
  background(20);
  // the slider make move the light from behind (1) to front (1);
   slider = createSlider(-1, 1, -0.3, 0.1);

}

function draw() {
  background(0);
  
  // test to manipulate with the mouse
  orbitControl();
  
  // Array of 5 colors
  // c1 = color(15, 76, 129); // classic blue
  c1 = color(235,215,122);
  c2 = color(108, 182, 206)
  //c1 = color(217, 126, 150);
  // c2 = color(140, 42, 78);
  // c3 = color(217, 78, 129);
  // c4 = color(242, 206, 219);
  // c5 = color(242, 196, 218);
  
  // try with 2, 3, or 5 colors
  let colArray = [c1,c2, c1, c2, c1];
  
  // for the rotation of light colors
  counter++;
  
  // If you want accelerate or slow dow the rotation
  // let spd = noise(frameCount%40)/ slider.value();
  let spd = 0.008;
  
  // For each color, we create the position of the light around a circle and we add the position of all colors already calculated
  
  for(i=0;i<colArray.length;i++){
    
    let lightPosx = sin(counter*spd+((TWO_PI/colArray.length)*i));
    // sin(counter * spd +  (TWO_PI/colArray.length)*i);
        
    let lightPosy = cos(counter*spd+((TWO_PI/colArray.length)*i));
 // cos(counter * spd + (TWO_PI/colArray.length)*i);
    
    
    // Create the Lights 
    // directionalLight(colArray[i],lightPosx,lightPosy, slider.value()*0.1);
    
    // Try this if you want to experiment others effects 
    directionalLight(colArray[i],lightPosx,lightPosy, lightPosx*lightPosy * slider.value());
  }
  
  //Try specular material. 
  // Or try to decrease the value of the color
  ambientMaterial(map(sin(frameCount*0.025), -1, 1, 0, 255));
  noStroke();
  sphere(50);
  
}