import { ShaderMaterial, Vector2, Vector3 } from "three";

export function createPointsMaterial() {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,

    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new Vector2() },

      // Posición del logo para iluminación
      uLightPosition: { value: new Vector3() },
    },

    vertexShader: `

    uniform float uTime;

    varying vec3 vWorldPosition;

    void main() {

        vec4 worldPosition =
            modelMatrix *
            vec4(position, 1.0);

        vWorldPosition = worldPosition.xyz;


        vec4 mvPosition =
            modelViewMatrix *
            vec4(position, 1.0);


        gl_PointSize =
            8.0 *
            (1.0 / -mvPosition.z);


        gl_Position =
            projectionMatrix *
            mvPosition;
    }

    `,


    fragmentShader: `

    uniform vec3 uLightPosition;

    varying vec3 vWorldPosition;


    void main() {


        // Forma circular del punto
        vec2 center = gl_PointCoord - 0.5;

        float dist = length(center);


        if(dist > 0.5){
            discard;
        }


        // Luz hacia el logo
        float light =
            1.0 -
            distance(
                vWorldPosition,
                uLightPosition
            ) * 0.15;


        light = clamp(light,0.2,1.0);



        vec3 dark =
            vec3(0.0,0.05,0.10);

        vec3 mid =
            vec3(0.0,0.35,0.60);

        vec3 glow =
            vec3(0.75,1.0,1.0);



        vec3 color =
            mix(
                dark,
                mid,
                light
            );


        color =
            mix(
                color,
                glow,
                pow(light,4.0)
            );


        float alpha =
            1.0 - smoothstep(
                0.35,
                0.5,
                dist
            );


        gl_FragColor =
            vec4(
                color,
                alpha
            );

    }

    `,
  });
}