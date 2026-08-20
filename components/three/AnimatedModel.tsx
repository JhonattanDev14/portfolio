"use client";

import { useEffect, useState } from "react";
import Model3D from "./Model3D";
import type { SceneModel } from "./data/Models";

export default function AnimatedModel({
    path,
    delay = 0,
    animationSpeed = 1
}: SceneModel) {

    const [visible, setVisible] = useState(delay === 0);

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
        />
    );
}