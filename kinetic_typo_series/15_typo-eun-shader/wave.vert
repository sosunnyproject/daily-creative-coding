  
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