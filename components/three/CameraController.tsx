"use client";

import { useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  MathUtils,
  Quaternion,
  Vector3,
} from "three";
import { useRef } from "react";
import { gsap } from "gsap";
import {
  cameraTarget,
  mainCameraState,
  type CameraTarget,
} from "./CameraTarget";

const worldPosition = new Vector3();
const worldQuaternion = new Quaternion();

type CameraControllerProps = {
  onCameraAnimationEnd?: () => void;
  moveSpeed?: number;
  rotationSpeed?: number;
  zoomSpeed?: number;
  endDistance?: number;
};

export default function CameraController({
  onCameraAnimationEnd,
  moveSpeed = 0.05,
  rotationSpeed = 0.05,
  zoomSpeed = 0.01,
  endDistance = 0.001,
}: CameraControllerProps) {
  const { camera } = useThree();

  const ready = useRef(false);
  const animationEnded = useRef(false);

  const previousTarget = useRef<CameraTarget | null>(null);

  useFrame(() => {
    const target = cameraTarget.current;

    if (!target) return;

    const isMainCamera = target === mainCameraState;

    // --------------------------------------------------
    // Navigation between hotspots
    // --------------------------------------------------

    if (
      cameraTarget.transition &&
      target !== previousTarget.current
    ) {
      previousTarget.current = target;

      // ----------------------------------------------
      // Main camera
      // ----------------------------------------------

      if (isMainCamera) {
        worldPosition.copy(mainCameraState.position);
        worldQuaternion.copy(mainCameraState.quaternion);
      }

      // ----------------------------------------------
      // Blender / Three.js camera
      // ----------------------------------------------

      else if (target instanceof PerspectiveCamera) {
        target.updateMatrixWorld(true);

        target.getWorldPosition(worldPosition);
        target.getWorldQuaternion(worldQuaternion);
      }

      // Si por alguna razón el target no es válido,
      // no intentamos animar.
      else {
        return;
      }

      const transition = cameraTarget.transition;

      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(camera.quaternion);

      // ----------------------------------------------
      // Position
      // ----------------------------------------------

      gsap.to(camera.position, {
        x: worldPosition.x,
        y: worldPosition.y,
        z: worldPosition.z,
        duration: transition?.duration ?? 2,
        ease: transition?.ease ?? "power2.inOut",
      });

      // ----------------------------------------------
      // Rotation
      // ----------------------------------------------

      const quaternionProxy = {
        x: camera.quaternion.x,
        y: camera.quaternion.y,
        z: camera.quaternion.z,
        w: camera.quaternion.w,
      };

      gsap.to(quaternionProxy, {
        x: worldQuaternion.x,
        y: worldQuaternion.y,
        z: worldQuaternion.z,
        w: worldQuaternion.w,
        duration: transition?.rotationDuration ?? 4,
        ease: transition?.ease ?? "power2.inOut",

        onUpdate: () => {
          camera.quaternion.set(
            quaternionProxy.x,
            quaternionProxy.y,
            quaternionProxy.z,
            quaternionProxy.w
          );
        },
      });

      // ----------------------------------------------
      // FOV
      // ----------------------------------------------

      if (camera instanceof PerspectiveCamera) {
        gsap.to(camera, {
          fov: isMainCamera
            ? mainCameraState.fov
            : target.fov,

          duration: transition?.duration ?? 2,
          ease: transition?.ease ?? "power2.inOut",

          onUpdate: () => {
            camera.updateProjectionMatrix();
          },
        });
      }

      animationEnded.current = false;

      return;
    }

    // --------------------------------------------------
    // Initial camera animation
    // --------------------------------------------------

    if (previousTarget.current) return;

    if (!ready.current) {
      ready.current = true;
      return;
    }

    // --------------------------------------------------
    // Main camera cannot use getWorldPosition()
    // --------------------------------------------------

    if (isMainCamera) {
      worldPosition.copy(mainCameraState.position);
      worldQuaternion.copy(mainCameraState.quaternion);
    }

    // --------------------------------------------------
    // Blender / Three.js camera
    // --------------------------------------------------

    else if (target instanceof PerspectiveCamera) {
      target.getWorldPosition(worldPosition);
      target.getWorldQuaternion(worldQuaternion);
    }

    // Invalid target
    else {
      return;
    }

    // --------------------------------------------------
    // Position
    // --------------------------------------------------

    camera.position.lerp(
      worldPosition,
      moveSpeed
    );

    // --------------------------------------------------
    // Rotation
    // --------------------------------------------------

    camera.quaternion.slerp(
      worldQuaternion,
      rotationSpeed
    );

    const distance = camera.position.distanceTo(
      worldPosition
    );

    // --------------------------------------------------
    // Animation finished
    // --------------------------------------------------

    if (
      !animationEnded.current &&
      distance < endDistance
    ) {
      animationEnded.current = true;

      if (camera instanceof PerspectiveCamera) {
        mainCameraState.position.copy(
          camera.position
        );

        mainCameraState.quaternion.copy(
          camera.quaternion
        );

        mainCameraState.fov = camera.fov;
        mainCameraState.initialized = true;
      }

      onCameraAnimationEnd?.();
    }

    // --------------------------------------------------
    // FOV
    // --------------------------------------------------

    if (camera instanceof PerspectiveCamera) {
      const targetFov = isMainCamera
        ? mainCameraState.fov
        : target.fov;

      camera.fov = MathUtils.lerp(
        camera.fov,
        targetFov,
        zoomSpeed
      );

      camera.updateProjectionMatrix();
    }
  });

  return null;
}

