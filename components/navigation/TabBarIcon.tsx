// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import { ColorValue } from "react-native";

type Props = IconProps<ComponentProps<typeof Ionicons>["name"]> & {
  color: ColorValue;
};

export function TabBarIcon({ style, color, ...rest }: Props) {
  return (
    <Ionicons
      size={28}
      style={[{ marginBottom: -3, color }, style]}
      {...rest}
    />
  );
}
