export class NavigationManager {
  private currentPoint: string;
  private history: string[];

  constructor(initialPoint = "main") {
    this.currentPoint = initialPoint;
    this.history = [initialPoint];
  }

  getCurrentPoint() {
    return this.currentPoint;
  }

  getHistory() {
    return [...this.history];
  }

  canGoBack() {
    return this.history.length > 1;
  }

  navigateTo(id: string) {
    if (id === this.currentPoint) {
      return false;
    }

    this.history.push(id);
    this.currentPoint = id;

    return true;
  }

  goBack() {
    if (!this.canGoBack()) {
      return null;
    }

    this.history.pop();

    this.currentPoint =
      this.history[this.history.length - 1];

    return this.currentPoint;
  }

  goHome() {
    if (this.currentPoint === "main") {
      return false;
    }

    this.history = ["main"];
    this.currentPoint = "main";

    return true;
  }

  reset() {
    this.history = ["main"];
    this.currentPoint = "main";
  }
}