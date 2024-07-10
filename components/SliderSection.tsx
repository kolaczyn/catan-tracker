import { ThemedText } from "@/components/ThemedText";
import Slider from "@react-native-community/slider";
import { View } from "react-native";

type Props = {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  disabled?: boolean;
};

export const SliderSection = ({
  label,
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  disabled = false,
}: Props) => {
  return (
    <View>
      <ThemedText>{label}</ThemedText>
      <Slider
        disabled={disabled}
        style={{ width: 200, height: 40 }}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        step={1}
        maximumValue={maximumValue}
      />
    </View>
  );
};
