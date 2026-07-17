"use client";

import { Group } from "three";
import { useGLTF } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";

interface Model3DProps {
  path: string;

  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];

  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function Model3D({ 
    path, 
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    autoRotate= false, 
    rotationSpeed = 0.5, 

}: Model3DProps) {

    const group = useRef<Group>(null);
    const { scene, animations } = useGLTF(path);
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (!animations.length) return;

            Object.values(actions).forEach((action) => {
                action?.reset().fadeIn(0.4).play();
            });

            return () => {
                Object.values(actions).forEach((action) => action?.stop());
            };
    }, [actions, animations]);

    useFrame((_, delta) => {
        if (!group.current) return;

        if (autoRotate) {
            group.current.rotation.y += delta * rotationSpeed;
        }
    });

    return (
    <group
        ref={group}
        position={position}
        rotation={rotation}
        scale={scale}
    >
        <primitive
        object={clonedScene}
        scale={1.5}
        rotation={[0, 0, 0]}        
        />
    </group>
    );
}