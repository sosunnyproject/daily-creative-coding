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

void main() {

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

  // create vec2 with our sine
  vec2 distort = vec2(sineWave*1.0, sineWave*1.2);
  vec2 distort2 = vec2(cosWave*1.0, cosWave*1.5);
  vec2 distort3 = vec2(tanWave*1.5, tanWave*1.5);

  vec4 texColor1 = texture2D(texture1, mod(uv - distort2, 1.0));
  vec4 texColor2 = texture2D(texture2, mod(uv - distort2, 1.0));
  vec4 texColor3 = texture2D(texture3, mod(uv - distort3, 1.0));

  // colors
  gl_FragColor = texColor2 + texColor3 + texColor1;
}