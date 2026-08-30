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
    to: "projects",
    duration: 2,
    rotationDuration: 2.4,
    ease: "power2.inOut",
  },
  {
    from: "projects",
    to: "main",
    duration: 2,
    rotationDuration: 1.8,
    ease: "power2.inOut",
  },
  {
    from: "main",
    to: "skills",
    duration: 2,
    rotationDuration: 2.5,
    ease: "power2.inOut",
  },
  {
    from: "skills",
    to: "main",
    duration: 2,
    rotationDuration: 1.5,
    ease: "power2.inOut",
  },
  {
    from: "main",
    to: "aboutMe",
    duration: 2,
    rotationDuration: 2.2,
    ease: "power2.inOut",
  },
  {
    from: "aboutMe",
    to: "main",
    duration: 2,
    rotationDuration: 1.5,
    ease: "power2.inOut",
  },

];