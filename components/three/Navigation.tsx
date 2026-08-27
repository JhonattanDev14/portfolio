"use client";

import { Html, useGLTF } from "@react-three/drei";
import { navigationPoints } from "./data/Navigation";
import { cameraTarget } from "./CameraTarget";
import { Vector3 } from "three";

export default function Navigation() {
  const { scene } = useGLTF("/models/Navigation.glb");

  const hotspots = navigationPoints
    .map((point) => {
      const hotspot = scene.getObjectByName(point.hotspot);
      const camera = scene.getObjectByName(point.camera);

      if (!hotspot || !camera) {
        console.warn(
          `Navigation: no se encontró ${point.hotspot} o ${point.camera}`
        );
        return null;
      }

      const position = new Vector3();
      hotspot.getWorldPosition(position);

      hotspot.visible = false;

      return {
        point,
        camera,
        position,
      };
    })
    .filter(Boolean);

  return (
    <>
      <primitive object={scene} />

      {hotspots.map((item) => {
        if (!item) return null;

        const { point, camera, position } = item;

        return (
          <Html
            key={point.id}
            position={position}
            center
            transform={false}
            zIndexRange={[100, 0]}
          >
            <button
              className={point.className}
              style={{
                cursor: "pointer",
                pointerEvents: "auto",
              }}
              onClick={() => {
                console.log("CLICK:", point.id);

                cameraTarget.current = camera as any;
                cameraTarget.transition = point.transition;
              }}
            >
              {point.label}
            </button>
          </Html>
        );
      })}
    </>
  );
}

useGLTF.preload("/models/Navigation.glb");