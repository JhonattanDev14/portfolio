import { ShaderMaterial, Vector2, Vector3 } from "three";

export function createParticleMaterial() {
  return new ShaderMaterial({
    transparent: true,
    

    uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vector2() },

        // Posición del logo.
        uLightPosition: { value: new Vector3() },
    },

    vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {

        // Envía la normal al Fragment Shader.
        vNormal = normalize(normalMatrix * normal);

        vec4 mvPosition =
            modelViewMatrix *
            instanceMatrix *
            vec4(position, 1.0);

        vViewPosition = -mvPosition.xyz;

        vec4 worldPosition =
            instanceMatrix *
            vec4(position, 1.0);

        vWorldPosition = worldPosition.xyz;

        gl_Position =
            projectionMatrix *
            mvPosition;

    }
`,

   fragmentShader: `
    varying vec3 vNormal;

    uniform vec3 uLightPosition;

    varying vec3 vWorldPosition;

    varying vec3 vViewPosition;

    void main() {

        // Dirección de la luz.
        // Dirección hacia el logo.
        vec3 lightDir = normalize(uLightPosition - vWorldPosition);

        // Intensidad de la luz.
        float diffuse = max(dot(normalize(vNormal), lightDir), 0.0);

        // Dirección hacia la cámara.
        vec3 viewDir = normalize(vViewPosition);

        // Fresnel.
        float fresnel = pow(
            1.0 - max(dot(normalize(vNormal), viewDir), 0.0),
            2.5
        );

        // Aumenta el contraste del degradado.
        diffuse = pow(diffuse, 0.2);

        vec3 dark = vec3(0.0, 0.0, 0.0);
        vec3 deep = vec3(0.0, 0.05, 0.10);
        vec3 mid = vec3(0.0, 0.35, 0.60);
        vec3 light = vec3(0.0, 0.85, 0.95);
        vec3 glow = vec3(0.75, 1.0, 1.0);

        vec3 color = mix(dark, deep, smoothstep(0.0, 0.15, diffuse));

        color = mix(color, mid, smoothstep(0.15, 0.45, diffuse));

        color = mix(color, light, smoothstep(0.45, 0.80, diffuse));

        color = mix(color, glow, smoothstep(0.80, 1.0, diffuse));

        // Da volumen a la parte trasera.
        color += deep * fresnel * 0.35;

        // Brillo principal.
        color += glow * pow(diffuse, 12.0) * 0.25;

        gl_FragColor = vec4(color, 1.0);

    }
`,
  });
}