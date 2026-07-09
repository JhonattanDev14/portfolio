"use client";

export default function Lights() {
  return (
    <>
        <ambientLight intensity={0} />

        <directionalLight
            position={[3, 3, 3]}
            intensity={10}
            color="white"
        />
    </>
  );
}