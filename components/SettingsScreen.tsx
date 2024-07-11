import { ThemedText } from "@/components/ThemedText";
import AppContainer from "@/components/AppContainer";
import { SliderSection } from "@/components/SliderSection";
import { gameStore } from "@/state/GameStore";
import { players } from "@/constants/Players";
import { View, StyleSheet, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox/lib";
import { SwitchSection } from "@/components/SwitchSection";

export const SettingsScreen = () => {
  const state = gameStore();
  return (
    <AppContainer>
      <ThemedText type="title">Ustawienia</ThemedText>

      <SliderSection
        label={`Punktów zwycięstwa do wygrania (${state.max})`}
        value={state.max}
        onValueChange={state.setMax}
        minimumValue={0}
        maximumValue={20}
      />

      <ThemedText>Gracze</ThemedText>
      {players.map((player) => (
        <View key={player} style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={state.players.includes(player)}
            onPress={() => state.togglePlayer(player)}
          />
          <ThemedText>{player}</ThemedText>
        </View>
      ))}

      <View>
        <ThemedText>Modyfikatory</ThemedText>

        <SwitchSection
          onValueChange={state.setShoe}
          value={state.shoe}
          label="But"
          modifier=""
        />
        <SwitchSection
          onValueChange={state.setPorts}
          value={state.ports}
          label="Porty"
          modifier=""
        />
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 20,
  },
});
