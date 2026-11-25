import { DoubleSide, type Material } from "three";

export type ShadowObjectConfig = {
  castShadow: boolean;
  receiveShadow: boolean;
  side?: Material["side"];
  shadowSide?: Material["shadowSide"];
};

/** Shadow behavior for named meshes inside the environment GLB. */
export const sceneShadowObjects: Record<string, ShadowObjectConfig> = {
  wall01: {
    castShadow: true,
    receiveShadow: true,
    side: 0,
  },
  wall02: {
    castShadow: true,
    receiveShadow: true,
    side: 0,
  },
  Floor: {
    castShadow: true,
    receiveShadow: true,
    side: 0
  },
  TextJhonattan: {
    castShadow: true,
    receiveShadow: false,
    side:0
  },
  TextRojas: {
    castShadow: true,
    receiveShadow: false,
  },
  "Fiddle Leaf Plant": {
    castShadow: true,
    receiveShadow: true,
    side:2,
    shadowSide: DoubleSide,
  },
};
