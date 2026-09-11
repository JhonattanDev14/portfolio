export type NavigationRoute = {
  id: string;
  label: string;
  content: string;
};

export const navigationRoutes: NavigationRoute[] = [
  {
    id: "main",
    label: "Home",
    content: "HomeContent",
  },
  {
    id: "projects",
    label: "Projects",
    content: "ProjectsContent",
  },
  {
    id: "skills",
    label: "Skills",
    content: "SkillsContent",
  },
  {
    id: "aboutMe",
    label: "About Me",
    content: "AboutMeContent",
  },
];