import { Player } from "@/types/Player";

export type GameState = {
  max: number;
  setMax: (max: number) => void;

  players: Player[];
  togglePlayer: (player: Player) => void;
  getIsPlaying: (player: string) => boolean;

  shoe: boolean;
  setShoe: (shoe: boolean) => void;

  ports: boolean;
  setPorts: (ports: boolean) => void;

  isOn: boolean;
  toggleIsOn: () => void;
};
