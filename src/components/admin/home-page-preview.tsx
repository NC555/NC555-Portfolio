"use client";

import React from "react";
import HomePageContent from "@/components/HomePageContent";
import {
  InputAboutData,
  RawLifeStyle,
  RawTechStacks,
  GlobeConfig,
} from "@/types/about";
import { getIconComponent } from "@/config/icon-utils";

// Props for HomePagePreview itself
interface HomePagePreviewProps {
  aboutData: InputAboutData | null;
}
// --- End Local Type Definitions ---

const HomePagePreview: React.FC<HomePagePreviewProps> = ({ aboutData }) => {
  if (!aboutData) {
    return (
      <div className="p-4 text-center text-gray-500">Loading preview...</div>
    );
  }

  const {
    firstName,
    lastName,
    preferredName,
    introductionHeaderText,
    introduction,
    techStackHeaderText,
    techStacks,
    githubUsername,
    lifestyleHeaderText,
    lifestyles,
    globe,
  } = aboutData;

  // Use the header field directly if available, otherwise construct from name fields
  const header =
    aboutData.header ||
    (preferredName
      ? `About ${preferredName}`
      : `About ${firstName} ${lastName}`);

  const lifestylesWithComponents = aboutData?.lifestyles || [];
  const techStacksWithComponents = aboutData?.techStacks || {
    programmingLanguages: [],
    frameworks: [],
  };
  // --- End data preparation ---

  return (
    <div className="p-4 border rounded-lg bg-gray-50 overflow-auto relative">
      <HomePageContent
        header={header}
        introductionHeaderText={introductionHeaderText || ""}
        introduction={introduction || ""}
        techStackHeaderText={techStackHeaderText || ""}
        techStacks={techStacksWithComponents as any}
        githubUsername={githubUsername}
        lifestyleHeaderText={lifestyleHeaderText || ""}
        lifestyles={lifestylesWithComponents || []}
        globe={globe}
      />
    </div>
  );
};

export default HomePagePreview;
