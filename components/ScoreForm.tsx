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
import { radioButtons } from "@/constants/RadioButtons";
import { playerStore } from "@/state/PlayerStore";
import { Player } from "@/types/Player";
import { GameRanking } from "@/components/GameRanking";
import { gameStore } from "@/state/GameStore";

type Props = {
  player: Player;
  label: string;
};

export const ScoreForm = ({ player, label }: Props) => {
  const playerState = playerStore[player]();
  const gameState = gameStore();

  const buildVillage = () => {
    playerState.buildVillage();
    vibrate();
  };

  const buildTown = () => {
    playerState.buildTown();
    vibrate();
  };

  const victoryPoints = playerState.getVictoryPoints();

  return (
    <AppContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Punkty {label}</ThemedText>
      </ThemedView>

      <BuildingSection
        value={playerState.villages}
        setValue={playerState.setVillages}
        build={buildVillage}
        type="village"
      />
      <BuildingSection
        value={playerState.towns}
        setValue={playerState.setTowns}
        build={buildTown}
        type="town"
      />

      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {gameState.shoe && (
          <SwitchSection
            onValueChange={() => gameState.toggleShoePlayer(player)}
            value={gameState.shoePlayer === player}
            label="But"
            modifier="-1"
          />
        )}
        <SwitchSection
          onValueChange={() => gameState.toggleRoadsPlayer(player)}
          value={gameState.roadsPlayer === player}
          label="Drogi"
          modifier="+2"
        />
        <SwitchSection
          onValueChange={() => gameState.toggleKnightsPlayer(player)}
          value={gameState.knightsPlayer === player}
          label="Rycerze"
          modifier="+2"
        />
        {gameState.ports && (
          <SwitchSection
            onValueChange={() => gameState.togglePortPlayer(player)}
            value={gameState.portPlayer === player}
            label="Porty"
            modifier="+2"
          />
        )}
      </View>

      <SliderSection
        label={`Punktów zwycięstwa z kart (${playerState.victoryPointsFromCards})`}
        value={playerState.victoryPointsFromCards}
        onValueChange={playerState.setVictoryPointsFromCards}
        minimumValue={0}
        maximumValue={3}
      />

      <ThemedText>Bogactwo ({playerState.getWealthPoints()})</ThemedText>
      <RadioGroup
        radioButtons={radioButtons}
        layout="row"
        containerStyle={{
          backgroundColor: "white",
        }}
        onPress={(x) => playerState.setWealthStatus(x as WealthStatus)}
        selectedId={playerState.wealthStatus}
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
