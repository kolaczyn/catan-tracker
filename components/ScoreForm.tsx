import { StyleSheet, View } from "react-native";

import AppContainer from "@/components/AppContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RadioGroup from "react-native-radio-buttons-group";
import { vibrate } from "@/utils/vibrate";
import { WealthStatus } from "@/types/WealthStatus";
import { SwitchSection } from "@/components/SwitchSection";
import { SliderSection } from "@/components/SliderSection";
import { VictorySection } from "@/components/VictorySection";
import { BuildingSection } from "@/components/BuildingSection";
import { radioButtons } from "@/constants/radioButtons";
import { playerStore } from "@/state/PlayerStore";
import { Player } from "@/types/Player";
import { GameRanking } from "@/components/GameRanking";

type Props = {
  player: Player;
  label: string;
};

export const ScoreForm = ({ player, label }: Props) => {
  const state = playerStore[player]();

  const buildVillage = () => {
    state.buildVillage();
    vibrate();
  };

  const buildTown = () => {
    state.buildTown();
    vibrate();
  };

  const victoryPoints = state.getVictoryPoints();

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

      <VictorySection victoryPoints={victoryPoints} />
      <GameRanking />
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
