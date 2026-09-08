"use client";

import { navigationRoutes } from "@/components/three/data/NavigationRoutes";
import SkillsMenu from "./menus/SkillsMenu";
import { navigationService } from "@/components/three/NavigationService";
import { useEffect, useState } from "react";


export default function NavigationMenu() {

  const [menu, setMenu] =
    useState<string | undefined>();

  useEffect(() => {
    return navigationService.subscribe(setMenu);
  }, []);

  if (!menu) {
    return null;
  }

  if (menu === "skills") {
    const routes = navigationRoutes[menu] ?? [];

    return (
      <SkillsMenu
        routes={routes}
        onNavigate={(id) => navigationService.navigateTo(id)}
      />
    );
  }

  return null;
}