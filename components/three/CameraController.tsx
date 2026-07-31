"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Quaternion, Vector3 } from "three";
import { useRef } from "react";
import { cameraTarget } from "./CameraTarget";

const worldPosition = new Vector3();
const worldQuaternion = new Quaternion();

export default function CameraController() {
    const { camera } = useThree();

    const ready = useRef(false);

    useFrame(() => {
        const target = cameraTarget.current;

        if (!target) return;

        target.updateMatrixWorld(true);

        if (!ready.current) {
            ready.current = true;
            return;
        }

        target.getWorldPosition(worldPosition);
        camera.position.lerp(worldPosition, 0.05);

        target.getWorldQuaternion(worldQuaternion);
        camera.quaternion.slerp(worldQuaternion, 0.05);

        if ("fov" in camera) {
            camera.fov = MathUtils.lerp(camera.fov, target.fov, 0.05);
            camera.updateProjectionMatrix();
        }
    });

    return null;
}