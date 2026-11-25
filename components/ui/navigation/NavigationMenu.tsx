"use client";

import { navigationRoutes } from "@/components/three/data/NavigationRoutes";
import { navigationService } from "@/components/three/NavigationService";
import { useEffect, useState } from "react";

export default function NavigationMenu() {
  const [menu, setMenu] = useState<string>();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    return navigationService.subscribe(setMenu);
  }, []);

  return (
    <nav
      aria-label="Navigation"
      className="fixed left-5 top-1/2 z-50 -translate-y-1/2"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setExpanded(false);
      }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-4 z-0 rounded-2xl blur-xl transition-all duration-700 ${
          expanded
            ? "bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.52),rgba(37,99,235,0.28),transparent_72%)] opacity-100"
            : "bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.5),rgba(14,165,233,0.26),transparent_72%)] opacity-100"
        }`}
      />
      <div
        className={`relative z-10 flex flex-col gap-2 overflow-hidden rounded-xl border bg-[#07101d]/40 py-3 backdrop-blur-md transition-[width,padding,border-color,box-shadow] duration-300 ${
          expanded
            ? "border-cyan-200/70 shadow-[0_10px_34px_rgba(0,0,0,0.3),0_0_8px_rgba(34,211,238,0.75),0_0_26px_rgba(34,211,238,0.38),inset_0_0_10px_rgba(34,211,238,0.12)]"
            : "border-blue-300/65 shadow-[0_8px_32px_rgba(0,0,0,0.24),0_0_8px_rgba(37,99,235,0.7),0_0_24px_rgba(37,99,235,0.32),inset_0_0_10px_rgba(37,99,235,0.1)]"
        } ${
          expanded ? "w-48 px-3" : "w-12 px-2"
        }`}
      >
        <div
          className={`overflow-hidden whitespace-nowrap px-2 pb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-blue-100/70 transition-all duration-200 ${
            expanded ? "max-h-6 opacity-100" : "max-h-0 p-0 opacity-0"
          }`}
        >
          Select destination
        </div>
        {navigationRoutes.map((route) => (
          <button
            key={route.id}
            aria-current={menu === route.id ? "page" : undefined}
            onClick={() => {
              if (route.id === "main") {
                navigationService.goHome();
              } else {
                navigationService.navigateTo(route.id);
              }
              setExpanded(false);
            }}
            className={`group flex h-9 w-full items-center gap-3 rounded-lg border px-2 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70 ${
              menu === route.id
                ? "border-blue-200/25 bg-blue-300/10"
                : "border-transparent hover:border-white/10 hover:bg-white/5"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-300 ${
                menu === route.id
                  ? "scale-110 border-blue-100 bg-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.75)]"
                  : "border-white/60 bg-white/80 group-hover:border-cyan-100 group-hover:bg-cyan-200"
              }`}
            />

            <span
              className={`overflow-hidden whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-200 ${
                expanded
                  ? "max-w-36 translate-x-0 opacity-100"
                  : "max-w-0 -translate-x-1 opacity-0"
              }`}
            >
              {route.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
