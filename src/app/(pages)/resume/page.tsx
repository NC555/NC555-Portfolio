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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/resumeConfig`,
    {
      next: { tags: ["resume"] },
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch resume data");
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
