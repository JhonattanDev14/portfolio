import { Object3D } from "three";

import { NavigationHistory } from "./NavigationHistory";
import {
  executeNavigation,
  canExecuteNavigation,
} from "./NavigationExec";
import {
  MainCameraState,
  mainCameraState,
} from "./CameraTarget";

export class NavigationController {
  private cameras: Map<string, Object3D>;
  private history: NavigationHistory;

  constructor(
    history: NavigationHistory,
    cameras: Map<string, Object3D>
  ) {
    this.cameras = cameras;
    this.history = history;
  }

  getCurrentPoint() {
    return this.history.getCurrentPoint();
  }

  canGoBack() {
    return this.history.canGoBack();
  }

  canNavigate(id: string) {
    const from = this.history.getCurrentPoint();

    return canExecuteNavigation(from, id);
  }

  navigateTo(id: string) {
    const from = this.history.getCurrentPoint();

    const camera = this.cameras.get(id);

    if (!camera) {
      console.warn(
        `No se encontró la cámara: ${id}`
      );

      return false;
    }

    const exec = executeNavigation({
      from,
      to: id,
      camera,
    });

    if (!exec) return false;

    return true;
  }

  goBack(fromBrowser = false) {
    const current = this.history.getCurrentPoint();

    const previous =
      this.history.back(fromBrowser);

    if (!previous) return;

    let camera: Object3D | MainCameraState;

    if (previous === "main") {
      if (!mainCameraState.initialized) {
        console.warn(
          "MainCameraState todavía no está inicializado"
        );

        return;
      }

      camera = mainCameraState;
    } else {
      const previousCamera =
        this.cameras.get(previous);

      if (!previousCamera) {
        console.warn(
          `No se encontró la cámara: ${previous}`
        );

        return;
      }

      camera = previousCamera;
    }

    executeNavigation({
      from: current,
      to: previous,
      camera,
    });
  }

  goHome() {
    const current = this.history.getCurrentPoint();

    if (current === "main") {
      return;
    }

    if (!mainCameraState.initialized) {
      console.warn(
        "MainCameraState todavía no está inicializado"
      );

      return;
    }

    executeNavigation({
      from: current,
      to: "main",
      camera: mainCameraState,
    });
    this.history.reset();
  }
}
