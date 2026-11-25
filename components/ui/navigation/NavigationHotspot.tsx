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
        type="button"
        aria-label={`Navigate to ${label}`}
        className={`group relative grid h-6 w-6 place-items-center border-0 bg-transparent p-0 text-white outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 ${className ?? ""}`}
        onClick={onNavigate}
      >
        <span
          aria-hidden="true"
          className="relative grid h-5 w-5 place-items-center"
        >
          <span className="absolute inset-0 rounded-full border border-blue-300/80 shadow-[0_0_11px_rgba(37,99,235,0.7)] transition-all duration-300 group-hover:scale-125 group-hover:border-cyan-200 group-hover:shadow-[0_0_17px_rgba(34,211,238,0.85)]" />
          <span className="absolute inset-[3px] rounded-full border border-white/70 bg-[#07101d]/85 backdrop-blur-sm" />
          <span className="relative h-1 w-1 rounded-full bg-blue-300 shadow-[0_0_6px_2px_rgba(59,130,246,0.9)] transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-200 group-hover:shadow-[0_0_8px_3px_rgba(34,211,238,0.95)]" />
        </span>

        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 translate-y-1 rounded-sm border border-blue-200/60 bg-[#07101d]/90 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white opacity-0 shadow-[0_0_11px_rgba(37,99,235,0.4)] backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:border-cyan-200 group-hover:text-cyan-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:border-cyan-200 group-focus-visible:text-cyan-100 group-focus-visible:opacity-100">
          {label}
        </span>
      </button>
    </Html>
  );
}
