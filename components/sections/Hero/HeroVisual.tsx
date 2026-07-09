import { useMemo } from "react";


export default function HeroVisual() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
    }));
  }, []);
  return (
    <div className="relative flex h-[450px] w-[450px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10">
      <div className="absolute rounded-full bg-blue-400" />

      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute h-2 w-2 rounded-full bg-blue-400"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            speedX: particle.speedX,
            speedY: particle.speedY
          }}
        />
      ))}
    </div>
  );
}