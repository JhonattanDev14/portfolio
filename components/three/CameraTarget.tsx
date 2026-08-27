import { PerspectiveCamera } from "three";
import type { NavigationPoint } from "./data/Navigation";

export const cameraTarget = {
  current: null as PerspectiveCamera | null,
  transition: null as NavigationPoint["transition"] | null,
};