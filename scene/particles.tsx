"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";

const COUNT = 5000;

export default function Particles() {
  const meshRef = useRef<InstancedMesh>(null);

  const dummy = useMemo(() => new Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, () => {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 15;

      return {
        // Posición original
        x,
        y,
        z,

        // Posición actual (la usaremos para la inercia)
        currentX: x,
        currentY: y,

        offset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      };
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, index) => {
      dummy.position.set(
        particle.currentX,
        particle.currentY,
        particle.z
      );

      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, particles]);

  useFrame((state) => {
  if (!meshRef.current) return;

  const time = state.clock.getElapsedTime();

  const mouseX = state.pointer.x * 8;
  const mouseY = state.pointer.y * 4;

  particles.forEach((particle, index) => {

    // Posición objetivo (flotación)
    let targetX =
      particle.x +
      Math.sin(time * particle.speed + particle.offset) * 0.04;

    let targetY =
      particle.y +
      Math.cos(time * particle.speed + particle.offset) * 0.04;

    // Distancia al mouse
    const dx = targetX - mouseX;
    const dy = targetY - mouseY;

    const distance = Math.max(
      Math.sqrt(dx * dx + dy * dy),
      0.001
    );

    const radius = 2;

    if (distance < radius) {
      const force = (radius - distance) / radius;

      targetX += (dx / distance) * force * 0.8;
      targetY += (dy / distance) * force * 0.8;
    }

    // Aquí está la magia
    particle.currentX += (targetX - particle.currentX) * 0.08;
    particle.currentY += (targetY - particle.currentY) * 0.08;

    dummy.position.set(
      particle.currentX,
      particle.currentY,
      particle.z
    );

    dummy.updateMatrix();

    meshRef.current!.setMatrixAt(index, dummy.matrix);
  });

  meshRef.current.instanceMatrix.needsUpdate = true;
});
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial
        color="#A7F3FF"
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </instancedMesh>
  );
}