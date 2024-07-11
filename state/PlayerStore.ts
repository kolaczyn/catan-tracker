import { create, StoreApi, UseBoundStore } from "zustand";
import { PlayerState } from "@/state/PlayerState";
import { Player } from "@/types/Player";
import { boolToInt } from "@/utils/boolToInt";
import { gameStore } from "@/state/GameStore";

export const createPlayerStore = (player: Player) =>
  create<PlayerState>()((set, get) => ({
    player,

    villages: 0,
    towns: 0,
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
    setVictoryPointsFromCards: (victoryPointsFromCards) => {
      set({ victoryPointsFromCards });
    },
    setWealthStatus: (wealthStatus) => {
      set({ wealthStatus });
    },

    getWealthPoints() {
      const { wealthStatus } = get();
      if (wealthStatus === "poor") return -2;
      if (wealthStatus === "rich") return 1;
      return 0;
    },

    getVictoryPoints() {
      const gameState = gameStore.getState();
      const isMostPorts = gameState.portPlayer === player;
      const isLongestRoad = gameState.roadsPlayer === player;
      const isMostKnights = gameState.knightsPlayer === player;
      const isShoe = gameState.shoePlayer === player;
      const s = get();

      return (
        s.villages +
        2 * s.towns +
        s.getWealthPoints() +
        2 * boolToInt(isLongestRoad) +
        2 * boolToInt(isMostKnights) +
        2 * boolToInt(isMostPorts) +
        s.victoryPointsFromCards +
        -1 * boolToInt(isShoe)
      );
    },
  }));

const useBluePlayerStore = createPlayerStore("blue");
const useOrangePlayerStore = createPlayerStore("orange");
const useWhitePlayerStore = createPlayerStore("white");
const useRedPlayerStore = createPlayerStore("red");

export const playerStore: Record<
  Player,
  UseBoundStore<StoreApi<PlayerState>>
> = {
  blue: useBluePlayerStore,
  orange: useOrangePlayerStore,
  white: useWhitePlayerStore,
  red: useRedPlayerStore,
};
