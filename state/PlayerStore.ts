import { create, StoreApi, UseBoundStore } from "zustand";
import { PlayerState } from "@/state/PlayerState";
import { Player } from "@/types/Player";

export const createPlayerStore = () =>
  create<PlayerState>()((set, get) => ({
    villages: 0,
    towns: 0,
    max: 10,
    isLongestRoad: false,
    isMostKnights: false,
    isMostPorts: false,
    isShoe: false,
    victoryPointsFromCards: 0,
    wealthStatus: "neutral",

    buildVillage: () => {
      set((state) => ({ villages: state.villages + 1 }));
    },
    buildTown: () => {
      set((state) => ({
        villages: state.villages - 1,
        towns: state.towns + 1,
      }));
    },

    setTowns: (towns) => {
      set({ towns });
    },
    setVillages: (villages) => {
      set({ villages });
    },
    setMax: (max) => {
      set({ max });
    },
    setIsShoe: (isShoe) => {
      set({ isShoe });
    },
    setIsLongestRoad: (isLongestRoad) => {
      set({ isLongestRoad });
    },
    setIsMostKnights: (isMostKnights) => {
      set({ isMostKnights });
    },
    setIsMostPorts: (isMostPorts) => {
      set({ isMostPorts });
    },
    setVictoryPointsFromCards: (victoryPointsFromCards) => {
      set({ victoryPointsFromCards });
    },
    setWealthStatus: (wealthStatus) => {
      set({ wealthStatus });
    },

    getWealthPoints() {
      const wealthStatus = get().wealthStatus;
      if (wealthStatus === "poor") return -2;
      if (wealthStatus === "rich") return 1;
      return 0;
    },
  }));

export const useBluePlayerStore = createPlayerStore();
const useOrangePlayerStore = createPlayerStore();
const useWhitePlayerStore = createPlayerStore();
const useRedPlayerStore = createPlayerStore();

export const playerStore: Record<
  Player,
  UseBoundStore<StoreApi<PlayerState>>
> = {
  blue: useBluePlayerStore,
  orange: useOrangePlayerStore,
  white: useWhitePlayerStore,
  red: useRedPlayerStore,
};
