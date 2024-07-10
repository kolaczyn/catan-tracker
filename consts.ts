import { BuildingType } from "@/types/BuildingType";

type BuildingSetting = {
  max: number;
  label: string;
};

export const buildingSettings: Record<BuildingType, BuildingSetting> = {
  village: {
    max: 5,
    label: "Osady",
  },
  town: {
    max: 4,
    label: "Miasta",
  },
};
