"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { textToPoints } from "@/utils/TextToPoints";

const COUNT = 10000;

export default function Particles() {
  const meshRef = useRef<InstancedMesh>(null);

  const dummy = useMemo(() => new Object3D(), []);

  const forming = useRef(false);

  const particles = useMemo(() => {
    
    return Array.from({ length: COUNT }, () => {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 15;
      
      return {

        vx: 0,
        vy: 0,

        // Posición original
        x,
        y,
        z,

        // Posición actual (la usaremos para la inercia)
        currentX: x,
        currentY: y,

        // Poscion Objetivo
        targetX: x,
        targetY: y,
        targetZ: z,
        
        offset: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.005,
      };
    });
  }, []);

  // useEffect(() => {
  //   if (!meshRef.current) return;

  //   const points = textToPoints("Developer", COUNT);

  //   console.log("Puntos:", points.length);
  //   console.log(points.slice(0, 10));

  //   forming.current = true;

  //   particles.forEach((particle, index) => {

  //     if (index < points.length) {
  //       particle.targetX = points[index].x;
  //       particle.targetY = points[index].y;
  //     }

  // });

  //   particles.forEach((particle, index) => {
  //     dummy.position.set(
  //       particle.currentX,
  //       particle.currentY,
  //       particle.z
  //     );

  //     dummy.updateMatrix();

  //     meshRef.current!.setMatrixAt(index, dummy.matrix);
  //   });

  //   meshRef.current.instanceMatrix.needsUpdate = true;
  // }, [dummy, particles]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();


    const mouseX = state.pointer.x * 8;
    const mouseY = state.pointer.y * 4;

    particles.forEach((particle, index) => {

      let targetX: number;
      let targetY: number;

      if (forming.current) {
        targetX = particle.targetX;
        targetY = particle.targetY;
      } else {
        targetX =
          particle.x +
          Math.sin(time * particle.speed + particle.offset) * -0.7;

        targetY =
          particle.y +
          Math.cos(time * particle.speed + particle.offset) * -0.5;
      }


      // Aquí está la magia
      particle.currentX += (targetX - particle.currentX) * 0.05;
      particle.currentY += (targetY - particle.currentY) * 0.05;

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
      <sphereGeometry args={[0.01, 6, 6]} />
      <meshBasicMaterial
        color="#A7F3FF"
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </instancedMesh>
  );
}