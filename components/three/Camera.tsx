"use client";

import { PerspectiveCamera } from "@react-three/drei";
import useResponsive from "./Responsive";

export default function Camera() {

  const responsive = useResponsive();

  return (
    <PerspectiveCamera
      makeDefault
      position={[-0.9, 3, responsive.isMobile ? 6.5 : responsive.isTablet ? 5.7 : 5]}
      fov={80}
    />
  );
}