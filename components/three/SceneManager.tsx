"use client";

import { useFrame } from "@react-three/fiber";
import { useSceneStore } from "@/components/store/sceneStore";

export default function SceneManager() {
  const scroll = useSceneStore((state) => state.scroll);
  const setSection = useSceneStore((state) => state.setSection);

  useFrame(() => {
    if (scroll < 0.25) setSection(0);
    else if (scroll < 0.5) setSection(1);
    else if (scroll < 0.75) setSection(2);
    else setSection(3);
  });

  return null;
}