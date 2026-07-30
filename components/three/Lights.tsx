"use client";

export default function Lights() {
  return (
    <>
      {/* Luz ambiental */}
      <ambientLight intensity={0.12} />

      Luz principal
      <directionalLight
        position={[-6, 8, 4]}
        intensity={9}
        color="#b8b8b8"
        castShadow
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight
        position={[20, 10, 1]}
        intensity={2}
        color="#e96bf4"
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight
        position={[-1, 10, -9]}
        intensity={1}
        color="#f88c52"
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight
        position={[5, 10, -5]}
        intensity={2}
        color="#89e5ff"
      />
    </>
  );
}