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
  // Callback utilizado por la animación inicial de la cámara.
  onCameraAnimationEnd?: () => void;

  // Callback utilizado para mostrar/ocultar el HTML
  // después de terminar una transición de navegación.
  onMenuChange?: (menu: string | undefined) => void;

  moveSpeed?: number;
  rotationSpeed?: number;
  zoomSpeed?: number;
  endDistance?: number;
};

export default function CameraController({
  onCameraAnimationEnd,
  onMenuChange,
  moveSpeed = 0.05,
  rotationSpeed = 0.05,
  zoomSpeed = 0.01,
  endDistance = 0.001,
}: CameraControllerProps) {
  const { camera } = useThree();

  const ready = useRef(false);

  // Controla únicamente la animación inicial.
  const animationEnded = useRef(false);

  // Guarda el último destino procesado.
  const previousTarget =
    useRef<CameraTarget | null>(null);

  // Guardamos el timeline de navegación actual.
  const timeline =
    useRef<gsap.core.Timeline | null>(null);

  useFrame(() => {
    const target = cameraTarget.current;

    if (!target) return;

    const isMainCamera =
      target === mainCameraState;

    // --------------------------------------------------
    // Navigation between hotspots
    // --------------------------------------------------

    if (
      cameraTarget.transition &&
      target !== previousTarget.current
    ) {
      /*
       * Marcamos este destino como procesado.
       * Esto evita que el mismo destino vuelva a crear
       * otra transición en los siguientes frames.
       */
      previousTarget.current = target;

      // ----------------------------------------------
      // Obtener posición y rotación del destino
      // ----------------------------------------------

      if (isMainCamera) {
        worldPosition.copy(
          mainCameraState.position
        );

        worldQuaternion.copy(
          mainCameraState.quaternion
        );
      } else if (
        target instanceof PerspectiveCamera
      ) {
        target.updateMatrixWorld(true);

        target.getWorldPosition(
          worldPosition
        );

        target.getWorldQuaternion(
          worldQuaternion
        );
      } else {
        return;
      }

      const transition =
        cameraTarget.transition;

      // ----------------------------------------------
      // Cancelar transición anterior
      // ----------------------------------------------

      timeline.current?.kill();

      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(camera.quaternion);
      gsap.killTweensOf(camera);

      // ----------------------------------------------
      // Preparar rotación
      // ----------------------------------------------

      const startQuaternion =
        camera.quaternion.clone();

      const endQuaternion =
        worldQuaternion.clone();

      /*
       * Utilizamos siempre el camino más corto
       * entre las dos rotaciones.
       */
      if (
        startQuaternion.dot(endQuaternion) < 0
      ) {
        endQuaternion.set(
          -endQuaternion.x,
          -endQuaternion.y,
          -endQuaternion.z,
          -endQuaternion.w
        );
      }

      const rotationProgress = {
        value: 0,
      };

      // ----------------------------------------------
      // Timeline de navegación
      // ----------------------------------------------

      const tl = gsap.timeline({
        /*
         * Este callback se ejecuta únicamente cuando
         * terminó completamente la transición.
         */
        onComplete: () => {
          /*
           * Avisamos al HTML qué menú corresponde
           * al punto actual.
           */
          onMenuChange?.(
            cameraTarget.menu
          );

          /*
           * La transición ya terminó.
           *
           * Limpiamos el objeto para evitar que
           * vuelva a interpretarse como una transición
           * pendiente.
           */
          cameraTarget.transition = null;
        },
      });

      timeline.current = tl;

      // ----------------------------------------------
      // Position
      // ----------------------------------------------

      tl.to(
        camera.position,
        {
          x: worldPosition.x,
          y: worldPosition.y,
          z: worldPosition.z,

          duration:
            transition?.duration ?? 2,

          ease:
            transition?.ease ??
            "power2.inOut",
        },
        0
      );

      // ----------------------------------------------
      // Rotation
      // ----------------------------------------------

      tl.to(
        rotationProgress,
        {
          value: 1,

          duration:
            transition?.rotationDuration ?? 4,

          ease:
            transition?.ease ??
            "power2.inOut",

          onUpdate: () => {
            camera.quaternion
              .copy(startQuaternion)
              .slerp(
                endQuaternion,
                rotationProgress.value
              );
          },
        },
        0
      );

      // ----------------------------------------------
      // FOV
      // ----------------------------------------------

      if (
        camera instanceof PerspectiveCamera
      ) {
        tl.to(
          camera,
          {
            fov: isMainCamera
              ? mainCameraState.fov
              : target.fov,

            duration:
              transition?.duration ?? 2,

            ease:
              transition?.ease ??
              "power2.inOut",

            onUpdate: () => {
              camera.updateProjectionMatrix();
            },
          },
          0
        );
      }

      /*
       * La animación inicial no debe intervenir
       * durante una navegación.
       */
      animationEnded.current = true;

      return;
    }

    // --------------------------------------------------
    // Initial camera animation
    // --------------------------------------------------

    /*
     * Si ya procesamos un destino de navegación,
     * no ejecutamos la animación inicial.
     */
    if (previousTarget.current) {
      return;
    }

    if (!ready.current) {
      ready.current = true;
      return;
    }

    // --------------------------------------------------
    // Main camera cannot use getWorldPosition()
    // --------------------------------------------------

    if (isMainCamera) {
      worldPosition.copy(
        mainCameraState.position
      );

      worldQuaternion.copy(
        mainCameraState.quaternion
      );
    }

    // --------------------------------------------------
    // Blender / Three.js camera
    // --------------------------------------------------

    else if (
      target instanceof PerspectiveCamera
    ) {
      target.getWorldPosition(
        worldPosition
      );

      target.getWorldQuaternion(
        worldQuaternion
      );
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

    const distance =
      camera.position.distanceTo(
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

      if (
        camera instanceof PerspectiveCamera
      ) {
        /*
         * Guardamos el estado real de la cámara
         * después de la animación inicial.
         */
        mainCameraState.position.copy(
          camera.position
        );

        mainCameraState.quaternion.copy(
          camera.quaternion
        );

        mainCameraState.fov =
          camera.fov;

        mainCameraState.initialized =
          true;
      }

      /*
       * Este callback pertenece únicamente
       * a la animación inicial.
       */
      onCameraAnimationEnd?.();
    }

    // --------------------------------------------------
    // FOV
    // --------------------------------------------------

    if (
      camera instanceof PerspectiveCamera
    ) {
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