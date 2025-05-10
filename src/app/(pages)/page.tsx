import React from "react"; // Import React for React.createElement
import HomePageContent from "@/components/HomePageContent";
import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts } from "@/config/api";
// import { LatestArticles } from "@/components/home/latest-articles"; // No longer needed here
import homeConfig from "@/data/homeConfig.json";

// It's better to keep styles for specific components within those components or in a global stylesheet if truly global
// import markdownStyles from "@/styles/markdown-styles.module.css";

import { LuGithub, LuPencil } from "react-icons/lu";
import { TbPhotoSquareRounded, TbBrandOpenai } from "react-icons/tb"; // Added TbBrandOpenai
import { AiOutlinePython } from "react-icons/ai";
import {
  TbBrandTypescript,
  TbBrandGolang,
  TbBrandCpp,
  TbMarkdown,
  TbBrandAstro,
  TbBrandTerraform,
  TbBrandNextjs,
  TbBrandDocker,
  TbBrandMysql,
  TbBrandDjango,
  TbBrandLaravel, // Added TbBrandLaravel
} from "react-icons/tb";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import {
  SiLatex,
  SiFastapi,
  SiKubernetes,
  SiPostman,
  SiNginx, // Added SiNginx
  SiJira, // Added SiJira
  SiPhp, // Added SiPhp
  SiLumen, // Added SiLumen
  SiConfluence, // Added SiConfluence
  SiSlack, // Added SiSlack
  SiN8N, // Added SiN8N
  SiGitlab, // Added SiGitlab
  SiJavascript, // Added SiJavascript
} from "react-icons/si";
import { FaReact, FaAws, FaNode, FaCpanel } from "react-icons/fa"; // Added FaNode, FaCpanel
import { BiLogoFlask } from "react-icons/bi";
import {
  DiRedis,
  DiLinux, // Added DiLinux
  DiUbuntu, // Added DiUbuntu
  DiMongodb, // Added DiMongodb
  DiAngularSimple, // Added DiAngularSimple
} from "react-icons/di";
import { VscTerminalLinux, VscAzure, VscVscode } from "react-icons/vsc"; // Added VscVscode
import { MdOutlineSecurity, MdCloud } from "react-icons/md";
import { GrTurbolinux } from "react-icons/gr"; // Added GrTurbolinux

// Centralized icon map, ensure all icons used in homeConfig.json are here
const iconMap: { [key: string]: any } = {
  LuGithub,
  LuPencil,
  TbPhotoSquareRounded,
  AiOutlinePython,
  TbBrandTypescript,
  TbBrandGolang,
  TbBrandCpp,
  RiJavaLine,
  RiJavascriptLine,
  SiLatex,
  TbMarkdown,
  TbBrandAstro,
  TbBrandTerraform,
  FaReact,
  SiFastapi,
  BiLogoFlask,
  DiRedis,
  VscTerminalLinux,
  FaAws,
  TbBrandNextjs,
  TbBrandDocker,
  TbBrandMysql,
  TbBrandDjango,
  SiKubernetes,
  SiPostman,
  VscAzure,
  MdOutlineSecurity,
  MdCloud,
  TbBrandOpenai,
  GrTurbolinux,
  SiNginx,
  DiLinux,
  DiUbuntu,
  FaCpanel,
  DiAngularSimple,
  SiJavascript,
  SiPhp,
  TbBrandLaravel,
  SiLumen,
  FaNode,
  DiMongodb,
  SiN8N,
  VscVscode,
  SiJira,
  SiConfluence,
  SiSlack,
  SiGitlab,
};

// Function to map icon names to imported components
const mapIcons = (data: any) => {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map((item) => mapIcons(item));
  }

  if (typeof data === "object" && data !== null) {
    const newData: any = {};
    for (const key in data) {
      if (
        key === "icon" &&
        typeof data[key] === "string" &&
        iconMap[data[key]]
      ) {
        // Create a React element from the icon component
        newData[key] = React.createElement(iconMap[data[key]]);
      } else {
        newData[key] = mapIcons(data[key]);
      }
    }
    return newData;
  }

  return data;
};

// Helper to process introduction string (can be expanded if needed)
async function processIntroduction(introduction: string): Promise<string> {
  if (!introduction) return "";
  // Current logic in HomePageContent.tsx for splitting HTML and Markdown is complex.
  // For simplicity, assuming `introduction` is primarily markdown or simple text.
  // If it contains intentional HTML mixed with markdown, this needs careful handling.
  // The original logic: if (trimmedIntro.startsWith("<"))
  // For now, we will treat the whole string as markdown.
  // If it needs to be more complex, this function should replicate that logic.
  const trimmedIntro = introduction.trim();
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
      // Process if markdown or not already <p>
      processedTextPart = await markdownToHtml(textPart);
    } else {
      processedTextPart = textPart; // Assume it's already HTML if it starts with <p>
    }
  }
  return (
    htmlPart +
    (processedTextPart ? (htmlPart ? " " : "") + processedTextPart : "")
  );
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

  const allPosts = getAllPosts(); // For <LatestArticles />, currently disabled in HomePageContent

  const pageTitle = header || "Home";

  // Process introduction markdown to HTML
  const introductionHtml = await processIntroduction(introduction || "");

  // Transform lifestyles and techStacks with icons
  const transformedLifestyles = mapIcons(lifestyles);
  // mapIcons is applied to the object containing programmingLanguages and frameworks arrays
  const transformedTechStacksArrays = mapIcons(rawTechStacksConfig);

  // Construct the techStacks prop object correctly according to RawTechStacks type
  const techStacksProp = {
    // Ensure transformedTechStacksArrays has the expected structure after mapIcons
    programmingLanguages: (transformedTechStacksArrays as any)
      .programmingLanguages,
    frameworks: (transformedTechStacksArrays as any).frameworks,
    techStackHeaderText: techStackHeaderText, // Add the header text from homeConfig.about
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
      lifestyles={transformedLifestyles} // Pass transformed lifestyles
    />
  );
}
export default AboutPage;
