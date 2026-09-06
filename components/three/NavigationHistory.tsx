import { NavigationController } from "./NavigationController";

export class NavigationHistory {
  private controller: NavigationController;
  private guardActive = false;

  constructor(controller: NavigationController) {
    this.controller = controller;
  }

  // Activa la protección del historial.
  activate() {
    if (this.guardActive) return;

    window.history.pushState(
      { navigationGuard: true },
      "",
      window.location.href
    );

    this.guardActive = true;
  }

  // Inicia la escucha del navegador.
  start() {
    window.addEventListener("popstate", this.handlePopState);
  }

  // Detiene la escucha del navegador.
  stop() {
    window.removeEventListener("popstate", this.handlePopState);
  }

  // Maneja el botón Atrás.
  private handlePopState = () => {
    if (!this.controller.canGoBack()) {
      this.guardActive = false;
      return;
    }

    this.controller.goBack();

    window.history.pushState(
      { navigationGuard: true },
      "",
      window.location.href
    );
  };
}