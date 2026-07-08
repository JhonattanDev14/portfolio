import Button from "@/components/ui/button/button";

export default function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Button>Ver proyectos</Button>

      <Button variant="secondary">
        Contactarme
      </Button>
    </div>
  );
}