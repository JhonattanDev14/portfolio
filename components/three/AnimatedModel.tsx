"use client";

import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { gsap } from "gsap";
import Model3D from "./Model3D";
import type { SceneModel } from "./data/Models";

export default function AnimatedModel({
    path,
    delay = 0,
    animation,
}: SceneModel) {

    const groupRef = useRef<Group>(null);

    const [visible, setVisible] = useState(delay === 0);


    useEffect(() => {

        if (delay === 0) return;

        const timer = setTimeout(() => {
            setVisible(true);
        }, delay);

        return () => clearTimeout(timer);

    }, [delay]);


    useEffect(() => {

        if (!visible) return;
        if (!groupRef.current) return;


        const group = groupRef.current;

        const from = animation?.from;


        group.position.set(
            from?.x ?? 0,
            from?.y ?? 0,
            from?.z ?? 0
        );


        const scale = from?.scale ?? 1;

        group.scale.set(
            scale,
            scale,
            scale
        );


        const duration = animation?.duration ?? 1.5;

        const ease = animation?.ease ?? "power3.out";


        const timeline = gsap.timeline();


        timeline.to(
            group.position,
            {
                x: 0,
                y: 0,
                z: 0,
                duration,
                ease,
            },
            0
        );


        timeline.to(
            group.scale,
            {
                x: 1,
                y: 1,
                z: 1,
                duration,
                ease,
            },
            0
        );


        return () => {

            timeline.kill();

        };

    }, [
        visible,
        animation,
    ]);


    if (!visible) return null;


    return (
        <group ref={groupRef}>

            <Model3D
                path={path}
            />

        </group>
    );
}