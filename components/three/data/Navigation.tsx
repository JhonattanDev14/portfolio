export type NavigationPoint = {
  id: string;
  hotspot: string;
  camera: string;
  className?: string;
  label?: string;
  menu?: string;
};

export const navigationPoints: NavigationPoint[] = [
  {
    id: "projects",
    hotspot: "HotspotDesk",
    camera: "CameraDesk",
    label: "Proyects",
    className: "hotspot-default",
    menu : "projects"
  },
  {
    id: "skills",
    hotspot: "HotspotSkills",
    camera: "CameraSkills",
    label: "Skills",
    className: "hotspot-default",
    menu: "skills"
  },
  {
    id: "aboutMe",
    hotspot: "HotspotAboutMe",
    camera: "CameraAboutMe",
    label: "About Me",
    className: "hotspot-default",
    menu: "aboutMe"
  },
];