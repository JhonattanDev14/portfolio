"use client";

import { navigationRoutes } from "@/components/three/data/NavigationRoutes";
import { navigationService } from "@/components/three/NavigationService";
import { useEffect, useState } from "react";

export default function NavigationMenu() {
  const [menu, setMenu] = useState<string>();

  useEffect(() => {
    return navigationService.subscribe(setMenu);
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 z-50 -translate-y-1/2">
      <div className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-md">
        {navigationRoutes.map((route) => (
          <button
            key={route.id}
            onClick={() =>
              route.id === "main"
                ? navigationService.goHome()
                : navigationService.navigateTo(route.id)
            }
            className="group/item flex items-center gap-3"
          >
            <span
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover/item:h-4 group-hover/item:w-4 ${
                menu === route.id
                  ? "scale-125 bg-cyan-400"
                  : "bg-white"
              }`}
            />

            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm text-white opacity-0 transition-all duration-300 group-hover/item:max-w-32 group-hover/item:opacity-100">
              {route.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}