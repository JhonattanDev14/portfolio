import Image from "next/image";
import Hero from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white">
      <h1 className="text-5xl font-bold">
        <Hero />
      </h1>
    </main>
  );
}