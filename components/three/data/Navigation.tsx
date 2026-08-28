export type NavigationPoint = {
  id: string;
  hotspot: string;
  camera: string;
  className?: string;
  label?: string;
};

export const navigationPoints: NavigationPoint[] = [
  {
    id: "desk",
    hotspot: "HotspotDesk",
    camera: "CameraDesk",
    label: "Desk",
    className: "hotspot-default",
  },
];