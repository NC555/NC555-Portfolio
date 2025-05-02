import HomePageContent from "@/components/HomePageContent";
import markdownToHtml from "@/lib/markdownToHtml";
import { getAllPosts } from "@/lib/api";
import { LatestArticles } from "@/components/home/latest-articles";
import homeConfig from "@/data/homeConfig.json";

import markdownStyles from "@/styles/markdown-styles.module.css";

import { LuGithub, LuPencil } from "react-icons/lu";
import { TbPhotoSquareRounded } from "react-icons/tb";
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
} from "react-icons/tb";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiLatex, SiFastapi, SiKubernetes, SiPostman } from "react-icons/si";
import { FaReact, FaAws } from "react-icons/fa";
import { BiLogoFlask } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import { MdOutlineSecurity, MdCloud } from "react-icons/md";

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
};

// Function to map icon names to imported components (Keep at top level)
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
        newData[key] = iconMap[data[key]];
      } else {
        newData[key] = mapIcons(data[key]);
      }
    }
    return newData;
  }

  return data;
};

async function About() {
  // Move data processing inside the component
  const { about } = homeConfig;
  const {
    header,
    slogan,
    introduction,
    lifestyles, // Use directly from config
    techStacks, // Use directly from config
    githubUsername,
    introductionHeaderText,
    globe,
    lifestyleHeaderText,
    techStackHeaderText,
  } = about;

  const allPosts = getAllPosts();

  // Use the 'header' destructured from homeConfig (now inner scope)
  const pageTitle = header ? `${header}` : `Home`;

  // Construct the techStacks prop object correctly
  const techStacksProp = {
    ...techStacks, // Spread languages and frameworks from config
    techStackHeaderText: techStackHeaderText, // Add the required header text
  };

  // Pass the untransformed data from config, ensuring correct structure
  return (
    <HomePageContent
      header={pageTitle}
      introduction={introduction || ""}
      introductionHeaderText={introductionHeaderText || ""}
      posts={allPosts}
      techStacks={techStacksProp}
      techStackHeaderText={techStackHeaderText}
      githubUsername={githubUsername}
      globe={
        globe as { markerLocation: [number, number]; locationString: string }
      }
      lifestyleHeaderText={lifestyleHeaderText || ""}
      lifestyles={lifestyles}
    />
  );
}
export default About;
