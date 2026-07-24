import { ScrollControls } from "@react-three/drei";
import { Fog } from "three";
import { Camera, Lights, Particles, Model3D, Effects, ScrollRig, CameraRig, SceneManager} from ".";

export default function SceneContent() {

  return (
    <>
        <fog attach="fog" args={["#4CC9FF", 2, 12]} />
        <ScrollControls pages={3} damping={0.15}>

            <Camera />
            <ScrollRig />
            <SceneManager />
            <CameraRig />

            <Lights />
            <Particles />
            <Model3D
            path="/models/Logo.glb"
            position={[0, 0, 0]}
            scale={1}
            rotation={[0,0,0]}
            autoRotate
            rotationSpeed={0.5}
            />
            <Effects />
        </ScrollControls>
    </>
  );
}