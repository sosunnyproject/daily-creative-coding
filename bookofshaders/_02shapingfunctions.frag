// Author: Inigo Quiles
// Title: Parabola

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float parabola( float x, float k ){
    return pow( 2.160*x*(1.032-x), k );
}

float plot(vec2 st, float pct, vec2 mouse){
  return  smoothstep(pct-0.212, pct, st.y) -
          smoothstep( pct, pct+0.032, fract(u_time*0.4)*st.y );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 m = u_mouse/u_resolution;
    
    float y = parabola(st.x,1.136);

    vec3 color = vec3(y);

    float pct = plot(st,y, m);
    color = pct*vec3(1.000,0.811,0.912);

    gl_FragColor = vec4(color,0.704);
}
