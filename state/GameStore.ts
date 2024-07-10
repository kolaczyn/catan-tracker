import { create } from "zustand";
import { GameState } from "@/state/GameState";

export const gameStore = create<GameState>()((set, get) => ({
  max: 10,
  setMax: (max: number) => {
    set({ max });
  },
}));
