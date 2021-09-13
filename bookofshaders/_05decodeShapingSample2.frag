// Author:
// Title:
// https://www.shadertoy.com/view/XsXXDn

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st -= 0.5; //move to center
    //st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    //color = vec3(st.x,st.y,abs(sin(u_time)));
	float l, z = u_time;
    for(int i = 0; i < 3; i++) {  // i is for color - rgb
        vec2 p = st; // canvas 
        vec2 uv = p;
        // p -= 5.0; 
        // p.x *= u_resolution.x / u_resolution.y;
        z += abs(sin(u_time))*0.09; // increment
        l = length(p);  // length of vector
        float speed = z * 4.024; // optional
        float divideGrid = 6.976;
        float spread = abs(sin(l * divideGrid - speed)); // ripple effects
        float inouteffect = sin(z) + 17.048; // optional, 1.0 keeps the value greaterThan 0

        uv += inouteffect * spread * p / l;  // changing value
        // uv and p are both vec2, whil other params are float
        // divide over p splits the canvas to 4 grids
		
        float reversebrightness = 0.028;
        vec2 dist = mod(uv, 5.0) - 2.5 ; // min: -5.0, max: 5.0 
        // mod: positive, second param: size of canvas, subtracting value determines the center position
        
        vec2 dist1 = tan(uv) + sin(u_time); // as one circle
        color[i] = reversebrightness / length(dist1);  // 0 ~ 5.0
        // division: reverse brightness
    }
    gl_FragColor = vec4(color/l, u_time);
}