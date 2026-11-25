"use client";

export default function Lights() {
  return (
    <>
      {/* Luz ambiental */}
      <ambientLight intensity={0.5}/>

      {/* Luz principal */}
      <directionalLight
        position={[-5, 4, 3]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-bias={-0}
        shadow-mapSize={[2048, 2048]}
        shadow-radius={4}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight
        position={[5, 10, -5]}
        intensity={2}
        color="#e96bf4"
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight
        position={[-1, 10, -9]}
        intensity={3}
        color="#f88c52"
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight
        position={[5, 10, -4]}
        intensity={1.5}
        color="#89e5ff"
      />
    </>
  );
}
