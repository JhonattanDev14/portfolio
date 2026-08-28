import {
  PerspectiveCamera,
  Quaternion,
  Vector3,
} from "three";

import type { NavigationPoint } from "./data/Navigation";

export type MainCameraState = {
  position: Vector3;
  quaternion: Quaternion;
  fov: number;
  initialized: boolean;
};

export const mainCameraState: MainCameraState = {
  position: new Vector3(),
  quaternion: new Quaternion(),
  fov: 45,
  initialized: false,
};

export type CameraTarget =
  | PerspectiveCamera
  | MainCameraState;

export const cameraTarget = {
  current: null as CameraTarget | null,
  transition: null as NavigationPoint["transition"] | null,
};