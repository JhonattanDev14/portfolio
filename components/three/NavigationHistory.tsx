export class NavigationHistory {
  private history: string[] = ["main"];
  private internalBack = false;

  start(onBack: () => void) {
    this.onBack = onBack;

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

  getHistory() {
    return [...this.history];
  }

  getCurrentPoint() {
    return this.history[
      this.history.length - 1
    ];
  }

  canGoBack() {
    return this.history.length > 1;
  }

  push(id: string) {
    window.history.pushState(
      {
        ...window.history.state,
        navigationPoint: id,
      },
      "",
      window.location.href
    );

    this.history.push(id);
  }

  back(fromBrowser = false) {
    if (this.history.length <= 1) {
      return;
    }

    this.history.pop();

    const previous =
      this.history[
        this.history.length - 1
      ];

    if (!fromBrowser) {
      this.internalBack = true;

      window.history.back();
    }

    return previous;
  }

  reset() {
    const steps = this.history.length - 1;

    if (steps > 0) {
      this.history = ["main"];

      window.history.go(-steps);
    }
  }

  private onBack?: () => void;

  private handlePopState = () => {
    if (this.internalBack) {
      this.internalBack = false;
      return;
    }

    this.onBack?.();
  };
}

