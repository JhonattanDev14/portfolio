"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { createParticleMaterial } from "./particleMaterial";

const COUNT = 10000;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      particleMaterial: any;
    }
  }
}

export default function Particles() {
  const meshRef = useRef<InstancedMesh>(null);

  // Objeto auxiliar para actualizar cada instancia.
  const dummy = useMemo(() => new Object3D(), []);

  // Material de las partículas.
  const material = useMemo(createParticleMaterial, []);

  // Indica si las partículas forman una figura.
  const forming = useRef(false);

  // Crea todas las partículas una única vez.
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, () => {
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

        // Destino de la partícula.
        targetX: x,
        targetY: y,
        targetZ: z,

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

      if (forming.current) {
        // Mover hacia la figura.
        targetX = particle.targetX;
        targetY = particle.targetY;
      } else {
        // Movimiento libre.
        targetX =
          particle.x +
          Math.sin(time * particle.speed + particle.offset) * -0.7;

        targetY =
          particle.y +
          Math.cos(time * particle.speed + particle.offset) * -0.5;
      }

      // Suaviza el movimiento.
      particle.currentX += (targetX - particle.currentX) * 0.05;
      particle.currentY += (targetY - particle.currentY) * 0.05;

      // Actualiza la posición de la instancia.
      dummy.position.set(
        particle.currentX,
        particle.currentY,
        particle.z
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