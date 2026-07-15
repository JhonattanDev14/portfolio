import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroParticles from "./HeroParticles";
import HeroScroll from "./HeroScroll";
import HeroBadge from "./HeroBadge";
import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import Scene from "@/components/three/Scene";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
      <Scene />
    </section>
  );
}