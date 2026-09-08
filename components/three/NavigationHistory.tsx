import { NavigationController } from "./NavigationController";

export class NavigationHistory {
  private controller: NavigationController;

  constructor(controller: NavigationController) {
    this.controller = controller;
  }

  start() {
    window.addEventListener(
      "popstate",
      this.handlePopState
    );
  }

  stop() {
    window.removeEventListener(
      "popstate",
      this.handlePopState
    );
  }

  private handlePopState = () => {
    if (this.controller.getCurrentPoint() !== "main") {
      this.controller.goBack();
    }
  };
}