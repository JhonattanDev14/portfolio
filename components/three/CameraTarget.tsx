import {
  Object3D,
  Quaternion,
  Vector3,
} from "three";

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
  | Object3D
  | MainCameraState;

export type CameraTransition = {
  duration?: number;
  rotationDuration?: number;
  ease?: string;
};

export const cameraTarget = {
  current: null as CameraTarget | null,
  transition: null as CameraTransition | null,
  menu: undefined as string | undefined,
};