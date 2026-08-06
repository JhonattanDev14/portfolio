"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import Model3D from "./Model3D";

type AnimationConfig = {
    type: "fadeUp";
    from?: {
        x?: number;
        y?: number;
        z?: number;
        scale?: number;
        opacity?: number;
    };
    duration?: number;
};

type AnimatedModelProps = {
    model: {
        path: string;
        delay?: number;
        animation?: AnimationConfig;
    };
};

export default function AnimatedModel({
    model,
}: AnimatedModelProps) {
    const {
        path,
        delay = 0,
        animation,
    } = model;

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

        groupRef.current.position.x = animation?.from?.x ?? 0;
        groupRef.current.position.y = animation?.from?.y ?? 0;
        groupRef.current.position.z = animation?.from?.z ?? 0;

        const scale = animation?.from?.scale ?? 1;
        groupRef.current.scale.set(scale, scale, scale);

    }, [visible, animation]);

    useFrame(() => {
        if (!groupRef.current) return;

        if (animation?.type === "fadeUp") {
            groupRef.current.position.x +=
                (0 - groupRef.current.position.x) * 0.08;

            groupRef.current.position.y +=
                (0 - groupRef.current.position.y) * 0.08;

            groupRef.current.position.z +=
                (0 - groupRef.current.position.z) * 0.08;

            groupRef.current.scale.lerp(
                {
                    x: 1,
                    y: 1,
                    z: 1,
                } as any,
                0.08
            );
        }
    });

    if (!visible) return null;

    return (
        <group ref={groupRef}>
            <Model3D path={path} />
        </group>
    );
}