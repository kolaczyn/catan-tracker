import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const tabs = [
  {
    name: "index",
    title: "Ustawienia",
    color: "white",
  },
  {
    name: "blue",
    title: "Niebieski",
    color: "#62B6CB",
  },
  {
    name: "orange",
    title: "Pomarańczowy",
    color: "#F0A202",
  },
  {
    name: "white",
    title: "Biały",
    color: "#decdf5",
  },
  {
    name: "red",
    title: "Czerwony",
    color: "#E84855",
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={tab.color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
