import type { Metadata } from "next";
import React from "react";
import ResumePagePreview from "@/components/admin/resume-page-preview"; // Import the preview component
import { type Resume } from "@/types/resume";
// Removed specific icon imports and iconMap as mapping will happen client-side

// Define interfaces for resume data (matching resumeConfig.json structure - icons as strings)
interface ResumeSectionConfigRaw {
  icon: string; // Icon name string from config
  title: string;
  items: any[]; // Simplified for mapping purposes
}

interface ResumeConfigRaw {
  metaTitle?: string;
  header?: string;
  downloadSloganCV?: string;
  educations?: ResumeSectionConfigRaw;
  awardLeaderships?: ResumeSectionConfigRaw;
  teachingExperiences?: ResumeSectionConfigRaw;
  professionalExperiences?: ResumeSectionConfigRaw;
  volunteering?: ResumeSectionConfigRaw;
}

// getResumeData will now return the raw data with string icons
async function getResumeData(): Promise<ResumeConfigRaw> {
  const headersList = await import("next/headers").then((module) =>
    module.headers()
  );
  const host = headersList.get("host") || "localhost:3000";
  const baseUrl = `http://${host}`;
  const response = await fetch(`${baseUrl}/api/resumeConfig`, {
    next: { tags: ["resume"] },
  });

  if (!response.ok) {
    console.error(
      "Failed to fetch resume data:",
      response.status,
      response.statusText
    );
    console.log("Using default resume data due to fetch error.");
    // Return default data if fetch fails
    return {
      metaTitle: "Resume | Default",
      header: "Default Resume",
      downloadSloganCV: "Download CV",
      educations: { icon: "LuGraduationCap", title: "Education", items: [] },
      awardLeaderships: {
        icon: "LuAward",
        title: "Awards & Leadership",
        items: [],
      },
      teachingExperiences: {
        icon: "LuBookOpen",
        title: "Teaching Experience",
        items: [],
      },
      professionalExperiences: {
        icon: "LuBriefcase",
        title: "Professional Experience",
        items: [],
      },
      volunteering: { icon: "LuHeart", title: "Volunteering", items: [] },
    };
  }

  const data: ResumeConfigRaw = await response.json();

  // Return the raw data directly, without mapping string icons to React components
  return data;
}

export async function generateMetadata(): Promise<Metadata> {
  // Fetch raw data for metadata
  const resumeData = await getResumeData();
  return {
    title: resumeData.metaTitle,
  };
}

export default async function Resume() {
  // Fetch raw data with string icons
  const resumeDataRaw = await getResumeData();
  return <ResumePagePreview resumeData={resumeDataRaw as any} />;
}
