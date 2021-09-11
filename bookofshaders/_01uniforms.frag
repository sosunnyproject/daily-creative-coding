// Author: sosunny
// Title: chapter: uniforms https://thebookofshaders.com/03/
// where is (1.0, 0.0) or (0.5, 0.5) or (0.0, 1.0) in canvas?
// how to use u_mouse, which is not yet normalized values?
// can you change colors with u_time or u_mouse values?
// what value does gl_fragcoord hold? https://titanwolf.org/Network/Articles/Article?AID=4615560b-18f4-4ee5-85f0-e06d45cd7cb5#gsc.tab=0

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // canvas size (width, height) in pixels
uniform vec2 u_mouse; // mouse position in screen pixels
uniform float u_time;

void main() {
    // vec2 norm = gl_FragCoord.xy/u_resolution.xy;
    // norm.x *= u_resolution.x/u_resolution.y;
    
    vec2 norm = gl_FragCoord.xy / u_mouse.xy;
    norm.x *= u_mouse.x / u_resolution.y;

    vec3 color = vec3(0.);
    color = vec3(norm.x, norm.y, abs(tan(u_time)));  // rgb

    gl_FragColor = vec4(color,1.0); // rgba
}