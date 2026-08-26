"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Quaternion, Vector3 } from "three";
import { useRef } from "react";
import { cameraTarget } from "./CameraTarget";

const worldPosition = new Vector3();
const worldQuaternion = new Quaternion();

export default function CameraController({onCameraAnimationEnd,}:{ onCameraAnimationEnd? : () => void; }) {
    const { camera } = useThree();

    const ready = useRef(false);

    const animationEnded = useRef(false);

    useFrame(() => {
        // Get camera coordinates from scene
        const target = cameraTarget.current;

        if (!target) return;
        
        // Update the matrix to get data now
        target.updateMatrixWorld(true);

        if (!ready.current) {
            ready.current = true;
            return;
        }
        // Move the camera smootly
        target.getWorldPosition(worldPosition);
        camera.position.lerp(worldPosition, 0.05);

        // Rotate the camera slowly 
        target.getWorldQuaternion(worldQuaternion);
        camera.quaternion.slerp(worldQuaternion, 0.05);
        
        // Get camera position
        const distance = camera.position.distanceTo(worldPosition);

        // Active once camera animations ends
        if (!animationEnded.current && distance < 0.001) {
            animationEnded.current = true;
            onCameraAnimationEnd?.();
        }

        // zoom of the camera 
        if ("fov" in camera) {
            camera.fov = MathUtils.lerp(camera.fov, target.fov, 0.01);
            camera.updateProjectionMatrix();
        }
    });

    return null;
}