import { WealthStatus } from "@/types/WealthStatus";

export type PlayerState = {
  villages: number;
  towns: number;
  max: number;
  isShoe: boolean;
  isLongestRoad: boolean;
  isMostKnights: boolean;
  isMostPorts: boolean;
  victoryPointsFromCards: number;
  wealthStatus: WealthStatus;

  buildVillage: () => void;
  buildTown: () => void;

  setVillages: (villages: number) => void;
  setTowns: (towns: number) => void;
  setMax: (max: number) => void;
  setIsShoe: (isShoe: boolean) => void;
  setIsLongestRoad: (isLongestRoad: boolean) => void;
  setIsMostKnights: (isMostKnights: boolean) => void;
  setIsMostPorts: (isMostPorts: boolean) => void;
  setVictoryPointsFromCards: (victoryPointsFromCards: number) => void;
  setWealthStatus: (wealthStatus: WealthStatus) => void;

  getWealthPoints: () => number;
};
