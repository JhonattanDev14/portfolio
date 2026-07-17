"use client";

import { Canvas } from "@react-three/fiber";
import { Fog } from "three";
import { Camera, Lights, Particles, Model3D, Effects } from ".";

export default function Scene() {
  return (
    <Canvas className="w-full h-screen">
      <fog attach="fog" args={["#4CC9FF", 2, 12]} />
      <Camera />
      <Lights />
      <Particles />
      <Model3D
        path="/models/logo.glb"
        position={[0, 0, 0]}
        scale={1}
        rotation={[0,0,0]}
        autoRotate
        rotationSpeed={0.5}
    />
    <Effects />
    </Canvas>
  );
}