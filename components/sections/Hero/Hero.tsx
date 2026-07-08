import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroImage from "./HeroImage";
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
            <HeroContent />
            <HeroButtons />

        </Container>/

        <HeroImage />
        <HeroBadge />
        <HeroParticles />
        <HeroScroll />
    </Section>
  );
}