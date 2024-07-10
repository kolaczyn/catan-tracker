import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { gameStore } from "@/state/GameStore";

type Props = {
  victoryPoints: number;
};

export const VictorySection = ({ victoryPoints }: Props) => {
  const max = gameStore().max;
  const didWin = victoryPoints >= max;
  return (
    <View style={styles.spacing}>
      <ThemedText type="title">Punkty zwycięstwa: {victoryPoints}</ThemedText>
      <ThemedText type="title">
        {didWin ? "Wygrałeś!" : `Brakuje: ${max - victoryPoints}`}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  spacing: {
    gap: 12,
  },
});
