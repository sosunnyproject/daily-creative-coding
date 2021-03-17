let xInterval = 2;
let yoff = 0.0;
let sound, amp, size, speed;
let mic;
let micLevel;
let slider, sliderSpeed;
let col = 1

function setup() {
  createCanvas(900, 300);
  noFill(0);
  background(255);
  size = 1;
  speed =1;
  slider = createSlider(0, 10, 5, 1)
  sliderSpeed = createSlider(0, 100, 5, 1)
  // colorMode(HSB)
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('PerlinTattoo', 'png');
  }
}

function draw() {
  let t = frameCount/800
  let level = map(slider.value(), 0, 10, 0, 1)
  let speed = sliderSpeed.value()
  size = map(level, 0, 1, 0.1, 5.0);
  background(255);
  
  
  for (let i = 0; i < 50; i++) {
    let xoff = 0;
    
    let extra = map(noise(xoff, sin(yoff))/2, 0, 1, 0, 100); // extra for stroke color
    for (let x = 0; x < width; x +=3) {
      let y = map(noise(xoff, yoff), 0, 1, 0, height/4*3);
      // y = y + size;
      strokeWeight(3)
      stroke((frameCount*i)%255);
      point(x+i/5, y+size*i)
      
//    ellipse(cos(i)*x+width/2, sin(i)*y+height/2, 10, 10)
//    stroke(120+(t+(i*4))%160, 40, 80);
//    ellipse(x+(i/3) , y*size/2 + 30, 1, 1)
//    stroke(180+(t+(i*3))%160, 40, 80);
//    ellipse(x+(i)+20 , y*size/2 + 60, 1, 1)
      
      xoff += 0.035
      }
    yoff = 0.08 * speed/4
  }
}
