import { StyleSheet, View } from "react-native";

import AppContainer from "@/components/AppContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { boolToInt } from "@/utils/boolToInt";
import { vibrate } from "@/utils/vibrate";
import { WealthStatus } from "@/types/WealthStatus";
import { SwitchSection } from "@/components/SwitchSection";
import { SliderSection } from "@/components/SliderSection";
import { VictorySection } from "@/components/VictorySection";
import { BuildingSection } from "@/components/BuildingSection";
import { radioButtons } from "@/constants/radioButtons";
import { usePlayerStore } from "@/state/PlayerStore";
import { calcVictoryPoints } from "@/utils/calcVictoryPoints";

type Props = {
  label: string;
};

export const ScoreForm = ({ label }: Props) => {
  const state = usePlayerStore();

  const buildVillage = () => {
    state.buildVillage();
    vibrate();
  };

  const buildTown = () => {
    state.buildTown();
    vibrate();
  };

  const victoryPoints = calcVictoryPoints(state);

  return (
    <AppContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Punkty {label}</ThemedText>
      </ThemedView>

      <BuildingSection
        value={state.villages}
        setValue={state.setVillages}
        build={buildVillage}
        type="village"
      />
      <BuildingSection
        value={state.towns}
        setValue={state.setTowns}
        build={buildTown}
        type="town"
      />

      <SliderSection
        label={`Punktów zwycięstwa do wygrania (${state.max})`}
        value={state.max}
        onValueChange={state.setMax}
        minimumValue={0}
        maximumValue={20}
      />

      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        <SwitchSection
          onValueChange={state.setIsShoe}
          value={state.isShoe}
          label="But"
          modifier="-1"
        />
        <SwitchSection
          onValueChange={state.setIsLongestRoad}
          value={state.isLongestRoad}
          label="Drogi"
          modifier="+2"
        />
        <SwitchSection
          onValueChange={state.setIsMostKnights}
          value={state.isMostKnights}
          label="Rycerze"
          modifier="+2"
        />
        <SwitchSection
          onValueChange={state.setIsMostPorts}
          value={state.isMostPorts}
          label="Porty"
          modifier="+2"
        />
      </View>

      <SliderSection
        label={`Punktów zwycięstwa z kart (${state.victoryPointsFromCards})`}
        value={state.victoryPointsFromCards}
        onValueChange={state.setVictoryPointsFromCards}
        minimumValue={0}
        maximumValue={3}
      />

      <ThemedText>Bogactwo ({state.getWealthPoints()})</ThemedText>
      <RadioGroup
        radioButtons={radioButtons}
        layout="row"
        containerStyle={{
          backgroundColor: "white",
        }}
        onPress={(x) => state.setWealthStatus(x as WealthStatus)}
        selectedId={state.wealthStatus}
      />

      <VictorySection max={state.max} victoryPoints={victoryPoints} />
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
