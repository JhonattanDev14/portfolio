import { create } from "zustand";

interface SceneState {
  scroll: number;
  section: number;

  setScroll: (value: number) => void;
  setSection: (section: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scroll: 0,
  section: 0,

  setScroll: (value) => set({ scroll: value }),
  setSection: (section) => set({ section }),
}));