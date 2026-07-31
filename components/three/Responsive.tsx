import { useThree } from "@react-three/fiber";

export default function useResponsive() {
  const { viewport } = useThree();

  const factor =
    viewport.width < 5
      ? 0.7
      : viewport.width < 8
      ? 0.85
      : 1;

  const adapt = (value: number) => value * factor;
  
  return {
    viewport,
    factor,
    adapt,
    isMobile: viewport.width < 5,
    isTablet: viewport.width >= 5 && viewport.width < 8,
    isDesktop: viewport.width >= 8,
  };
}