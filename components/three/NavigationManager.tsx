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

    const existingIndex = this.history.indexOf(id);

    if (existingIndex !== -1) {
      this.history = this.history.slice(0, existingIndex + 1);
      
    } else {
      this.history.push(id);
    }

    this.currentPoint = id;
    
    return true;
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