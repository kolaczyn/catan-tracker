import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type Props = {
  victoryPoints: number;
  max: number;
};

export const VictorySection = ({ victoryPoints, max }: Props) => {
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
