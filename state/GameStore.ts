import { create } from "zustand";
import { GameState } from "@/state/GameState";
import { Player } from "@/types/Player";

export const gameStore = create<GameState>()((set, get) => ({
  max: 10,
  setMax: (max: number) => {
    set({ max });
  },

  players: ["blue", "orange", "white"],
  togglePlayer: (player: Player) => {
    set((state) => {
      const players = state.players.includes(player)
        ? state.players.filter((p) => p !== player)
        : [...state.players, player];
      return { players };
    });
  },

  getIsPlaying: (player: string) => get().players.some((x) => x === player),
}));
