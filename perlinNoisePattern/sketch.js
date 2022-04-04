let yoff = 0.0;
let xInterval = 10;
let size = 1, speed = 1;
let slider, sliderSpeed;

function setup() {
  createCanvas(710, 400);
  noFill(0);

  frameRate(30);

	slider = createSlider(0, 10, 5, 1)
  sliderSpeed = createSlider(0, 30, 5, 1)
}

function draw() {
  background(255,10);

	singleVertexLine()
	// wavyVertex()
  // perlinVertex(100, 150, 0.002, 4)
  // perlinNoiseShape(100, 200, 300)
}

function singleVertexLine() {
	beginShape();
  let xoff = 0;
  let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
  stroke(251, 140, 152 + extra, 50);
  for (let x = 0; x < width; x += xInterval) {
      let y = map(noise(xoff, yoff), 0, 1, 100, 400);
      vertex(x, y);
      xoff += 0.03;
    }
  yoff += 0.005; 
  vertex(width+100, height+40); 
  vertex(-30, height+30); 
  endShape(CLOSE);
}

// yAdd: 0.001 ~ 0.009
// xGap: 2 ~ 10
// startY: 100 ~ 
// endY: 200, 300, 400 ~
function perlinVertex(startY, endY, yAdd, xGap){
  beginShape();
  let xoff = 0;
  let extra = map(noise(xoff, yoff), 0, 1, -50, 150);
  strokeWeight(1)
  stroke(51, 140, 152 + extra + endY/20);
  for (let x = 0; x < width; x += xInterval) {
		let y = map(noise(xoff, yoff), 0, 1, startY, endY);
		vertex(x, y);
		xoff += 0.03;
	}
  yoff += yAdd; 
  vertex(width+100, height+40); 
  vertex(-30, height+30); 
  endShape(CLOSE);
}

// Much Slower Than Vertex
// startX: 0, 50, 100, ~
// startY: 10, 100, 200, ~
// endY: 100, 200, 300 ~
function perlinNoiseShape(startX, startY, endY){

  let t = frameCount/10
  let heightVar = map(slider.value(), 0, 10, 0, 1)
  let yVar = sliderSpeed.value()
  size = map(heightVar, 0, 1, 5, 0.1)
  
  for(let i = 0; i < 50; i++) {
    let xoff = startX;
    // let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
    stroke(10, 200, 105+endY/2);
    strokeWeight(0.1)
		for (let x = 0; x < width; x += xInterval) {
			let y = map(noise(xoff, yoff), 0, 1, startY, endY);
			point(x + i/2, y * size/2);
			xoff += 0.035;
		}
		yoff += 0.001;
	}

}

function wavyVertex() {
	let t = frameCount/10
  let heightVar = map(slider.value(), 0, 10, 0, 1)
  let yVar = sliderSpeed.value()
  size = map(heightVar, 0, 1, 5, 0.1)
  
  background(255)
  for(let i = 0; i < 100; i++) {
    let xoff = 0;
    // let extra = map(noise(xoff, yoff), 0, 1, -100, 100);
		stroke(10, 51, 225);
		strokeWeight(0.2)
		for (let x = 0;x < width; x += xInterval) {
			let y = map(noise(xoff, yoff), 0, 1, 50, 300);
			ellipse(x + i/2, y * size/2, 1, 1);
			xoff += 0.035;
    }
  	yoff += 0.001 * yVar;
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('PerlinTattooStroke', 'png');
  }
}