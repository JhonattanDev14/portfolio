"use client";

import SkillsMenu from "./menus/SkillsMenu";

type NavigationMenuProps = {
  menu?: string;
};

export default function NavigationMenu({
  menu,
}: NavigationMenuProps) {
  if (!menu) {
    return null;
  }

  if (menu === "skills") {
    return <SkillsMenu />;
  }

  return null;
}
