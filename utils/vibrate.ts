import * as Haptics from "expo-haptics";
import { ImpactFeedbackStyle } from "expo-haptics";

export const vibrate = () => {
  Haptics.impactAsync(ImpactFeedbackStyle.Soft);
};
