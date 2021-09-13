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
        vec2 p = st; 
        vec2 uv = p;
        // p -= 5.0; 
        p.x *= u_resolution.x / u_resolution.y;
        z += 0.03 + abs(sin(u_time))*0.09;
        l = length(p);
        uv += p/l*(sin(z)+ 1.0) * abs( sin(l * 9.0 - z * 2.0) );
        color[i] = 0.1 / length( abs(mod(uv, 1.) - 0.5) );
        
    }
    
    gl_FragColor = vec4(color/l, u_time);
}