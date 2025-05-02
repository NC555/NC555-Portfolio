"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/page-header";
import CodeHeader from "@/components/home/code-header";
import LifeStyles from "@/components/home/life-styles";
import CodingStats from "@/components/home/coding-stats";
import AnimatedSection from "@/components/animated-section";
import markdownToHtml from "@/lib/markdownToHtml";
import { cn } from "@/lib/utils";
import markdownStyles from "@/styles/markdown-styles.module.css";
import { LatestArticles } from "@/components/home/latest-articles";
import { LuGithub, LuPencil } from "react-icons/lu";
import { TbPhotoSquareRounded, TbBrandOpenai } from "react-icons/tb";
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
  TbBrandLaravel,
} from "react-icons/tb";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import {
  SiLatex,
  SiFastapi,
  SiKubernetes,
  SiPostman,
  SiNginx,
  SiJira,
  SiPhp,
  SiLumen,
  SiConfluence,
  SiSlack,
  SiN8N,
  SiGitlab,
  SiJavascript,
} from "react-icons/si";
import { FaReact, FaAws, FaNode, FaCpanel } from "react-icons/fa";
import { BiLogoFlask } from "react-icons/bi";
import {
  DiRedis,
  DiLinux,
  DiUbuntu,
  DiMongodb,
  DiAngularSimple,
} from "react-icons/di";
import { VscTerminalLinux, VscAzure, VscVscode } from "react-icons/vsc";
import { MdOutlineSecurity, MdCloud } from "react-icons/md";
import { HomePageContentProps } from "@/types/about";
import { GrTurbolinux } from "react-icons/gr";

const iconMap: { [key: string]: any } = {
  LuPencil,
  TbPhotoSquareRounded,
  AiOutlinePython,
  TbBrandGolang,
  TbBrandCpp,
  RiJavaLine,
  RiJavascriptLine,
  SiLatex,
  TbBrandAstro,
  TbBrandTerraform,
  SiFastapi,
  BiLogoFlask,
  VscTerminalLinux,
  TbBrandDjango,
  SiKubernetes,
  VscAzure,
  FaAws,
  SiNginx,
  DiLinux,
  DiUbuntu,
  TbBrandDocker,
  FaCpanel,
  TbBrandTypescript,
  TbBrandNextjs,
  DiAngularSimple,
  FaReact,
  SiJavascript,
  SiPhp,
  TbBrandLaravel,
  SiLumen,
  FaNode,
  DiMongodb,
  TbBrandMysql,
  DiRedis,
  SiN8N,
  VscVscode,
  SiPostman,
  SiJira,
  SiConfluence,
  SiSlack,
  TbMarkdown,
  LuGithub,
  SiGitlab,
  MdOutlineSecurity,
  MdCloud,
  TbBrandOpenai,
  GrTurbolinux,
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
        newData[key] = iconMap[data[key]];
      } else {
        newData[key] = mapIcons(data[key]);
      }
    }
    return newData;
  }

  return data;
};

const HomePageContent: React.FC<HomePageContentProps> = ({
  header,
  introduction,
  introductionHeaderText,
  lifestyles,
  techStacks,
  githubUsername,
  globe,
  lifestyleHeaderText,
  techStackHeaderText,
  posts = [],
}) => {
  // Transform data to use imported icon components
  const transformedLifestyles = mapIcons(lifestyles);
  const transformedTechStacks = mapIcons(techStacks);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const renderContent = async () => {
      if (introduction) {
        // Split content into parts: HTML (if starts with <...>) and the rest as text/markdown
        const trimmedIntro = introduction.trim();
        let htmlPart = "";
        let textPart = trimmedIntro;

        // Check if content starts with HTML-like structure
        if (trimmedIntro.startsWith("<")) {
          // Find the last closing tag to split HTML and text
          const lastClosingTagIndex = trimmedIntro.lastIndexOf(">");
          if (lastClosingTagIndex !== -1) {
            htmlPart = trimmedIntro.substring(0, lastClosingTagIndex + 1);
            textPart = trimmedIntro.substring(lastClosingTagIndex + 1).trim();
          }
        }

        // Process text part as markdown or wrap in paragraph if plain text
        let processedTextPart = "";
        if (textPart) {
          // If text part contains markdown syntax, process it as markdown
          if (textPart.match(/[#*`-]/)) {
            processedTextPart = await markdownToHtml(textPart);
          } else {
            // Otherwise, wrap plain text in paragraph tags
            processedTextPart = `<p>${textPart.replace(
              /\n\n/g,
              "</p><p>"
            )}</p>`;
          }
        }

        // Combine HTML and processed text parts
        setContent(
          htmlPart + (processedTextPart ? " " + processedTextPart : "")
        );
      } else {
        setContent("");
      }
    };
    renderContent();
  }, [introduction]);

  return (
    <article>
      <AnimatedSection id="about">
        <PageHeader header={header} />
      </AnimatedSection>
      <AnimatedSection>
        <CodeHeader id="introduction" text={introductionHeaderText || ""} />
        <div
          className={cn(markdownStyles["markdown"])}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </AnimatedSection>
      {false && <LatestArticles posts={posts} />}
      {transformedTechStacks && (
        <CodingStats
          techStackHeaderText={techStackHeaderText}
          techStacks={transformedTechStacks}
          githubUsername={githubUsername}
          globe={globe}
        />
      )}
      {transformedLifestyles && (
        <LifeStyles
          lifestyles={transformedLifestyles}
          headerText={lifestyleHeaderText || ""}
        />
      )}
    </article>
  );
};

export default HomePageContent;
