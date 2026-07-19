import { create } from "zustand";

interface SceneState {
  scroll: number;
  setScroll: (value: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
    scroll: 0,
    setScroll: (value) => set({ scroll: value }),
    section: 0,
    setSection: (section: number) => set({ section }),
}));