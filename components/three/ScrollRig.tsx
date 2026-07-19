"use client";

import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSceneStore } from "@/components/store/sceneStore";

export default function ScrollRig() {
  const scroll = useScroll();
  const setScroll = useSceneStore((state) => state.setScroll);

  useFrame(() => {
    setScroll(scroll.offset);
  });

  return null;
}