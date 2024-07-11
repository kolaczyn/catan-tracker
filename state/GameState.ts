import { Player } from "@/types/Player";

export type GameState = {
  max: number;
  setMax: (max: number) => void;

  players: Player[];
  togglePlayer: (player: Player) => void;
  getIsPlaying: (player: string) => boolean;

  shoe: boolean;
  setShoe: (shoe: boolean) => void;
  shoePlayer: Player | null;
  toggleShoePlayer: (player: Player | null) => void;

  harbors: boolean;
  setHarbors: (harbors: boolean) => void;
  harborPlayer: Player | null;
  toggleHarborPlayer: (player: Player | null) => void;

  knightsPlayer: Player | null;
  toggleKnightsPlayer: (player: Player | null) => void;

  roadsPlayer: Player | null;
  toggleRoadsPlayer: (player: Player | null) => void;
};
