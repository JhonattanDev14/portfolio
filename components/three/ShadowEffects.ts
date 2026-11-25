import { FrontSide, Group, Mesh, SpotLight } from "three";
import { sceneShadowLights } from "./data/ShadowLights";
import { sceneShadowObjects } from "./data/ShadowObjects";

/** Applies shadow settings to meshes and named lights in a model hierarchy. */
export function applyShadowEffects(scene: Group, enabled?: boolean) {
  scene.traverse((object) => {
    if (object instanceof Mesh) {
      const config = sceneShadowObjects[object.name];
      // With no toggle, this is the environment model: only named meshes have
      // shadow flags changed. A model toggle applies to every mesh in its tree.
      if (enabled === undefined && !config) return;

      const shadowsEnabled = enabled ?? true;
      object.castShadow = shadowsEnabled && (config?.castShadow ?? true);
      object.receiveShadow = shadowsEnabled && (config?.receiveShadow ?? true);

      // Keep every mesh on FrontSide, including meshes with multiple materials.
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of materials) {
        if (material.side !== FrontSide) {
          material.side = FrontSide;
          material.needsUpdate = true;
        }
        if (config?.shadowSide !== undefined) {
          material.shadowSide = config.shadowSide;
          material.needsUpdate = true;
        }
      }

      return;
    }

    // GLTF imports the configured shadow-casting lights as SpotLights.
    if (object instanceof SpotLight) {
      const config = sceneShadowLights[object.name];
      if (!config) return;

      object.castShadow = (enabled ?? true) && config.castShadow;

      if (config.bias !== undefined) 
        object.shadow.bias = config.bias;
      if (config.normalBias !== undefined) {
        object.shadow.normalBias = config.normalBias;
      }
      if (config.mapSize) 
        object.shadow.mapSize.set(...config.mapSize);
    }
  });
}
