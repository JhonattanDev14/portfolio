"use client";

import { useCallback, useEffect, useState } from "react";
import Model3D from "./Model3D";
import type { SceneModel } from "./data/Models";
import { applyShadowEffects } from "./ShadowEffects";
import type { Group } from "three";

export default function AnimatedModel({
    path,
    delay = 0,
    animationSpeed = 1,
    shadows = false,
}: SceneModel) {

    const [visible, setVisible] = useState(delay === 0);

    const handleSceneLoad = useCallback((scene: Group) => {
        applyShadowEffects(scene, shadows);
    }, [shadows]);

    useEffect(() => {

        if (delay === 0) return;

        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);

        return () => clearTimeout(timer);

    }, [delay]);


    if (!visible) return null;


    return (
        <Model3D
            path={path}
            animationSpeed={animationSpeed}
            onSceneLoad={handleSceneLoad}
        />
    );
}
