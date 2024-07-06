import { Button, Image, StyleSheet, Switch, View } from "react-native";

import AppContainer from "@/components/AppContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Slider from "@react-native-community/slider";
import { useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle } from "expo-haptics";

type WealthStatus = "poor" | "neutral" | "rich";

const radioButtons = [
  {
    id: "poor",
    label: "Biedny",
    value: "poor",
  },
  {
    id: "neutral",
    label: "Brak",
    value: "neutral",
  },
  {
    id: "rich",
    label: "Bogaty",
    value: "rich",
  },
];

const MAX_VILLAGES = 5;
const MAX_TOWNS = 4;

const boolToInt = (x: boolean) => (x ? 1 : 0);

const vibrate = () => {
  Haptics.impactAsync(ImpactFeedbackStyle.Soft);
};

type Props = {
  label: string;
};

export const BaseScreen = ({ label }: Props) => {
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
    setVillages(villages + 1);
    vibrate();
  };

  const canBuildVillage = villages < MAX_VILLAGES;
  const canBuildTown = villages > 0 && towns < MAX_TOWNS;

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

  const didWin = victoryPoints >= max;

  return (
    <AppContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Punkty {label}</ThemedText>
      </ThemedView>

      <View style={styles.build}>
        <ThemedText>Osady ({villages})</ThemedText>
        <Slider
          style={{ width: 200, height: 40 }}
          value={villages}
          onValueChange={setVillages}
          minimumValue={0}
          step={1}
          maximumValue={MAX_VILLAGES}
        />
        <Button
          disabled={!canBuildVillage}
          onPress={buildVillage}
          title="Buduj"
        />
      </View>

      <View style={styles.build}>
        <ThemedText>Miasta ({towns})</ThemedText>
        <Slider
          style={{ width: 200, height: 40 }}
          value={towns}
          onValueChange={setTowns}
          minimumValue={0}
          step={1}
          maximumValue={MAX_TOWNS}
        />
        <Button disabled={!canBuildTown} onPress={buildTown} title="Buduj" />
      </View>

      <ThemedText>Punktów zwycięstwa do wygrania ({max})</ThemedText>
      <Slider
        style={{ width: 200, height: 40 }}
        value={max}
        onValueChange={setMax}
        minimumValue={0}
        step={1}
        maximumValue={20}
      />

      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        <View style={styles.gridItem}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsShoe}
            value={isShoe}
          />
          <ThemedText>But</ThemedText>
        </View>

        <View style={styles.gridItem}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsLongestRoad}
            value={isLongestRoad}
          />
          <ThemedText>Drogi</ThemedText>
        </View>

        <View style={styles.gridItem}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsMostKnights}
            value={isMostKnights}
          />
          <ThemedText>Rycerze</ThemedText>
        </View>

        <View style={styles.gridItem}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsMostPorts}
            value={isMostPorts}
          />
          <ThemedText>Porty</ThemedText>
        </View>
      </View>

      <ThemedText>
        Punktów zwycięstwa z kart {victoryPointsFromCards}
      </ThemedText>
      <Slider
        style={{ width: 200, height: 40 }}
        value={victoryPointsFromCards}
        onValueChange={setVictoryPointsFromCards}
        minimumValue={0}
        step={1}
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

      <ThemedText style={styles.bigText}>
        Punkty zwycięstwa: {victoryPoints}
      </ThemedText>
      <ThemedText style={styles.bigText}>
        {didWin ? "Wygrałeś!" : `Brakuje: ${max - victoryPoints}`}
      </ThemedText>
    </AppContainer>
  );
};

const BlueScreen = () => <BaseScreen label="Niebieski" />;
export default BlueScreen;

const styles = StyleSheet.create({
  build: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gridItem: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    alignItems: "center",
    width: "50%",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
