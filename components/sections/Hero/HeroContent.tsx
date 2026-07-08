import Title from "@/components/ui/title/title";
import Text from "@/components/ui/text/text";

export default function HeroContent() {
  return (
    <div className="max-w-2xl">
      <p className="text-lg">Hola, soy</p>

      <Title className="mt-2">
        Jhonattan Rojas
      </Title>

      <h3 className="mt-4 text-2xl font-semibold">
        Full Stack Developer
      </h3>

      <Text className="mt-6">
        Desarrollo aplicaciones web modernas utilizando Laravel,
        Next.js, React, TypeScript, MySQL e Inteligencia Artificial.
      </Text>
    </div>
  );
}