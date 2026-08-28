export type NavigationTransition = {
  from: string;
  to: string;
  duration: number;
  rotationDuration: number;
  ease: string;
};

export const navigationTransitions: NavigationTransition[] = [
  {
    from: "main",
    to: "desk",
    duration: 2,
    rotationDuration: 2.4,
    ease: "power2.inOut",
  },

  {
    from: "desk",
    to: "main",
    duration: 2,
    rotationDuration: 2.4,
    ease: "power2.inOut",
  },
];