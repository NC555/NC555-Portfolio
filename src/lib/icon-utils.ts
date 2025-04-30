import {
  LuMapPin,
  LuMail,
  LuGithub,
  LuLinkedin,
  LuRss,
  LuCircle,
  LuInfo,
  LuSave,
  LuPencil,
} from "react-icons/lu";
import { PiMediumLogoBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachment } from "react-icons/md";
import type { IconType } from "react-icons";
import type { VCardIconType } from "@/types/config";

// Added imports for Tech Stacks and Lifestyles icons from homeConfig.json
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
import { FaReact, FaAws, FaCss3Alt } from "react-icons/fa";
import { BiLogoFlask } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
// Assuming GoalIcon is a custom component or another library icon not in the listed ones.
// Based on previous analysis, assuming it's not from react-icons/go or @primer/octicons-react based on previous JSON contents and available imports.
// If GoalIcon is a custom component, it needs to be imported here.
// For now, keeping it commented out, which means it will fall back to LuCircle.
// If it's confirmed to be from a specific library, its import should be added here.

// Map specific icon names to their components
const iconMap: Record<string, IconType> = {
  LuMapPin,
  LuMail,
  LuGithub,
  LuLinkedin,
  LuRss,
  LuInfo,
  LuSave,
  PiMediumLogoBold,
  FaXTwitter,
  MdAttachment,
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
};

export function getIconComponent(iconName: string): VCardIconType {
  const IconComponent = iconMap[iconName];
  console.log(`Attempting to get icon component for: ${iconName}`); // Added log
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found in iconMap`);
    return LuCircle; // Fallback icon
  }
  return IconComponent as VCardIconType;
}
