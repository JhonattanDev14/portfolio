"use client";

import { Canvas } from "@react-three/fiber";
import Camera from "./camera";
import Lights from "./lights";
import Particles from "./particles";

export default function Scene() {
  return (
    <Canvas className="w-full h-screen">
      <Camera />
      <Lights />
      <Particles />
    </Canvas>
  );
}