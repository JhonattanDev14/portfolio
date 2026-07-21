"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Points
} from "three";
import { createPointsMaterial } from "./PointsMaterial";

const COUNT = 10000;

export default function PointsParticles() {

  // Referencia al sistema de partículas.
  const pointsRef = useRef<Points>(null);

    // Material de las partículas.
    const material = useMemo(() => createPointsMaterial(), []);

  // Guarda la posición original y actual de cada partícula.
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
        currentZ: z,

        // Destino.
        targetX: x,
        targetY: y,
        targetZ: z,

        // Movimiento flotante.
        offset: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.4,

      };

    });

  }, []);

  // Crea la geometría una sola vez.
  const geometry = useMemo(() => {

    const geometry = new BufferGeometry();

    const positions = new Float32Array(COUNT * 3);

    particles.forEach((particle, index) => {

      positions[index * 3] = particle.currentX;
      positions[index * 3 + 1] = particle.currentY;
      positions[index * 3 + 2] = particle.currentZ;

    });

    geometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );

    geometry.computeBoundingSphere();

    return geometry;

  }, [particles]);

  useFrame((state) => {

    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();

    material.uniforms.uTime.value = time;
    material.uniforms.uLightPosition.value.set(0, 0, 0);

    const positions = geometry.attributes.position.array as Float32Array;

    particles.forEach((particle, index) => {

      // Movimiento flotante.
      particle.targetX =
        particle.x +
        Math.sin(time * particle.speed + particle.offset) * 0.7;

      particle.targetY =
        particle.y +
        Math.cos(time * particle.speed + particle.offset) * 0.5;

      // Inercia.
      particle.currentX +=
        (particle.targetX - particle.currentX) * 0.05;

      particle.currentY +=
        (particle.targetY - particle.currentY) * 0.05;

      // Actualiza el Buffer.
      positions[index * 3] = particle.currentX;
      positions[index * 3 + 1] = particle.currentY;
      positions[index * 3 + 2] = particle.currentZ;

    });

    geometry.attributes.position.needsUpdate = true;

  });

  return (

    <points ref={pointsRef} geometry={geometry}>
        <primitive object={material} attach="material" />
    </points>

  );

}