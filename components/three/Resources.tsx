"use client";

import { useEffect, useState } from "react";
import { useGLTF, useProgress } from "@react-three/drei";
import { sceneModels } from "./data/Models";

interface ResourcesProps {
  onLoaded: () => void;
}

export default function Resources({
  onLoaded,
}: ResourcesProps) {
  const { active } = useProgress();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    sceneModels.forEach((model) => {
      useGLTF.preload(model.path);
    });

    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (active) return;

    onLoaded();
  }, [active, started, onLoaded]);

  return null;
}