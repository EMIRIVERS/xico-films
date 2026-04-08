uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseRadius;
uniform vec3 uDeepColor;
uniform vec3 uSurfaceColor;
uniform vec3 uCausticColor;

varying vec2 vUv;
varying float vElevation;
varying float vDistToMouse;

// Simplex noise (repeated for fragment)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                           + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                           dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // Base water color from elevation
  float depthFactor = smoothstep(-0.08, 0.08, vElevation);
  vec3 color = mix(uDeepColor, uSurfaceColor, depthFactor);

  // Caustics
  float caustic1 = snoise(vUv * 15.0 + uTime * 0.4);
  float caustic2 = snoise(vUv * 25.0 - uTime * 0.6);
  float caustics = smoothstep(0.3, 0.8, caustic1 * caustic2 + 0.5);
  color += uCausticColor * caustics * 0.15;

  // Mouse glow — reveal area
  float mouseGlow = smoothstep(uMouseRadius + 0.1, 0.0, vDistToMouse);
  color += vec3(0.05, 0.08, 0.12) * mouseGlow;

  // Subtle specular highlights on wave crests
  float spec = smoothstep(0.02, 0.06, vElevation);
  color += vec3(0.15, 0.18, 0.22) * spec * 0.3;

  // Edge fade
  float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x)
                 * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);

  gl_FragColor = vec4(color * edgeFade, 0.95);
}
