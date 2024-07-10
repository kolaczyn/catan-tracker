import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

type Props = {
  onValueChange: (value: boolean) => void;
  value: boolean;
  label: string;
  modifier: string;
  disabled?: boolean;
};

export const SwitchSection = ({
  label,
  value,
  onValueChange,
  modifier,
  disabled = false,
}: Props) => {
  return (
    <View style={styles.gridItem}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
      />
      <ThemedText>
        {label} {modifier && value && <> ({modifier})</>}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    alignItems: "center",
    width: "50%",
  },
});
