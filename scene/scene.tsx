"use client";

import { Canvas } from "@react-three/fiber";
import Camera from "./camera";
import Lights from "./lights";

export default function Scene() {
  return (
    <Canvas>
        <Camera />
        <Lights />
        <mesh position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial
                color="blue"
                metalness={0}
                roughness={0}
            />
        </mesh>
    </Canvas>
  );
}