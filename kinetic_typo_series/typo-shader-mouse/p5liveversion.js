let font, currentShader;
let graphic1, graphic2, graphic3, graphic4;
const words = ['NEVER', 'SLEEP', 'SEOUL']
let ind = 1

function preload() {
	font = loadFont("includes/demos-data/fonts/RobotoMono-Regular.otf");
}


function setup() {
	createCanvas(1000, 800, WEBGL); // Shaders require WEBGL
	background(0);

	pixelDensity(1); // fixes retina display offset
	setAttributes('antialias', true); // toggle depending on display / performance

	// load vert/frag defined below
	currentShader = createShader(vertShader, fragShader);
	  noStroke()
	
	  // create graphic with text
	  setGraphics('graphic1', words[0])
	  setGraphics('graphic2', words[0])
	  setGraphics('graphic3', words[0])

}

function changeWord(i) {
  setGraphics('graphic1', words[i])
  setGraphics('graphic2', words[i])
  setGraphics('graphic3', words[i])
}

function draw() {
  
   if(frameCount%80 === 0) {
    changeWord(ind)
    if(ind === words.length - 1) {
      ind = 0
    } else{
      ind++
    }
  }
  shader(currentShader)

  // version2: mouse interactive
  let freq = map(sin(frameCount/50), -10, 10, 0.0, 5.0)
  let amp = map(cos(frameCount/50), 0, 1, 0.1, 0.05)
  let angle = map((frameCount/20)%100, 0, 100, 1, 10)
  currentShader.setUniform('frequency', mouseX/10)
  currentShader.setUniform('amplitude', amp)
  currentShader.setUniform('speed', frameCount * 0.05)
  currentShader.setUniform('texture1', graphic1)
  currentShader.setUniform('texture2', graphic2)
  currentShader.setUniform('texture3', graphic3)
  currentShader.setUniform('u_angle', PI/angle)
  
  
  rect(0,0,width,height);

}


function setGraphics(g, word) {
  const size = 800
  const centerX = size/2
  const centerY = size/2 - 50
  
  if(g == 'graphic1'){
    graphic1 = createGraphics(size, size)
    graphic1.background(0, 0, 0)
    graphic1.textFont(font)
    graphic1.textSize(size * 0.2)
    graphic1.textAlign(CENTER, CENTER)
    graphic1.fill('rgba(242, 39, 229, 1.0)') //7, 242, 219
    graphic1.text(word, centerX,  centerY)
  }
  if(g == 'graphic2'){ 
    graphic2 = createGraphics(size, size)
    graphic2.background(0, 0, 0)
    graphic2.textFont(font)
    graphic2.textSize(size * 0.2)
    graphic2.textAlign(CENTER, CENTER)
    graphic2.fill('rgba(138, 34, 242, 1.0)') //215, 7, 242
    graphic2.text(word, centerX-20,  centerY+14)
  }
    if(g == 'graphic3'){ 
    graphic3 = createGraphics(size, size)
    graphic3.background(0, 0, 0)
    graphic3.textFont(font)
    graphic3.textSize(size * 0.2)
    graphic3.textAlign(CENTER, CENTER)
    graphic3.fill('rgba(27, 242, 203, 1.0)') 
    graphic3.text(word, centerX+5,  centerY-20)
  }
}


// standard p5js vertex shader
let vertShader = `
	//vertex data
	attribute vec3 aPosition; // position of pixel, vertex data
	attribute vec2 aTexCoord; // texture coordinates
	
	
	// variables shared with frag file
	varying vec2 vertTexCoord; 
	
	void main() {

	// copy the texture coordinates from p5js to .vert
	vertTexCoord = aTexCoord;
	
	// copy the position data into vec4. adding 1.0 as w parameter
	vec4 positionVec4 = vec4(aPosition, 1.0);
	
	// scale the rect by two, and move it to the center of the screen
	positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
	
	// send vertex info to .fragment shader
	gl_Position = positionVec4;
	
	}
`;


let fragShader = `
	#ifdef GL_ES
	precision highp float;
	#endif
	  
	//size of canvas from p5js. u_resolution.x : width, .y: height
	
	// using the same variable from vert file
	varying vec2 vertTexCoord;
	
	uniform float speed;
	uniform float frequency;
	uniform float amplitude;
	uniform sampler2D texture1;
	uniform sampler2D texture2;
	uniform sampler2D texture3;
	uniform sampler2D texture4;
	
	uniform float u_angle;
	
	void main() {
	  //coord: rotate the angle of text location
	  vec2 coord = vec2(1.0, 1.0) - vertTexCoord;
	  float sin_factor = sin(u_angle);
	  float cos_factor = tan(u_angle);
	  coord = (coord - 0.5) * mat2(-cos_factor, sin_factor, sin_factor, cos_factor);
	  coord += 0.5;
	  
	  // copy vertTexCoord
	  // verTexCoord is a value 0.0 ~ 1.0
	  // access every pixel on screen
	  vec2 uv = vec2(1.0, 1.0) - vertTexCoord;
	  uv.x = uv.x * -1.0;
	    
	  // sine wave to distort texture coords
	  // built in sin() function in glsl
	  float sineWave = sin(uv.x* frequency + speed) * amplitude;
	  float cosWave = cos(uv.x*uv.y * frequency + speed) * amplitude;
	  float tanWave = tan(uv.x*uv.x * frequency + speed) * amplitude;
	
	  // create vec2 with sine, cos, tan
	  vec2 distort = vec2(sineWave*1.0, sineWave*1.0);
	  vec2 distort2 = vec2(cosWave*1.2, cosWave*1.5);
	  vec2 distort3 = vec2(tanWave*1.5, tanWave*1.2);
	  
	  // variable - uv : static OR coord: mouse Responsive
	  vec4 texColor1 = texture2D(texture1, mod(coord -  distort, 1.0));
	  vec4 texColor2 = texture2D(texture2, mod(coord -  distort2, 1.0));
	  vec4 texColor3 = texture2D(texture3, mod(coord -  distort3, 1.0));
	
	  // colors
	  gl_FragColor = texColor2 + texColor3 + texColor1;
	}
`;