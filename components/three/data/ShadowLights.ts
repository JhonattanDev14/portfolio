export type ShadowLightConfig = {
  castShadow: boolean;
  bias?: number;
  normalBias?: number;
  mapSize?: [number, number];
};

/** Shadow behavior for named lights imported from the environment GLB. */
export const sceneShadowLights: Record<string, ShadowLightConfig> = {
  OutLight: {
    castShadow: true,
    bias: 0,
    normalBias: 0,
    mapSize: [2000, 2024],
  },
  TextLightJhonattan: {
    castShadow: true,
    bias: 0,
    normalBias: 0,
  }
};
