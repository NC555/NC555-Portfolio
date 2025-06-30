"use client";

import React, { useEffect, useState, useMemo } from "react";
import HomePageContent from "@/components/HomePageContent";
import {
  InputAboutData,
  RawLifeStyle,
  RawTechStacks,
  // GlobeConfig, // Used via InputAboutData
  // TransformedLifeStyle, // No longer directly used for props
  // TransformedTechStacks, // No longer directly used for props
  // TransformedTechStack, // No longer directly used for props
} from "@/types/about";
import { getIconComponent } from "@/config/icon-utils";
import markdownToHtml from "@/lib/markdownToHtml"; // For processing introduction

// Props for HomePagePreview itself
interface HomePagePreviewProps {
  aboutData: InputAboutData | null;
}

const HomePagePreview: React.FC<HomePagePreviewProps> = ({ aboutData }) => {
  const [introductionHtml, setIntroductionHtml] = useState("");

  useEffect(() => {
    if (aboutData?.introduction) {
      // This is similar to processIntroduction in page.tsx, adjusted for client-side
      const processIntro = async () => {
        // This is simplified to directly convert markdown to HTML, matching page.tsx
        setIntroductionHtml(await markdownToHtml(aboutData.introduction));
      };
      processIntro();
    } else {
      setIntroductionHtml("");
    }
  }, [aboutData?.introduction]);

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
    techStackHeaderText,
    githubUsername,
    lifestyleHeaderText,
    globe,
    lifestyles, // Raw lifestyles from aboutData
    techStacks, // Raw techStacks from aboutData
  } = aboutData;

  const header =
    aboutData.header ||
    (preferredName
      ? `About ${preferredName}`
      : `About ${firstName} ${lastName}`);

  return (
    <div className="p-4 border rounded-lg bg-gray-50 overflow-auto relative">
      <HomePageContent
        header={header}
        introductionHtml={introductionHtml}
        introductionHeaderText={introductionHeaderText || ""}
        techStackHeaderText={techStackHeaderText}
        techStacks={techStacks} // Pass raw techStacks
        githubUsername={githubUsername}
        lifestyleHeaderText={lifestyleHeaderText || ""}
        lifestyles={lifestyles} // Pass raw lifestyles
        globe={globe}
        // posts prop is optional in HomePageContent
      />
    </div>
  );
};

export default HomePagePreview;
