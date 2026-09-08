"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Object3D, Vector3 } from "three";

import { navigationPoints } from "./data/Navigation";
import NavigationHotspot from "../ui/navigation/NavigationHotspot";
import { NavigationManager } from "./NavigationManager";
import { NavigationController } from "./NavigationController";
import { NavigationHistory } from "./NavigationHistory";
import { navigationService } from "./NavigationService";

export default function Navigation() {
  // Cargamos el modelo de navegación.
  const { scene } = useGLTF("/models/Navigation.glb");

    // Creamos el historial interno una sola vez.
    const navigationManager = useRef(
      new NavigationManager("main")
    );

    // Guardamos las cámaras encontradas.
    const cameras = useRef(
      new Map<string, Object3D>()
    );

    // Inicilizamos el servicio una sola vez
    useEffect(() => {
      navigationService.initialize(
        navigationController.current
      );
    }, []);

  // Buscamos y preparamos todos los hotspots.
  const hotspots = navigationPoints
    .map((point) => {
      // Buscamos el hotspot dentro del GLB.
      const hotspot = scene.getObjectByName(
        point.hotspot
      );

      // Buscamos la cámara asociada.
      const camera = scene.getObjectByName(
        point.camera
      );

      // Comprobamos que existan ambos objetos.
      if (!hotspot || !camera) {
        console.warn(
          `Navigation: no se encontró ${point.hotspot} o ${point.camera}`
        );

        return null;
      }

      // Guardamos la cámara asociada al punto.
      cameras.current.set(point.id, camera);

      // Creamos la posición del hotspot.
      const position = new Vector3();

      // Obtenemos su posición dentro del mundo 3D.
      hotspot.getWorldPosition(position);

      // Ocultamos el objeto original del GLB.
      hotspot.visible = false;

      // Guardamos los datos del punto.
      return {
        point,
        position,
      };
    })
    // Eliminamos los puntos que no existen.
    .filter(Boolean);

  // Creamos el controlador una sola vez.
  const navigationController = useRef(
    new NavigationController(
      navigationManager.current,
      cameras.current
    )
  );

  // Creamos el historial del navegador una sola vez.
  const navigationHistory = useRef(
    new NavigationHistory(
      navigationController.current
    )
  );

  // Conectamos el botón Atrás del navegador.
  useEffect(() => {
    const history = navigationHistory.current;

    history.start();

    return () => {
      history.stop();
    };
}, []);

  return (
    <>
      {/* Renderizamos el modelo de navegación. */}
      <primitive object={scene} />

      {/* Renderizamos cada hotspot UI. */}
      {hotspots.map((item) => {
        if (!item) return null;

        return (
          <NavigationHotspot
            key={item.point.id}
            position={item.position}
            label={item.point.label ?? ""}
            className={item.point.className}
            onNavigate={() => {
              // navigationHistory.current.activate();
              navigationService.navigateTo(item.point.id);
            }}
          />
        );
      })}
    </>
  );
}

// Precargamos el modelo.
useGLTF.preload(
  "/models/Navigation.glb"
);
