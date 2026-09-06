export type NavigationRoute = {
  id: string;
  label: string;
};

export const navigationRoutes: Record<
  string,
  NavigationRoute[]
> = {
  skills: [
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "skills",
      label: "Skills",
    },
    {
      id: "aboutMe",
      label: "About Me",
    },
  ],
};