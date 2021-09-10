// https://thebookofshaders.com/06/

#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(
        abs(
        	mod(c.y*TWO_PI+ vec3(0.0,4.0,2.0),20.0)
                // 5.0+abs(cos(u_time/1.3))*50.0) 
            -5.0)
        -0.848,
        0.0,
        1.008 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(0.965,1.000,0.949), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.000);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.50,0.50)-st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter)*2.0;

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    color = hsb2rgb(vec3(
        (angle/TWO_PI), 
        radius,
        1.0));

    gl_FragColor = vec4(color,1.0);
}
