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

type Props = {
  label: string;
};

export const ScoreForm = ({ label }: Props) => {
  const [villages, setVillages] = useState(0);
  const [towns, setTowns] = useState(0);
  const [max, setMax] = useState(10);
  const [isShoe, setIsShoe] = useState(false);
  const [isLongestRoad, setIsLongestRoad] = useState(false);
  const [isMostKnights, setIsMostKnights] = useState(false);
  const [isMostPorts, setIsMostPorts] = useState(false);
  const [victoryPointsFromCards, setVictoryPointsFromCards] = useState(0);
  const [wealthStatus, setWealthStatus] = useState<WealthStatus>("neutral");

  const buildVillage = () => {
    setVillages((prev) => prev + 1);
    vibrate();
  };

  const buildTown = () => {
    setTowns((prev) => prev + 1);
    setVillages((prev) => prev - 1);
    vibrate();
  };

  const wealthPoints = useMemo(() => {
    if (wealthStatus === "poor") return -2;
    if (wealthStatus === "rich") return 1;
    return 0;
  }, [wealthStatus]);

  const victoryPoints =
    villages +
    2 * towns +
    wealthPoints +
    2 * boolToInt(isLongestRoad) +
    2 * boolToInt(isMostKnights) +
    2 * boolToInt(isMostPorts) +
    victoryPointsFromCards +
    -1 * boolToInt(isShoe);

  return (
    <AppContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Punkty {label}</ThemedText>
      </ThemedView>

      <BuildingSection
        value={villages}
        setValue={setVillages}
        build={buildVillage}
        type="village"
      />
      <BuildingSection
        value={towns}
        setValue={setTowns}
        build={buildTown}
        type="town"
      />

      <SliderSection
        label={`Punktów zwycięstwa do wygrania (${victoryPointsFromCards})`}
        value={max}
        onValueChange={setMax}
        minimumValue={0}
        maximumValue={20}
      />

      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        <SwitchSection
          onValueChange={setIsShoe}
          value={isShoe}
          label="But"
          modifier="-1"
        />
        <SwitchSection
          onValueChange={setIsLongestRoad}
          value={isLongestRoad}
          label="Drogi"
          modifier="+2"
        />
        <SwitchSection
          onValueChange={setIsMostKnights}
          value={isMostKnights}
          label="Rycerze"
          modifier="+2"
        />
        <SwitchSection
          onValueChange={setIsMostPorts}
          value={isMostPorts}
          label="Porty"
          modifier="+2"
        />
      </View>

      <SliderSection
        label={`Punktów zwycięstwa z kart (${victoryPointsFromCards})`}
        value={victoryPointsFromCards}
        onValueChange={setVictoryPointsFromCards}
        minimumValue={0}
        maximumValue={3}
      />

      <ThemedText>Bogactwo ({wealthPoints})</ThemedText>
      <RadioGroup
        radioButtons={radioButtons}
        layout="row"
        containerStyle={{
          backgroundColor: "white",
        }}
        onPress={(x) => setWealthStatus(x as WealthStatus)}
        selectedId={wealthStatus}
      />

      <VictorySection max={max} victoryPoints={victoryPoints} />
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
