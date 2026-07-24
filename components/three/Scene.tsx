"use client";

import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";

export default function Scene() {
  return (
    <Canvas className="w-full h-screen">
      <SceneContent />
    </Canvas>
  );
}