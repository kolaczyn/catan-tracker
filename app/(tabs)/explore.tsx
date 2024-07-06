import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import AppContainer from "@/components/AppContainer";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  return (
    <AppContainer>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Info</ThemedText>
      </ThemedView>
      <ThemedText>Stworzone przez: Paweł Kołaczyński</ThemedText>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
