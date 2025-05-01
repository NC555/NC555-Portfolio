import type { Metadata } from "next";
import React from "react";
import TimeLine from "@/components/resume/timeline";
import PageHeader from "@/components/page-header";
import DownloadCV from "@/components/resume/download-cv";
import { IoSchoolOutline } from "react-icons/io5";
import { PiTrophy, PiBooks } from "react-icons/pi";
import { MdOutlineDevices } from "react-icons/md";
import { type IconType as ReactIconType } from 'react-icons'; 

import type { Education, AwardLeaderships, TeachingExperience, ProfessionalExperience, Volunteering } from "@/types/resume";
import type { Resume } from "@/types/resume"; 

type ResumeSectionWithItems = ProfessionalExperience | Education | AwardLeaderships | TeachingExperience | Volunteering;

interface ResumeConfig extends Resume {
  // Add any other page-specific config if necessary, but extend the base Resume type
}

function isResumeSectionWithItems(section: any): section is ResumeSectionWithItems {
  return section && typeof section === 'object' && 'items' in section && Array.isArray(section.items);
}

const iconMap: { [key: string]: ReactIconType } = {
  IoSchoolOutline: IoSchoolOutline,
  PiTrophy: PiTrophy,
  PiBooks: PiBooks,
  MdOutlineDevices: MdOutlineDevices
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

  // Check if cv.pdf exists in the public directory
  let cvExists = false;
  try {
    const fs = require('fs');
    const path = require('path');
    cvExists = fs.existsSync(path.join(process.cwd(), 'public', 'cv.pdf'));
  } catch (error) {
    console.error('Error checking for CV file:', error);
  }

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
      {cvExists && <DownloadCV downloadSloganCV={resumeData.downloadSloganCV} />} {/* Only render if CV exists */}

      {sectionsOrder.map((sectionKey) => {
        const section = resumeData[sectionKey];

        if (isResumeSectionWithItems(section) && section.items.length > 0) {
           return <TimeLine key={sectionKey} data={section} />; // Type assertion no longer needed
        }
        return null; // Do not render if no items or not a section with items
      })}

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

