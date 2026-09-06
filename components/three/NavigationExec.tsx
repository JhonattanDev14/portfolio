import { Object3D } from "three";

import { navigationPoints } from "./data/Navigation";
import { navigationTransitions } from "./data/NavigationTransition";
import { NavigationManager } from "./NavigationManager";
import { cameraTarget, MainCameraState } from "./CameraTarget";

interface NavigationActionOptions {
  manager: NavigationManager;
  from: string;
  to: string;
  camera: Object3D | MainCameraState;
}

export function executeNavigation({
  manager,
  from,
  to,
  camera,
}: NavigationActionOptions) {
  // Buscamos la transición.
  const transition = navigationTransitions.find(
    (item) =>
      item.from === from &&
      item.to === to
  );

  if (!transition) {
    console.warn(
      `No existe transición: ${from} → ${to}`
    );

    return false;
  }

  // Buscamos la configuración del destino.
  const point = navigationPoints.find(
    (item) => item.id === to
  );

  // Actualizamos el historial.
  const navigated = manager.navigateTo(to);

  if (!navigated) {
    return false;
  }

  // Actualizamos el menú.
  cameraTarget.menu = point?.menu;

  // Establecemos la cámara.
  cameraTarget.current = camera;

  // Establecemos la transición.
  cameraTarget.transition = transition;

  return true;
}