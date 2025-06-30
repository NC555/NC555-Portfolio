import React from "react"; // Import React for React.createElement
import HomePageContent from "@/components/HomePageContent";
import markdownToHtml from "@/lib/markdownToHtml";
// import { LatestArticles } from "@/components/home/latest-articles"; // No longer needed here
import homeConfig from "@/data/homeConfig.json";

// It's better to keep styles for specific components within those components or in a global stylesheet if truly global
// import markdownStyles from "@/styles/markdown-styles.module.css";

// Helper to process introduction string (can be expanded if needed)
async function processIntroduction(introduction: string): Promise<string> {
  if (!introduction) {
    return "";
  }
  return await markdownToHtml(introduction);
}

async function AboutPage() {
  const { about } = homeConfig;
  const {
    header,
    // slogan, // slogan is not directly used by HomePageContent props
    introduction,
    lifestyles,
    techStacks: rawTechStacksConfig, // Renamed to avoid confusion
    githubUsername,
    introductionHeaderText,
    globe,
    lifestyleHeaderText,
    techStackHeaderText, // This is the header text for the tech stacks section
  } = about;

  const allPosts = []; // No longer fetching posts as LatestArticles is commented out

  const pageTitle = header || "Home";

  // Process introduction markdown to HTML
  const introductionHtml = await processIntroduction(introduction || "");

  // Pass raw data, icon mapping will be handled client-side in HomePageContent
  const techStacksProp = {
    programmingLanguages: rawTechStacksConfig.programmingLanguages,
    frameworks: rawTechStacksConfig.frameworks,
    techStackHeaderText: techStackHeaderText,
  };

  return (
    <HomePageContent
      header={pageTitle}
      introductionHtml={introductionHtml} // Pass processed HTML
      introductionHeaderText={introductionHeaderText || ""}
      posts={allPosts}
      techStacks={techStacksProp} // This should now match RawTechStacks (with transformed icons)
      // techStackHeaderText is now part of the techStacksProp, so this separate prop might be redundant
      // depending on how HomePageContent uses it. For now, let's keep it if HomePageContent expects it.
      // If HomePageContent is updated to use techStacks.techStackHeaderText, this can be removed.
      techStackHeaderText={techStackHeaderText}
      githubUsername={githubUsername}
      globe={
        globe as { markerLocation: [number, number]; locationString: string }
      }
      lifestyleHeaderText={lifestyleHeaderText || ""}
      lifestyles={lifestyles} // Pass raw lifestyles
    />
  );
}
export default AboutPage;
