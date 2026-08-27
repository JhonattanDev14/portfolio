"use client";

import { useEffect, useRef } from "react";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type AudioWaveProps = {
  scene: Group | null;
  analyserRef: React.RefObject<AnalyserNode | null>;
};

const POINTS_PER_CIRCLE = 200;

type CircleData = {
  mesh: Mesh;
  originalPositions: Float32Array;
  centers: { x: number; y: number; z: number }[];
};

export default function AudioWave({
  scene,
  analyserRef,
}: AudioWaveProps) {
  const circlesRef = useRef<CircleData[]>([]);
  const dataArray = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!scene) return;

    const circles: CircleData[] = [];

    scene.traverse((object) => {
      if (
        object instanceof Mesh &&
        /^Circle00[1-5]$/.test(object.name)
      ) {
        const position = object.geometry.attributes.position;

        const originalPositions = new Float32Array(
          position.array
        );

        const verticesPerPoint =
          position.count / POINTS_PER_CIRCLE;

        const centers: {
          x: number;
          y: number;
          z: number;
        }[] = [];

        for (let point = 0; point < POINTS_PER_CIRCLE; point++) {
          let x = 0;
          let y = 0;
          let z = 0;

          const start = point * verticesPerPoint;

          for (
            let vertex = 0;
            vertex < verticesPerPoint;
            vertex++
          ) {
            const index = (start + vertex) * 3;

            x += originalPositions[index];
            y += originalPositions[index + 1];
            z += originalPositions[index + 2];
          }

          centers.push({
            x: x / verticesPerPoint,
            y: y / verticesPerPoint,
            z: z / verticesPerPoint,
          });
        }

        circles.push({
          mesh: object,
          originalPositions,
          centers,
        });
      }
    });

    circlesRef.current = circles;

    console.log(
      "Círculos preparados:",
      circles.length
    );
  }, [scene]);

  useFrame(() => {
    const analyser = analyserRef.current;
    const circles = circlesRef.current;

    if (!analyser || circles.length === 0) return;

    if (!dataArray.current) {
      dataArray.current = new Uint8Array(
        analyser.frequencyBinCount
      );
    }

    analyser.getByteFrequencyData(dataArray.current);

    circles.forEach((circleData, circleIndex) => {
      const {
        mesh,
        originalPositions,
        centers,
      } = circleData;

      const position =
        mesh.geometry.attributes.position;

      const verticesPerPoint =
        position.count / POINTS_PER_CIRCLE;

      for (
        let point = 0;
        point < POINTS_PER_CIRCLE;
        point++
      ) {
        const frequencyIndex = Math.floor(
          (point / POINTS_PER_CIRCLE) *
            dataArray.current!.length
        );

        const audioValue =
          dataArray.current![frequencyIndex] / 255;

        const strength =
            audioValue * 0.5;

        const center = centers[point];

        const length = Math.sqrt(
          center.x * center.x +
            center.y * center.y
        );

        if (length === 0) continue;

        const directionX = center.x / length;
        const directionY = center.y / length;

        const start = point * verticesPerPoint;

        for (
          let vertex = 0;
          vertex < verticesPerPoint;
          vertex++
        ) {
          const index = (start + vertex) * 3;

          const originalX =
            originalPositions[index];

          const originalY =
            originalPositions[index + 1];

          const originalZ =
            originalPositions[index + 2];

          position.array[index] =
            originalX + directionX * strength;

          position.array[index + 1] =
            originalY + directionY * strength;

          position.array[index + 2] =
            originalZ;
        }
      }

      position.needsUpdate = true;
    });
  });

  return null;
}