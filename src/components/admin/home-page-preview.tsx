"use client";

import React, { useEffect, useState, useMemo } from "react";
import HomePageContent from "@/components/HomePageContent";
import {
  InputAboutData,
  // RawLifeStyle, // Not directly used for props anymore
  // RawTechStacks, // Not directly used for props anymore
  // GlobeConfig, // Used via InputAboutData
  TransformedLifeStyle,
  TransformedTechStacks,
  TransformedTechStack,
} from "@/types/about";
import { getIconComponent } from "@/config/icon-utils";
import markdownToHtml from "@/lib/markdownToHtml"; // For processing introduction

// Props for HomePagePreview itself
interface HomePagePreviewProps {
  aboutData: InputAboutData | null;
}

// Local mapIcons utility
const mapDataWithIcons = (data: any[], iconKey: string = "icon"): any[] => {
  if (!data) return [];
  return data.map((item) => {
    const newItem = { ...item };
    if (typeof newItem[iconKey] === "string") {
      const IconComponent = getIconComponent(newItem[iconKey]);
      newItem[iconKey] = React.createElement(IconComponent);
    }
    return newItem;
  });
};

const HomePagePreview: React.FC<HomePagePreviewProps> = ({ aboutData }) => {
  const [introductionHtml, setIntroductionHtml] = useState("");

  useEffect(() => {
    if (aboutData?.introduction) {
      // This is similar to processIntroduction in page.tsx, adjusted for client-side
      const processIntro = async () => {
        const trimmedIntro = aboutData.introduction.trim();
        let htmlPart = "";
        let textPart = trimmedIntro;

        if (trimmedIntro.startsWith("<")) {
          const lastClosingTagIndex = trimmedIntro.lastIndexOf(">");
          if (lastClosingTagIndex !== -1) {
            htmlPart = trimmedIntro.substring(0, lastClosingTagIndex + 1);
            textPart = trimmedIntro.substring(lastClosingTagIndex + 1).trim();
          }
        }

        let processedTextPart = "";
        if (textPart) {
          if (textPart.match(/[#*`-]/) || !textPart.startsWith("<p>")) {
            processedTextPart = await markdownToHtml(textPart);
          } else {
            processedTextPart = textPart;
          }
        }
        setIntroductionHtml(
          htmlPart +
            (processedTextPart ? (htmlPart ? " " : "") + processedTextPart : "")
        );
      };
      processIntro();
    } else {
      setIntroductionHtml("");
    }
  }, [aboutData?.introduction]);

  // Memoize transformed data to avoid re-computation on every render
  const transformedLifestyles = useMemo(() => {
    if (!aboutData?.lifestyles) return [];
    return mapDataWithIcons(aboutData.lifestyles) as TransformedLifeStyle[];
  }, [aboutData?.lifestyles]);

  const transformedTechStacksProp = useMemo(():
    | TransformedTechStacks
    | undefined => {
    if (!aboutData?.techStacks) return undefined;
    const languages = mapDataWithIcons(
      aboutData.techStacks.programmingLanguages
    ) as TransformedTechStack[];
    const frameworks = mapDataWithIcons(
      aboutData.techStacks.frameworks
    ) as TransformedTechStack[];
    return {
      programmingLanguages: languages,
      frameworks: frameworks,
      techStackHeaderText: aboutData.techStacks.techStackHeaderText || "",
    };
  }, [aboutData?.techStacks]);

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
    // introduction, // Handled by useEffect
    techStackHeaderText, // Used if transformedTechStacksProp.techStackHeaderText is not preferred
    // techStacks, // Handled by useMemo
    githubUsername,
    lifestyleHeaderText,
    // lifestyles, // Handled by useMemo
    globe,
  } = aboutData;

  const header =
    aboutData.header ||
    (preferredName
      ? `About ${preferredName}`
      : `About ${firstName} ${lastName}`);

  if (!transformedTechStacksProp) {
    // Or some placeholder, this case should ideally not happen if aboutData.techStacks is present
    return (
      <div className="p-4 text-center">Preparing tech stacks preview...</div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50 overflow-auto relative">
      <HomePageContent
        header={header}
        introductionHtml={introductionHtml}
        introductionHeaderText={introductionHeaderText || ""}
        techStackHeaderText={
          techStackHeaderText || transformedTechStacksProp.techStackHeaderText
        } // Provide fallback or specific one
        techStacks={transformedTechStacksProp}
        githubUsername={githubUsername}
        lifestyleHeaderText={lifestyleHeaderText || ""}
        lifestyles={transformedLifestyles}
        globe={globe}
        // posts prop is optional in HomePageContent
      />
    </div>
  );
};

export default HomePagePreview;
