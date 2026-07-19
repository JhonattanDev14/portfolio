"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useSceneStore } from "@/components/store/sceneStore";

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useSceneStore((state) => state.scroll);

  useFrame(() => {
    const progress = Math.min(scroll / 0.05, 1);
    const targetZ = 5 - progress * 8;

    camera.position.z += (targetZ - camera.position.z) * 0.2;

    camera.lookAt(0, 0, 0);
  });

  return null;
}