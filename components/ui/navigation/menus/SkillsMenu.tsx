"use client";

import type { NavigationRoute } from "@/components/three/data/NavigationRoutes";

type SkillsMenuProps = {
  routes: NavigationRoute[];
  onNavigate: (id: string) => void;
};

export default function SkillsMenu({
  routes,
  onNavigate,
}: SkillsMenuProps) {
  console.log(onNavigate)
  return (
    <div
      className="
        fixed
        bottom-8
        left-1/2
        z-50
        -translate-x-1/2
        rounded-xl
        bg-black/30
        px-6
        py-3
        text-white
        backdrop-blur-md
      "
    >
      {routes.map((route) => (
        <button
          key={route.id}
          onClick={() => onNavigate(route.id)}
        >
          {route.label}
        </button>
      ))}
    </div>
  );
}