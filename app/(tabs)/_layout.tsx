import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { gameStore } from "@/state/GameStore";

const tabs = [
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
  const game = gameStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ustawienia",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color="white"
            />
          ),
        }}
      />
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          listeners={{
            tabPress: (e) => {
              if (game.getIsPlaying(tab.name)) return;

              e.preventDefault();
            },
          }}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={game.getIsPlaying(tab.name) ? tab.color : "gray"}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
