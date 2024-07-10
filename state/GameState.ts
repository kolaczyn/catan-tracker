import { Player } from "@/types/Player";

export type GameState = {
  max: number;
  setMax: (max: number) => void;

  players: Player[];
  togglePlayer: (player: Player) => void;

  getIsPlaying: (player: string) => boolean;
};
