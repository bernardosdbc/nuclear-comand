// Shader toon/cel simples para estética low-poly
uniform vec3 uColor;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 lightDir = normalize(vec3(-0.5, 1.0, 0.3));
  float NdotL = max(dot(vNormal, lightDir), 0.0);
  
  float toon = 0.0;
  if (NdotL > 0.7) toon = 1.0;
  else if (NdotL > 0.35) toon = 0.6;
  else if (NdotL > 0.1) toon = 0.3;
  else toon = 0.1;
  
  vec3 color = uColor * toon;
  
  vec3 viewDir = normalize(-vWorldPosition);
  float rim = 1.0 - max(dot(vNormal, viewDir), 0.0);
  rim = pow(rim, 3.0);
  color += vec3(0.0, 1.0, 0.8) * rim * 0.15;
  
  float grid = 0.0;
  if (abs(vNormal.y) > 0.9) {
    float gx = abs(mod(vWorldPosition.x * 0.1, 1.0) - 0.5) * 2.0;
    float gz = abs(mod(vWorldPosition.z * 0.1, 1.0) - 0.5) * 2.0;
    grid = step(0.95, max(gx, gz)) * 0.1;
  }
  color += vec3(0.0, 0.8, 0.6) * grid;
  
  float fogFactor = smoothstep(30.0, 120.0, length(vWorldPosition));
  vec3 fogColor = vec3(0.04, 0.07, 0.2);
  color = mix(color, fogColor, fogFactor * 0.4);
  
  gl_FragColor = vec4(color, 1.0);
}