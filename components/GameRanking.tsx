import { playerStore } from "@/state/PlayerStore";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { PlayerState } from "@/state/PlayerState";
import { Player } from "@/types/Player";
import { useMemo } from "react";
import { gameStore } from "@/state/GameStore";

export const GameRanking = () => {
  const game = gameStore();
  const blue = playerStore.blue();
  const orange = playerStore.orange();
  const white = playerStore.white();
  const red = playerStore.red();

  const sorted = (() => {
    const result = (
      [
        [blue, "blue"],
        [orange, "orange"],
        [white, "white"],
        [red, "red"],
      ] as [PlayerState, Player][]
    ).map(([player, label]) => ({
      player,
      label,
      score: player.getVictoryPoints(),
    }));

    result.sort((a, b) => b.score - a.score);
    return result;
  })();

  const filteredSorted = sorted.filter((x) => game.players.includes(x.label));

  return (
    <View>
      {filteredSorted.map((x) => (
        <ThemedText key={x.label}>
          {x.label}: {x.score}
        </ThemedText>
      ))}
    </View>
  );
};
