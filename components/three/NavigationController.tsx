import { Object3D } from "three";

import { NavigationManager } from "./NavigationManager";
import { executeNavigation } from "./NavigationExec";
import { MainCameraState, mainCameraState } from "./CameraTarget";


export class NavigationController {
  private manager: NavigationManager;

  private cameras: Map<string, Object3D>;

  constructor(
    manager: NavigationManager,
    cameras: Map<string, Object3D>
  ) {
    this.manager = manager;
    this.cameras = cameras;
  }

  // Comprueba si existe navegación anterior.
    canGoBack() {
    return this.manager.canGoBack();
    }
    
    navigateTo(id: string) {
        const from = this.manager.getCurrentPoint();

        const camera = this.cameras.get(id);

        if (!camera) {
            console.warn(
            `No se encontró la cámara: ${id}`
            );

            return;
        }

        executeNavigation({
            manager: this.manager,
            from,
            to: id,
            camera,
        });
    }

    goBack() {
        if (!this.manager.canGoBack()) {
            console.log("No hay navegación anterior");
            return;
        }

        const current = this.manager.getCurrentPoint();

        const history = this.manager.getHistory();

        const previous = history[history.length - 2];

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
            manager: this.manager,
            from: current,
            to: previous,
            camera,
        });
    }
}