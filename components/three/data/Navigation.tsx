export type NavigationPoint = {
  id: string;
  hotspot: string;
  camera: string;
  className?: string;
  label?: string;

  transition: {
    duration: number;
    rotationDuration: number;
    ease: string;
  };
};

export const navigationPoints: NavigationPoint[] = [
  {
    id: "desk",
    hotspot: "HotspotDesk",
    camera: "CameraDesk",
    label: "Desk",
    className: "hotspot-default",

    transition: {
      duration: 2,
      rotationDuration: 2.4,
      ease: "power2.inOut",
    },
  },
];