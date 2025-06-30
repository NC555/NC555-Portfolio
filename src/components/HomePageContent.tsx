"use client";

import React, { memo, lazy, Suspense, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import markdownStyles from "@/styles/markdown-styles.module.css";
import { LatestArticles } from "@/components/home/latest-articles";
import {
  HomePageContentProps,
  TransformedLifeStyle,
  TransformedTechStacks,
  RawLifeStyle,
  RawTechStack,
} from "@/types/about";

// Lazy loaded components
const PageHeader = lazy(() => import("@/components/page-header"));
const CodeHeader = lazy(() => import("@/components/home/code-header"));
const LifeStyles = lazy(() => import("@/components/home/life-styles"));
const CodingStats = lazy(() => import("@/components/home/coding-stats"));
const AnimatedSection = lazy(() => import("@/components/animated-section"));

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

    return (
      <article>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatedSection id="about">
            <PageHeader header={header} />
          </AnimatedSection>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AnimatedSection>
            <CodeHeader id="introduction" text={introductionHeaderText || ""} />
            <div
              className={cn(markdownStyles["markdown"])}
              dangerouslySetInnerHTML={{ __html: introductionHtml }}
            />
          </AnimatedSection>
        </Suspense>
        {false && <LatestArticles posts={posts} />}
        {transformedTechStacks.programmingLanguages.length > 0 && (
          <Suspense fallback={<div>Loading...</div>}>
            <CodingStats
              techStackHeaderText={transformedTechStacks.techStackHeaderText}
              techStacks={transformedTechStacks}
              githubUsername={githubUsername}
              globe={globe}
            />
          </Suspense>
        )}
        {transformedLifestyles.length > 0 && (
          <Suspense fallback={<div>Loading...</div>}>
            <LifeStyles
              lifestyles={transformedLifestyles}
              headerText={lifestyleHeaderText || ""}
            />
          </Suspense>
        )}
      </article>
    );
  }
);

export default HomePageContent;
