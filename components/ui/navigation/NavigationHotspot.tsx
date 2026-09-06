"use client";

import { Html } from "@react-three/drei";
import { Vector3 } from "three";

interface NavigationHotspotProps {
  // Posición del hotspot.
  position: Vector3;

  // Texto del hotspot.
  label: string;

  // Clase CSS del hotspot.
  className?: string;

  // Acción de navegación.
  onNavigate: () => void;
}

export default function NavigationHotspot({
  position,
  label,
  className,
  onNavigate,
}: NavigationHotspotProps) {
  return (
    <Html
      position={position}
      center
      transform={false}
      zIndexRange={[100, 0]}
    >
      <button
        className={className}
        style={{
          cursor: "pointer",
          pointerEvents: "auto",
        }}
        onClick={onNavigate}
      >
        {label}
      </button>
    </Html>
  );
}