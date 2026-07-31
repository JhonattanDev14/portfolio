"use client";

import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";
import { useState } from "react";
import Preloader from "@/components/ui/preloader/preloader";

export default function Scene() {

  const [ready, setReady] = useState(false);

  return (
    <>
      <Canvas
        className="w-full h-screen"
      >
        <SceneContent ready={ready} />
      </Canvas>

      {!ready && (
        <Preloader
          timer={3000}
          onFinish={() => setReady(true)}
        />
      )}
    </>
  );
}