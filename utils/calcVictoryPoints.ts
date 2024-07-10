import { PlayerState } from "@/state/PlayerState";
import { boolToInt } from "@/utils/boolToInt";

export const calcVictoryPoints = ({
  victoryPointsFromCards,
  isMostKnights,
  isMostPorts,
  towns,
  isLongestRoad,
  isShoe,
  villages,
  getWealthPoints,
}: PlayerState) => {
  return (
    villages +
    2 * towns +
    getWealthPoints() +
    2 * boolToInt(isLongestRoad) +
    2 * boolToInt(isMostKnights) +
    2 * boolToInt(isMostPorts) +
    victoryPointsFromCards +
    -1 * boolToInt(isShoe)
  );
};
