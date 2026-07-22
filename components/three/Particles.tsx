"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { createParticleMaterial } from "./particleMaterial";
import { textToPoints } from "@/utils/TextToPoints";

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
      textToPoints(
        "TMX",
        1200,
        {
          scale: 0.005,
          offsetX: 0,
          offsetY: 0,
        }
      ),
    []
  );

  const developerPoints = useMemo(
    () =>
      textToPoints(
        "Developer",
        2200,
        {
          scale: 0.008,
          offsetX: 0,
          offsetY: 0.5,
        }
      ),
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

        // Destino de la partícula.
        targetX:
          index < tmxPoints.length
            ? tmxPoints[index].x
            : index < tmxPoints.length + developerPoints.length
            ? developerPoints[index - tmxPoints.length].x
            : x,

        targetY:
          index < tmxPoints.length
            ? tmxPoints[index].y + 1.2
            : index < tmxPoints.length + developerPoints.length
            ? developerPoints[index - tmxPoints.length].y - 1.8
            : y,

        // Profundidad de las letras.
        targetZ:
          index < tmxPoints.length + developerPoints.length
            ? (Math.random() - 0.5) * 0.08
            : z,

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
  index < tmxPoints.length + developerPoints.length
      ) {

        // Solo las partículas del texto forman las palabras.
        targetX = particle.targetX;
        targetY = particle.targetY;

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
        index < tmxPoints.length + developerPoints.length
          ? particle.targetZ
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