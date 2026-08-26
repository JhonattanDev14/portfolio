import { ScrollControls, PerspectiveCamera } from "@react-three/drei";
import {
  Lights,
  Model3D,
  ScrollRig,
  SceneManager,
  CameraController,
} from ".";
import { Suspense, useState } from "react";
import { sceneModels } from "./data/Models";
import AnimatedModel from "./AnimatedModel";

export default function SceneContent({ ready }: { ready: boolean }) {
  const [showObjects, setShowObjects] = useState(false);

  return (
    <>
      <ScrollControls pages={3} damping={0.15}>
        <PerspectiveCamera
          makeDefault
          position={[0, 1, 5]}
          fov={45}
        />

        {ready && (
          <CameraController
            onCameraAnimationEnd={() => {
              console.log("La cámara terminó");
              setShowObjects(true);
            }}
          />
        )}

        <ScrollRig />
        <SceneManager />
        <Lights />

        <Suspense fallback={null}>
          <Model3D path="/models/Escene-opt.glb" />
          <Model3D path="/models/AudioWaves.glb" />
        </Suspense>

        {showObjects &&
          sceneModels.map((model) => (
            <AnimatedModel
              key={model.path}
              {...model}
            />
          ))}
      </ScrollControls>
    </>
  );
}