import type { Metadata } from "next";
import React from "react";
import TimeLine from "@/components/resume/timeline";
import PageHeader from "@/components/page-header";
import DownloadCV from "@/components/resume/download-cv";
import { IoSchoolOutline } from "react-icons/io5";
import { PiTrophy, PiBooks } from "react-icons/pi";
import { MdOutlineDevices } from "react-icons/md";
import { type IconType as ReactIconType } from 'react-icons'; // Import type for icons


import type { Education, AwardLeaderships, TeachingExperience, ProfessionalExperience, Volunteering } from "@/types/resume";
import type { Resume } from "@/types/resume"; // Import the main Resume type

// Define interfaces matching the data structure from the API
// Removed local ResumeItem and ResumeSection as types are now imported from types/resume.d.ts

// Type for resume sections that have items
type ResumeSectionWithItems = ProfessionalExperience | Education | AwardLeaderships | TeachingExperience | Volunteering;

// Use imported types for ResumeConfig
interface ResumeConfig extends Resume {
  // Add any other page-specific config if necessary, but extend the base Resume type
}

// Type guard to check if a section is a ResumeSectionWithItems (has an items property)
function isResumeSectionWithItems(section: any): section is ResumeSectionWithItems {
  return section && typeof section === 'object' && 'items' in section && Array.isArray(section.items);
}

// Map icon name strings to actual React icon components
// Ensure iconMap is still needed and compatible with VCardIconType if icon strings are used
const iconMap: { [key: string]: ReactIconType } = {
  IoSchoolOutline: IoSchoolOutline,
  PiTrophy: PiTrophy,
  PiBooks: PiBooks,
  MdOutlineDevices: MdOutlineDevices,
  // Add other icons as needed
};


async function getResumeData(): Promise<ResumeConfig> {

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/resumeConfig`, {
    next: { tags: ['resume'] },
  });

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch resume data');
  }

  const data: ResumeConfig = await response.json();

  const processedData: ResumeConfig = {
    ...data, // Include all original data properties
    educations: data.educations ? { ...data.educations, icon: typeof data.educations.icon === 'string' ? iconMap[data.educations.icon] : data.educations.icon } : undefined, // Ensure section exists before spreading
    awardLeaderships: data.awardLeaderships ? { ...data.awardLeaderships, icon: typeof data.awardLeaderships.icon === 'string' ? iconMap[data.awardLeaderships.icon] : data.awardLeaderships.icon } : undefined, // Ensure section exists before spreading
    teachingExperiences: data.teachingExperiences ? { ...data.teachingExperiences, icon: typeof data.teachingExperiences.icon === 'string' ? iconMap[data.teachingExperiences.icon] : data.teachingExperiences.icon } : undefined, // Ensure section exists before spreading
    professionalExperiences: data.professionalExperiences ? { ...data.professionalExperiences, icon: typeof data.professionalExperiences.icon === 'string' ? iconMap[data.professionalExperiences.icon] : data.professionalExperiences.icon } : undefined, // Ensure section exists before spreading
    // Handle optional volunteering section
    ...(data.volunteering && { volunteering: { ...data.volunteering, icon: typeof data.volunteering.icon === 'string' ? iconMap[data.volunteering.icon] : data.volunteering.icon } }),
  };


  return processedData;
}


export async function generateMetadata(): Promise<Metadata> {
  const resumeData = await getResumeData();
  return {
    title: resumeData.metaTitle,
  };
}


export default async function Resume() {

  const resumeData = await getResumeData();

  const sectionsOrder: (keyof ResumeConfig)[] = [
    'professionalExperiences',
    'educations',
    'awardLeaderships',
    'teachingExperiences',
    'volunteering', 
  ];

  
  return (
    <article>
    
      {/* PageHeader uses the header from resumeConfig.json */}
      <PageHeader header={resumeData.header} />
      <DownloadCV downloadSloganCV={resumeData.downloadSloganCV} /> {/* Pass the downloadSloganCV prop */}

      {sectionsOrder.map((sectionKey) => {
        const section = resumeData[sectionKey];

        if (isResumeSectionWithItems(section) && section.items.length > 0) {
           return <TimeLine key={sectionKey} data={section} />; // Type assertion no longer needed
        }
        return null; // Do not render if no items or not a section with items
      })}

       {/* Optional: Add a message if all sections are empty, although unlikely for a resume page */}
       {/* The condition here should check the keys that ARE being rendered by TimeLine */}
       {sectionsOrder.every(key => {
          const sec = resumeData[key];
          return !isResumeSectionWithItems(sec) || sec.items.length === 0;
       }) && (
         <div className="text-center text-gray-500 mt-8">
           No resume data available for the main sections.
         </div>
       )}

     </article>
  );
}

