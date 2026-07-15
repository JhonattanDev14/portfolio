"use client";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} />

      <directionalLight
          position={[5,5,5]}
          intensity={2}
          castShadow
      />
    </>
  );
}