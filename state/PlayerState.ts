import { WealthStatus } from "@/types/WealthStatus";
import { Player } from "@/types/Player";

export type PlayerState = {
  player: Player;

  villages: number;
  towns: number;
  victoryPointsFromCards: number;
  wealthStatus: WealthStatus;

  buildVillage: () => void;
  buildTown: () => void;

  setVillages: (villages: number) => void;
  setTowns: (towns: number) => void;
  setVictoryPointsFromCards: (victoryPointsFromCards: number) => void;
  setWealthStatus: (wealthStatus: WealthStatus) => void;

  getWealthPoints: () => number;
  getVictoryPoints: () => number;
};
