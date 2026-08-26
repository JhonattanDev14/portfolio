"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const POINTS = 100;

export default function AudioWave({
  position = [0, 2.5, -4],
}: {
  position?: [number, number, number];
}) {
  const lineRef = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points = [];

    for (let i = 0; i < POINTS; i++) {
      const x = (i / (POINTS - 1) - 0.5) * 12;

      points.push(new THREE.Vector3(x, 0, 0));
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  useFrame(({ clock }) => {
    const position = geometry.attributes.position;

    for (let i = 0; i < POINTS; i++) {
      const x = position.getX(i);

      const wave =
        Math.sin(x * 1.2 + clock.elapsedTime * 1.5) * 0.15 +
        Math.sin(x * 2.4 + clock.elapsedTime * 1.1) * 0.08;

      position.setY(i, wave);
    }

    position.needsUpdate = true;
  });

  return (
    <line ref={lineRef} geometry={geometry} position={position}>
      <lineBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.7}
      />
    </line>
  );
}