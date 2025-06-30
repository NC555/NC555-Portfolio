"use client";

import React, { memo, lazy, Suspense } from "react";
const PageHeader = lazy(() => import("@/components/page-header"));
const CodeHeader = lazy(() => import("@/components/home/code-header"));
const LifeStyles = lazy(() => import("@/components/home/life-styles"));
const CodingStats = lazy(() => import("@/components/home/coding-stats"));
const AnimatedSection = lazy(() => import("@/components/animated-section"));
// import markdownToHtml from "@/lib/markdownToHtml"; // No longer needed here
import { cn } from "@/lib/utils";
import markdownStyles from "@/styles/markdown-styles.module.css";
import { LatestArticles } from "@/components/home/latest-articles"; // Keep for {false && <LatestArticles ...>}
import { HomePageContentProps } from "@/types/about";

// iconMap and mapIcons function are removed as data comes pre-transformed.

const HomePageContent: React.FC<HomePageContentProps> = memo(
  ({
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
              dangerouslySetInnerHTML={{ __html: introductionHtml }} // Use introductionHtml directly
            />
          </AnimatedSection>
        </Suspense>
        {false && <LatestArticles posts={posts} />} {/* Keep this line as is */}
        {techStacks && (
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        )}
        {lifestyles && (
          <Suspense fallback={<div>Loading...</div>}>
            <LifeStyles
              lifestyles={lifestyles} // Pass the pre-transformed lifestyles
              headerText={lifestyleHeaderText || ""}
            />
          </Suspense>
        )}
      </article>
    );
  }
);

export default HomePageContent;
