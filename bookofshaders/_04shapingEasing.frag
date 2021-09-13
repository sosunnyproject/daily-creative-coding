// Author: Inigo Quiles
// Title: Expo
// https://easings.net/#easeInOutQuint
// https://thebookofshaders.com/05/

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float easeoutcubic(float x) {
  float t = 1.0 - pow(1.0 - x, 3.0);
  // t = clamp(t, 0.0, 1.0);
  return t;
}

float easeInoutQuint(float x) {
    float t = x;
    if(x < 0.5) {
    	t = 16.0*x*x*x*x*x;
    } else {
        t = 1.0 - pow( -2.0 * x + 2.0, 5.0) / 2.0;
    }
    
    return t;
}

float plot(vec2 st, float pct){
  return smoothstep( pct-0.02, pct, st.y) - smoothstep(pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // pow(st.x,5.0);
    // easeoutcubic(st.x);
    float y = easeInoutQuint(st.x); 

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
