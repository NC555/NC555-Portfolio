// https://github.com/afiiif/pokemon-world/blob/main/src/types/pokemon.ts

import type { VCardIconType } from "@/types/config";

// Interface for HomePageContent component props
export interface HomePageContentProps {
  header: string;
  introduction: string;
  introductionHeaderText: string;
  lifestyles: RawLifeStyle[];
  techStacks: RawTechStacks;
  githubUsername: string;
  globe: GlobeConfig;
  lifestyleHeaderText: string;
  techStackHeaderText: string;
  posts?: any[];
}

// Interface for admin editor input data
export interface HomeConfig {
  about: InputAboutData;
}

// Interface for the data expected by HomePagePreview
export interface InputAboutData {
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  additionalName: string;
  pronouns: string;
  header: string;
  introduction: string;
  introductionHeaderText: string;
  lifestyles: RawLifeStyle[];
  techStacks: RawTechStacks;
  githubUsername: string;
  globe: GlobeConfig;
  lifestyleHeaderText: string;
  techStackHeaderText: string;
}

// Supporting types for the above interfaces
export interface RawLifeStyle {
  icon: string;
  title: string;
  text: string;
}

export interface RawTechStack {
  name: string;
  icon: string;
}

export interface RawTechStacks {
  techStackHeaderText: string;
  programmingLanguages: RawTechStack[];
  frameworks: RawTechStack[];
}

export interface GlobeConfig {
  markerLocation: [number, number];
  locationString: string;
}
