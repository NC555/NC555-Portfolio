"use client";

import React, { memo, lazy, Suspense, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import markdownStyles from "@/styles/markdown-styles.module.css";
import { LatestArticles } from "@/components/home/latest-articles";
import {
  HomePageContentProps,
  TransformedLifeStyle,
  TransformedTechStacks,
} from "@/types/about";

// Import the new generic loading spinner
import GenericLoadingSpinner from "@/components/generic-loading-spinner";

// All icon imports for client-side mapping
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

// Centralized icon map for client-side mapping
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
  SiConfluence,
  SiSlack,
  SiGitlab,
  SiN8N,
  VscVscode,
  SiJira,
  FaNode,
  DiMongodb,
};

// Function to map icon names to imported components
const mapIcons = (data: any): any => {
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
        newData[key] = React.createElement(iconMap[data[key]]);
      } else {
        newData[key] = mapIcons(data[key]);
      }
    }
    return newData;
  }

  return data;
};

const HomePageContent: React.FC<HomePageContentProps> = memo(
  ({
    header,
    introductionHtml,
    introductionHeaderText,
    lifestyles: rawLifestyles,
    techStacks: rawTechStacks,
    githubUsername,
    globe,
    lifestyleHeaderText,
    techStackHeaderText,
    posts = [],
  }) => {
    const [transformedLifestyles, setTransformedLifestyles] = useState<
      TransformedLifeStyle[]
    >([]);
    const [transformedTechStacks, setTransformedTechStacks] =
      useState<TransformedTechStacks>({
        techStackHeaderText: "",
        programmingLanguages: [],
        frameworks: [],
      });

    useEffect(() => {
      setTransformedLifestyles(mapIcons(rawLifestyles));
      const mappedTechStacks = mapIcons(rawTechStacks);
      setTransformedTechStacks({
        programmingLanguages: mappedTechStacks.programmingLanguages,
        frameworks: mappedTechStacks.frameworks,
        techStackHeaderText: rawTechStacks.techStackHeaderText,
      });
    }, [rawLifestyles, rawTechStacks]);

    // Lazy loaded components for the main content sections
    const LazyPageHeader = lazy(() => import("@/components/page-header"));
    const LazyCodeHeader = lazy(() => import("@/components/home/code-header"));
    const LazyLifeStyles = lazy(() => import("@/components/home/life-styles"));
    const LazyCodingStats = lazy(
      () => import("@/components/home/coding-stats")
    );
    const LazyAnimatedSection = lazy(
      () => import("@/components/animated-section")
    );

    return (
      <article>
        <Suspense fallback={<GenericLoadingSpinner />}>
          <LazyAnimatedSection id="about">
            <LazyPageHeader header={header} />
          </LazyAnimatedSection>
          <LazyAnimatedSection>
            <LazyCodeHeader
              id="introduction"
              text={introductionHeaderText || ""}
            />
            <div
              className={cn(markdownStyles["markdown"])}
              dangerouslySetInnerHTML={{ __html: introductionHtml }}
            />
          </LazyAnimatedSection>
          {false && <LatestArticles posts={posts} />}
          {transformedTechStacks.programmingLanguages.length > 0 && (
            <LazyCodingStats
              techStackHeaderText={transformedTechStacks.techStackHeaderText}
              techStacks={transformedTechStacks}
              githubUsername={githubUsername}
              globe={globe}
            />
          )}
          {transformedLifestyles.length > 0 && (
            <LazyLifeStyles
              lifestyles={transformedLifestyles}
              headerText={lifestyleHeaderText || ""}
            />
          )}
        </Suspense>
      </article>
    );
  }
);

export default HomePageContent;
