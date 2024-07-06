import { Image, StyleSheet, Switch, Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Slider from "@react-native-community/slider";
import { useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";

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

export default function HomeScreen() {
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
  };

  const canBuildVillage = villages < MAX_VILLAGES;
  const canBuildTown = villages > 0 && towns < MAX_TOWNS;

  const buildTown = () => {
    setTowns((prev) => prev + 1);
    setVillages((prev) => prev - 1);
  };

  const wealthPoints = useMemo(() => {
    if (wealthStatus === "poor") return -2;
    if (wealthStatus === "rich") return 1;
    return 0;
  }, [wealthStatus]);

  const victoryPoints = Math.max(
    villages +
      2 * towns +
      wealthPoints +
      2 * boolToInt(isLongestRoad) +
      2 * boolToInt(isMostKnights) +
      2 * boolToInt(isMostPorts) +
      victoryPointsFromCards +
      -1 * boolToInt(isShoe),
    0,
  );
  const didWin = victoryPoints >= max;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Punkty zwycięstwa</ThemedText>
      </ThemedView>

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
        title="Buduj osadę"
      />

      <ThemedText>Miasta ({towns})</ThemedText>
      <Slider
        style={{ width: 200, height: 40 }}
        value={towns}
        onValueChange={setTowns}
        minimumValue={0}
        step={1}
        maximumValue={MAX_TOWNS}
      />
      <Button
        disabled={!canBuildTown}
        onPress={buildTown}
        title="Buduj miasto"
      />

      <ThemedText>Punktów zwycięstwa do wygrania ({max})</ThemedText>
      <Slider
        style={{ width: 200, height: 40 }}
        value={max}
        onValueChange={setMax}
        minimumValue={0}
        step={1}
        maximumValue={20}
      />

      <ThemedText>But</ThemedText>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsShoe}
        value={isShoe}
      />

      <ThemedText>Najwięcej dróg</ThemedText>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsLongestRoad}
        value={isLongestRoad}
      />

      <ThemedText>Najwięcej rycerzy</ThemedText>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsMostKnights}
        value={isMostKnights}
      />

      <ThemedText>Najwięcej portów</ThemedText>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setIsMostPorts}
        value={isMostPorts}
      />

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

      <ThemedText>Bogactwo</ThemedText>
      <RadioGroup
        radioButtons={radioButtons}
        layout="row"
        containerStyle={{
          backgroundColor: "white",
        }}
        onPress={(x) => setWealthStatus(x as WealthStatus)}
        selectedId={wealthStatus}
      />

      <ThemedText>Punkty zwycięstwa: {victoryPoints}</ThemedText>
      {didWin ? (
        <ThemedText>Masz {victoryPoints}. Wygrałeś!</ThemedText>
      ) : (
        <ThemedText>Brakuje: {max - victoryPoints}</ThemedText>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioButtons: {},
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
