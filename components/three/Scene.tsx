"use client";

import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";
import { useCallback, useState } from "react";
import Preloader from "@/components/ui/preloader/preloader";
import Resources from "./Resources";

export default function Scene() {
  const [ready, setReady] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  const handleResourcesLoaded = useCallback(() => {
    setResourcesLoaded(true);
  }, []);

  return (
    <>
      <Canvas className="w-full h-screen">
        <Resources onLoaded={handleResourcesLoaded} />

        <SceneContent ready={ready} />
      </Canvas>

      {!ready && (
        <Preloader
          timer={3000}
          resourcesLoaded={resourcesLoaded}
          onFinish={() => setReady(true)}
        />
      )}
    </>
  );
}