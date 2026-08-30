"use client";

import { Canvas } from "@react-three/fiber";
import SceneContent from "./SceneContent";
import { useCallback, useRef, useState } from "react";

import Preloader from "@/components/ui/preloader/preloader";
import Resources from "./Resources";
import MusicPlayer from "@/components/ui/musicPlayer/musicPlayer";
import MusicBackground from "@/components/ui/musicBackground/musicBackground";
import NavigationMenu from "@/components/ui/navigation/NavigationMenu";

export default function Scene() {
  /*
   * Indica si la escena terminó su proceso inicial
   * y está lista para ser utilizada.
   */
  const [ready, setReady] = useState(false);

  /*
   * Identifica qué menú de UI debe mostrarse.
   *
   * undefined = no hay menú.
   * "skills" = mostrar SkillsMenu.
   * "aboutMe" = mostrar AboutMeMenu, etc.
   */
  const [activeMenu, setActiveMenu] =
    useState<string | undefined>();

  /*
   * Controla cuándo terminaron de cargar
   * los recursos necesarios de la escena.
   */
  const [resourcesLoaded, setResourcesLoaded] =
    useState(false);

  /*
   * Referencia utilizada por el sistema de música
   * para analizar el audio.
   */
  const analyserRef =
    useRef<AnalyserNode | null>(null);

  /*
   * Callback ejecutado cuando Resources
   * termina de cargar los recursos.
   */
  const handleResourcesLoaded =
    useCallback(() => {
      setResourcesLoaded(true);
    }, []);

  return (
    <>
      {/* Fondo musical/visual de la página */}
      <MusicBackground />

      {/*
       * Canvas:
       *
       * Todo lo que está aquí pertenece al mundo 3D.
       */}
      <Canvas className="relative z-10 h-screen w-full">
        <Resources
          onLoaded={handleResourcesLoaded}
        />

        <SceneContent
          ready={ready}
          analyserRef={analyserRef}
          onMenuChange={setActiveMenu}
        />
      </Canvas>

      {/*
       * Preloader:
       * se muestra mientras la escena todavía no está lista.
       */}
      {!ready && (
        <Preloader
          timer={3000}
          resourcesLoaded={resourcesLoaded}
          onFinish={() => setReady(true)}
        />
      )}

      {/*
       * Reproductor de música:
       * solamente aparece cuando la escena está lista.
       */}
      {ready && (
        <MusicPlayer
          enabled={ready}
          analyserRef={analyserRef}
        />
      )}

      {/*
       * UI de navegación:
       *
       * IMPORTANTE:
       * Está fuera del Canvas.
       *
       * Por lo tanto, no pertenece al mundo 3D
       * y no se moverá cuando cambie la cámara.
       */}
      {ready && activeMenu && (
        <NavigationMenu
          menu={activeMenu}
        />
      )}
    </>
  );
}
