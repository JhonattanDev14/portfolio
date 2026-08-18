"use client";

import { useEffect, useState } from "react";
import { Model3D, Effects } from "@/components/three";
import { Canvas } from "@react-three/fiber";

interface Props {
  onFinish: () => void;
  timer?: number;
  resourcesLoaded: boolean;
}

export default function Preloader({
  onFinish,
  timer = 7000,
  resourcesLoaded,
}: Props) {

  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!resourcesLoaded) return;

      onFinish();

      setTimeout(() => {
        setHide(true);
      }, 50);
    }, timer);

    return () => clearTimeout(timeout);
  }, [onFinish, timer, resourcesLoaded]);


  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${
        hide ? "opacity-0" : "opacity-100"
      }`}
    >

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>

        <ambientLight intensity={0.2} />

        <pointLight 
          position={[3, 3, 3]} 
          intensity={30} 
        />

        <Model3D
          path="/models/Logo.glb"
          autoRotate
          rotationSpeed={0.9}
        />

        <Effects />

      </Canvas>

    </div>
  );
}