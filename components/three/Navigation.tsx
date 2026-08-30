"use client";

import { Html, useGLTF } from "@react-three/drei";
import {
  Object3D,
  Vector3,
} from "three";
import { useEffect, useRef } from "react";

import { navigationPoints } from "./data/Navigation";
import { navigationTransitions } from "./data/NavigationTransition";
import { NavigationManager } from "./NavigationManager";
import {
  cameraTarget,
  mainCameraState,
  type CameraTarget,
} from "./CameraTarget";

export default function Navigation() {
  const { scene } = useGLTF("/models/Navigation.glb");

  const navigationManager = useRef(
    new NavigationManager("main")
  );

  const cameras = useRef(
    new Map<string, Object3D>()
  );

  const historyGuardActive = useRef(false);

  const navigateToRef = useRef<
    ((id: string, camera: Object3D) => void) | null
  >(null);

  const goBackRef = useRef<
    (() => void) | null
  >(null);

  /*
   * Guardamos todas las cámaras disponibles.
   */
  const hotspots = navigationPoints
    .map((point) => {
      const hotspot = scene.getObjectByName(
        point.hotspot
      );

      const camera = scene.getObjectByName(
        point.camera
      );

      if (!hotspot || !camera) {
        console.warn(
          `Navigation: no se encontró ${point.hotspot} o ${point.camera}`
        );

        return null;
      }

      cameras.current.set(
        point.id,
        camera
      );

      const position = new Vector3();

      hotspot.getWorldPosition(position);

      hotspot.visible = false;

      return {
        point,
        camera,
        position,
      };
    })
    .filter(Boolean);

  /*
   * Activa la protección del historial del navegador.
   */
  const activateHistoryGuard = () => {
    if (historyGuardActive.current) {
      return;
    }

    window.history.pushState(
      { navigationGuard: true },
      "",
      window.location.href
    );

    historyGuardActive.current = true;
  };

  /*
   * Navegar hacia otro punto.
   */
  const navigateTo = (
    id: string,
    camera: Object3D
  ) => {
    const manager =
      navigationManager.current;

    const from =
      manager.getCurrentPoint();

    const transition =
      navigationTransitions.find(
        (item) =>
          item.from === from &&
          item.to === id
      );

    if (!transition) {
      console.warn(
        `No existe transición: ${from} → ${id}`
      );

      return;
    }

    const navigated =
      manager.navigateTo(id);

    if (!navigated) {
      return;
    }

    /*
     * Buscamos la configuración del punto
     * para obtener el menú asociado, si existe.
     */
    const point =
      navigationPoints.find(
        (item) => item.id === id
      );

    /*
     * Guardamos el menú junto con el destino
     * para que CameraController lo ejecute
     * cuando termine la transición.
     */
    cameraTarget.menu =
      point?.menu;

    activateHistoryGuard();

    /*
     * Actualizamos el destino de la cámara.
     * CameraController detectará este cambio
     * y ejecutará la transición.
     */
    cameraTarget.current =
      camera;

    cameraTarget.transition =
      transition;

    console.log(
      `NAVIGATION: ${from} → ${id}`
    );

    console.log(
      "HISTORY:",
      manager.getHistory()
    );
  };

  /*
   * Volver al punto anterior.
   */
  const goBack = () => {
    const manager =
      navigationManager.current;

    if (!manager.canGoBack()) {
      console.log(
        "No hay navegación anterior"
      );

      return;
    }

    const current =
      manager.getCurrentPoint();

    const history =
      manager.getHistory();

    const previous =
      history[history.length - 2];

    if (!previous) {
      return;
    }

    /*
     * Main no existe dentro de Navigation.glb.
     * Su destino se obtiene del estado inicial
     * guardado por CameraController.
     */
    let previousCamera: CameraTarget | undefined;

    if (previous === "main") {
      if (!mainCameraState.initialized) {
        console.warn(
          "MainCameraState todavía no está inicializado"
        );

        return;
      }

      previousCamera =
        mainCameraState;
    } else {
      previousCamera =
        cameras.current.get(previous);
    }

    if (!previousCamera) {
      console.warn(
        `No se encontró la cámara: ${previous}`
      );

      return;
    }

    const transition =
      navigationTransitions.find(
        (item) =>
          item.from === current &&
          item.to === previous
      );

    if (!transition) {
      console.warn(
        `No existe transición: ${current} → ${previous}`
      );

      return;
    }

    /*
     * Buscamos el menú del punto al que estamos
     * regresando.
     */
    const point =
      navigationPoints.find(
        (item) => item.id === previous
      );

    /*
     * Guardamos el menú del destino para que
     * CameraController lo ejecute al terminar.
     */
    cameraTarget.menu =
      point?.menu;

    manager.goBack();

    /*
     * Actualizamos el destino de la cámara.
     * CameraController detectará el cambio
     * y ejecutará la transición.
     */
    cameraTarget.current =
      previousCamera;

    cameraTarget.transition =
      transition;

    console.log(
      `BACK: ${current} → ${previous}`
    );

    console.log(
      "HISTORY:",
      manager.getHistory()
    );
  };

  /*
   * Referencias estables para el listener.
   */
  navigateToRef.current =
    navigateTo;

  goBackRef.current =
    goBack;

  /*
   * Detectar el botón Atrás del navegador.
   */
  useEffect(() => {
    const handlePopState = () => {
      const manager =
        navigationManager.current;

      /*
       * Si no tenemos navegación 3D,
       * dejamos que el navegador continúe
       * normalmente.
       */
      if (!manager.canGoBack()) {
        historyGuardActive.current =
          false;

        return;
      }

      /*
       * Tenemos navegación 3D.
       * Interceptamos el Atrás.
       */
      goBackRef.current?.();

      /*
       * Volvemos a crear la protección
       * para el siguiente Atrás.
       */
      window.history.pushState(
        { navigationGuard: true },
        "",
        window.location.href
      );
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  return (
    <>
      <primitive object={scene} />

      {hotspots.map((item) => {
        if (!item) return null;

        const {
          point,
          camera,
          position,
        } = item;

        return (
          <Html
            key={point.id}
            position={position}
            center
            transform={false}
            zIndexRange={[100, 0]}
          >
            <button
              className={point.className}
              style={{
                cursor: "pointer",
                pointerEvents: "auto",
              }}
              onClick={() =>
                navigateToRef.current?.(
                  point.id,
                  camera
                )
              }
            >
              {point.label}
            </button>
          </Html>
        );
      })}
    </>
  );
}

useGLTF.preload(
  "/models/Navigation.glb"
);
