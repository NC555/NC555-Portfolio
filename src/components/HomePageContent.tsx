"use client";

import React from "react"; // Removed useEffect, useState
import PageHeader from "@/components/page-header";
import CodeHeader from "@/components/home/code-header";
import LifeStyles from "@/components/home/life-styles";
import CodingStats from "@/components/home/coding-stats";
import AnimatedSection from "@/components/animated-section";
// import markdownToHtml from "@/lib/markdownToHtml"; // No longer needed here
import { cn } from "@/lib/utils";
import markdownStyles from "@/styles/markdown-styles.module.css";
import { LatestArticles } from "@/components/home/latest-articles"; // Keep for {false && <LatestArticles ...>}
// Icons are no longer mapped here, so direct imports are not strictly necessary unless used elsewhere in this file.
// For simplicity, keeping them, but they could be removed if not used by other logic in this file.
/*
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
import { GrTurbolinux } from "react-icons/gr";
*/
import { HomePageContentProps } from "@/types/about";

// iconMap and mapIcons function are removed as data comes pre-transformed.

const HomePageContent: React.FC<HomePageContentProps> = ({
  header,
  introductionHtml, // Changed from introduction
  introductionHeaderText,
  lifestyles, // Now expects pre-transformed data (icons are components)
  techStacks, // Now expects pre-transformed data (icons are components)
  githubUsername,
  globe,
  lifestyleHeaderText,
  techStackHeaderText, // This prop might be deprecated in favor of techStacks.techStackHeaderText
  posts = [],
}) => {
  // No more useEffect or useState for content processing
  // No more client-side mapIcons transformation

  return (
    <article>
      <AnimatedSection id="about">
        <PageHeader header={header} />
      </AnimatedSection>
      <AnimatedSection>
        <CodeHeader id="introduction" text={introductionHeaderText || ""} />
        <div
          className={cn(markdownStyles["markdown"])}
          dangerouslySetInnerHTML={{ __html: introductionHtml }} // Use introductionHtml directly
        />
      </AnimatedSection>
      {false && <LatestArticles posts={posts} />} {/* Keep this line as is */}
      {techStacks && (
        <CodingStats
          // techStackHeaderText is now part of the techStacks object.
          // CodingStats component will need to be updated if it's not already using techStacks.techStackHeaderText
          // For now, we pass techStacks.techStackHeaderText if available, or the separate prop as fallback.
          techStackHeaderText={
            techStacks.techStackHeaderText || techStackHeaderText
          }
          techStacks={techStacks} // Pass the pre-transformed techStacks
          githubUsername={githubUsername}
          globe={globe}
        />
      )}
      {lifestyles && (
        <LifeStyles
          lifestyles={lifestyles} // Pass the pre-transformed lifestyles
          headerText={lifestyleHeaderText || ""}
        />
      )}
    </article>
  );
};

export default HomePageContent;
