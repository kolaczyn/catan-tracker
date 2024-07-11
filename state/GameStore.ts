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

  shoe: false,
  setShoe: (shoe: boolean) => {
    set({ shoe });
  },
  shoePlayer: null,
  toggleShoePlayer: (player: Player | null) => {
    set({ shoePlayer: get().shoePlayer === player ? null : player });
  },

  harbors: true,
  setHarbors: (harbors: boolean) => {
    set({ harbors });
  },
  harborPlayer: null,
  toggleHarborPlayer: (player: Player | null) => {
    set({ harborPlayer: get().harborPlayer === player ? null : player });
  },

  knightsPlayer: null,
  toggleKnightsPlayer: (player: Player | null) => {
    set({ knightsPlayer: get().knightsPlayer === player ? null : player });
  },

  roadsPlayer: null,
  toggleRoadsPlayer: (player: Player | null) => {
    set({ roadsPlayer: get().roadsPlayer === player ? null : player });
  },
}));
