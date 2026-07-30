import { ScrollControls, Environment } from "@react-three/drei";
import { Fog } from "three";
import { Camera, Lights, Particles, Model3D, Effects, ScrollRig, CameraRig, SceneManager} from ".";

export default function SceneContent() {

  return (
    <>
        {/* <fog attach="fog" args={["#4CC9FF", 2, 12]} /> */}
        <ScrollControls pages={3} damping={0.15}>

            <Camera />
            <ScrollRig />
            <SceneManager />
            <CameraRig />

            <Lights />
            <Environment
                preset="forest"
                environmentIntensity={0.02}
            />
            {/* <Particles /> */}
            <Model3D
            path="/models/Escene.glb"
            position={[-1, 2, 0]}
            // scale={1}
            rotation={[0.1,0.4,0]}
            // autoRotate 
            // rotationSpeed={0.5}
            />
            {/* <Effects /> */}
        </ScrollControls>
    </>
  );
}