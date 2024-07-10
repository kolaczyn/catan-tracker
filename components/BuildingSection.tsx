import { ThemedText } from "@/components/ThemedText";
import Slider from "@react-native-community/slider";
import { Button, StyleSheet, View } from "react-native";
import { BuildingType } from "@/types/BuildingType";
import { buildingSettings } from "@/consts";

type Props = {
  value: number;
  setValue: (value: number) => void;
  build: () => void;
  type: BuildingType;
};

export const BuildingSection = ({ setValue, value, type, build }: Props) => {
  const { max, label } = buildingSettings[type];
  const canBuild = value < max;
  return (
    <View style={styles.build}>
      <ThemedText>
        {label} ({value})
      </ThemedText>
      <Slider
        style={{ width: 200, height: 40 }}
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        step={1}
        maximumValue={max}
      />
      <Button disabled={!canBuild} onPress={build} title="Buduj" />
    </View>
  );
};

const styles = StyleSheet.create({
  build: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
