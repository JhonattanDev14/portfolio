import { ScrollControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Fog } from "three";
import { Lights, Model3D, ScrollRig, SceneManager, CameraController} from ".";
import { Suspense } from "react";

export default function SceneContent({ ready }: { ready: boolean }) {
  return (
    <>
        <ScrollControls pages={3} damping={0.15}>
            <PerspectiveCamera
                makeDefault
                position={[0, 1, 5]}
                fov={45}
            />

            {ready && <CameraController />}

            <ScrollRig />
            <SceneManager />

            <Lights />
            <Environment
                preset="forest"
                environmentIntensity={0.02}
            />

            <Suspense fallback={null}>
              <Model3D path="/models/Escene-meshopt.glb" />
            </Suspense>
            
        </ScrollControls>
    </>
  );
}