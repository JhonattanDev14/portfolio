"use client";

import { Canvas } from "@react-three/fiber";
import { Camera, Lights, Particles, Model3D } from ".";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas className="w-full h-screen">
      <Camera />
      <Lights />
      <Particles />
      <Model3D
        path="/models/logo.glb"
        position={[0, 0, 0]}
        scale={1}
        rotation={[-Math.PI /2, 0, 0]}
    />
    <OrbitControls />
    </Canvas>
  );
}