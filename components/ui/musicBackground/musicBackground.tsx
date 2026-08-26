"use client";

export default function MusicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      <div
        className="absolute -left-[15%] top-[10%] h-[60%] w-[55%] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(76, 29, 149, 0.8), transparent 70%)",
        }}
      />

      <div
        className="absolute -right-[15%] top-[20%] h-[60%] w-[55%] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.7), transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[-25%] left-[20%] h-[60%] w-[60%] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.6), transparent 70%)",
        }}
      />
    </div>
  );
}