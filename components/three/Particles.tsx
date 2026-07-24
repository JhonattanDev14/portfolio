"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { createParticleMaterial } from "./particleMaterial";
import { textToPoints } from "@/utils/TextToPoints";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: any;
    }
  }
}

export default function Particles() {

  const { size } = useThree();

  const globalScale = useMemo(() => {
    return Math.min(size.width / 1920, 1.5);
  }, [size.width]);

  const COUNT = 5000;

  const meshRef = useRef<InstancedMesh>(null);

  // Objeto auxiliar para actualizar cada instancia.
  const dummy = useMemo(() => new Object3D(), []);

  // Material de las partículas.
  const material = useMemo(createParticleMaterial, []);

  // Indica si las partículas forman una figura.
  const forming = useRef(true);

  // texto con particulas
  useEffect(() => {
    const timer = setTimeout(() => {
      forming.current = true;
    }, 10000);
    return () => clearTimeout(timer);
  }, []);


    const tmxPoints = useMemo(
      () =>
        textToPoints("Jhonattan", 2000, {
          scale: 0.009,
          offsetX: 0,
          offsetY: 0,
        }),
      []
    );

    const developerPoints = useMemo(
      () =>
        textToPoints("Developerfdfsdfsdfdsfsdf", 2000, {
          scale: 0.009,
          offsetX: 0,
          offsetY: 1,
        }),
      []
    );


  // Crea todas las partículas una única vez.
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, (_,index) => {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 15;

      return {
        // Posición inicial.
        x,
        y,
        z,

        // Posición actual.
        currentX: x,
        currentY: y,
        currentZ: z,

        // Movimiento flotante.
        offset: Math.random() * Math.PI * 2,

        speed: 0.2 + Math.random() * 0.005,
      };
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    material.uniforms.uTime.value = time;

    // Posición temporal del logo.
    material.uniforms.uLightPosition.value.set(0, 0, 0);

    particles.forEach((particle, index) => {
      let targetX: number;
      let targetY: number;

    if (
  forming.current &&
  index < tmxPoints.points.length + developerPoints.points.length
      ) {

        let point;
        let scale = 1;

        if (index < tmxPoints.points.length) {
          point = tmxPoints.points[index];
          scale = 0.7;
        } else {
          point =
            developerPoints.points[
              index - tmxPoints.points.length
            ];
          scale = 0.7;
        }

        targetX = point.x * scale * globalScale;
        targetY =
          point.y * scale * globalScale +
          (index < tmxPoints.points.length ? 1.2 : -1.8);

      } else {

        // Las demás siguen flotando.
        targetX =
          particle.x +
          Math.sin(
            time * particle.speed +
            particle.offset
          ) * -0.7;

        targetY =
          particle.y +
          Math.cos(
            time * particle.speed +
            particle.offset
          ) * -0.5;

      }

      // Suaviza el movimiento.
      particle.currentX += (targetX - particle.currentX) * 0.05;
      particle.currentY += (targetY - particle.currentY) * 0.05;

      const targetZ =
        forming.current &&
        index < tmxPoints.points.length + developerPoints.points.length
          ? 0
          : particle.z;

      particle.currentZ +=
        (targetZ - particle.currentZ) * 0.05;

      // Actualiza la posición de la instancia.
      dummy.position.set(
        particle.currentX,
        particle.currentY,
        particle.currentZ
      );

      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(index, dummy.matrix);
    });

    // Envía las nuevas posiciones a la GPU.
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.01, 6, 6]} />

      {/* Temporal. Será reemplazado por ShaderMaterial. */}
      <primitive object={material} attach="material" />
    </instancedMesh>
  );
}