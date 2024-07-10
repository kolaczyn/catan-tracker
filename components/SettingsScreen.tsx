import { ThemedText } from "@/components/ThemedText";
import AppContainer from "@/components/AppContainer";
import { SliderSection } from "@/components/SliderSection";
import { gameStore } from "@/state/GameStore";

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
    </AppContainer>
  );
};
