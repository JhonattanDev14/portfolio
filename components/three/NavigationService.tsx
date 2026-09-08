import { NavigationController } from "./NavigationController";

class NavigationService {
  private controller: NavigationController | null = null;
  private menu: string | undefined;
  private listeners = new Set<(menu?: string) => void>(); 

  initialize(controller: NavigationController) {
    this.controller = controller;
  }

  navigateTo(id: string) {
  if (!this.controller) {
    console.warn(
      "NavigationService todavía no está inicializado"
    );
    return;
  }

  window.history.pushState(
    {
      ...window.history.state,
      navigationPoint: id,
    },
    "",
    window.location.href
  );

  this.controller.navigateTo(id);
}

  goBack() {
    if (!this.controller) {
      console.warn(
        "NavigationService todavía no está inicializado"
      );

      return;
    }

    this.controller.goBack();
  }

  canGoBack() {
    return this.controller?.canGoBack() ?? false;
  }
  
  subscribe(listener: (menu?: string) => void) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  setMenu(menu?: string) {
    this.menu = menu;

    this.listeners.forEach((listener) => {
      listener(menu);
    });
  }
}

export const navigationService =
  new NavigationService();