"use client";

import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";
import { useCallback, useState } from "react";
import Preloader from "@/components/ui/preloader/preloader";
import Resources from "./Resources";
import MusicPlayer from "@/components/ui/musicPlayer/musicPlayer";
import MusicBackground from "@/components/ui/musicBackground/musicBackground";
import { OrbitControls } from "@react-three/drei";


export default function Scene() {
  const [ready, setReady] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  const handleResourcesLoaded = useCallback(() => {
    setResourcesLoaded(true);
  }, []);

  return (
    <>
      <MusicBackground />
      <Canvas className="relative z-10 h-screen w-full">
        {/* <OrbitControls /> */}
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
      {ready && <MusicPlayer enabled={ready} />}
    </>
  );
}