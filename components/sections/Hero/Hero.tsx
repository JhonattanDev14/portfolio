import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroVisual from "./HeroVisual";
import HeroParticles from "./HeroParticles";
import HeroScroll from "./HeroScroll";
import HeroBadge from "./HeroBadge";
import Container from "@/components/layout/container";
import Section from "@/components/layout/section";

export default function Hero() {
  return (
    <Section>
        <HeroBackground />

        <Container className="relative z-10 flex min-h-screen items-center justify-between">
            <div>
            <HeroContent />
            <HeroButtons />
            </div>

            <HeroVisual />
        </Container>

        <HeroBadge />
        <HeroParticles />
        <HeroScroll />
    </Section>
  );
}