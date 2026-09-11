import { NavigationController } from "./NavigationController";
import { NavigationHistory } from "./NavigationHistory";

class NavigationService {
  private controller: NavigationController | null = null;
  private history: NavigationHistory | null = null;
  private menu: string | undefined;
  private listeners = new Set<(menu?: string) => void>();

  initialize(
    controller: NavigationController,
    history: NavigationHistory
  ) {
    this.controller = controller;
    this.history = history;
  }

  navigateTo(id: string) {
    if (!this.controller || !this.history) {
      console.warn(
        "NavigationService todavía no está inicializado"
      );

      return;
    }

    const canNavigate =
      this.controller.canNavigate(id);

    if (!canNavigate) return;

    const navigated =
      this.controller.navigateTo(id);

    if (!navigated) return;

    this.history.push(id);
  }

  goBack() {
    if (!this.controller || !this.history) {
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

  goHome() {
    if (!this.controller || !this.history) {
      console.warn(
        "NavigationService todavía no está inicializado"
      );

      return;
    }

    // 
    this.controller.goHome();
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
