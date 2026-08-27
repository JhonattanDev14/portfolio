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
import { Group } from "three";
import Navigation from "./Navigation";

export default function SceneContent({
  ready,
  analyserRef,
}: {
  ready: boolean;
  analyserRef: React.RefObject<AnalyserNode | null>;
}) {

  const [showObjects, setShowObjects] = useState(false);
  const [audioWaveScene, setAudioWaveScene] = useState<Group | null>(null);

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
            moveSpeed={0.09}
            rotationSpeed={0.9}
            zoomSpeed={0.01}
            endDistance={0.001}
            onCameraAnimationEnd={() => {
              setShowObjects(true);
            }}
          />
        )}

        <ScrollRig />
        <SceneManager />
        <Lights />

        <Suspense fallback={null}>
          <Model3D path="/models/Escene-opt.glb" />
          <Model3D
            path="/models/AudioWaves.glb"
            onSceneLoad={setAudioWaveScene}
          />
          <Navigation />
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