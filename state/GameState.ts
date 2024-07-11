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

  ports: boolean;
  setPorts: (ports: boolean) => void;
  portPlayer: Player | null;
  togglePortPlayer: (player: Player | null) => void;

  knightsPlayer: Player | null;
  toggleKnightsPlayer: (player: Player | null) => void;

  roadsPlayer: Player | null;
  toggleRoadsPlayer: (player: Player | null) => void;
};
