'use client';

import React from 'react';
import PageHeader from '@/components/page-header';
import DownloadCv from '@/components/resume/download-cv';
import TimeLine from '@/components/resume/timeline'; // Import TimeLine component
import type {
  Resume,
  Education,
  AwardLeaderships,
  TeachingExperience,
  ProfessionalExperience,
  Volunteering,
} from '@/types/resume';
import type { VCardIconType } from '@/types/config';

// Type for resume sections that have items
type ResumeSectionWithItems = ProfessionalExperience | Education | AwardLeaderships | TeachingExperience | Volunteering;

interface ResumePagePreviewProps {
  resumeData: Resume | null;
}

// Type guard to check if a section is a ResumeSectionWithItems (has an items property)
function isResumeSectionWithItems(section: any): section is ResumeSectionWithItems {
  return section && typeof section === 'object' && 'items' in section && Array.isArray(section.items);
}


const ResumePagePreview: React.FC<ResumePagePreviewProps> = ({ resumeData }) => {
  if (!resumeData) {
    return <div className="text-center text-gray-500">Loading preview data...</div>;
  }

  // Define the order of sections (excluding string properties like title and metaTitle)
  const sectionsOrder: (keyof Resume)[] = [
    'professionalExperiences',
    'educations',
    'awardLeaderships',
    'teachingExperiences',
    'volunteering', // Include optional section key
  ];

  return (
    <div className="p-4 border rounded-lg bg-gray-50 overflow-auto relative">
      <article className="space-y-6 mt-4">
        
        {/* Use AnimatedSection or just divs */}
        <div>
          {/* PageHeader component */}
          {resumeData.header && <PageHeader header={resumeData.header} />}
        </div>
        {/* Add Download CV button */}
        {resumeData.downloadSloganCV && <DownloadCv downloadSloganCV={resumeData.downloadSloganCV} />}
        <div className="space-y-8"> {/* Add spacing between main sections */}
          {sectionsOrder.map((sectionKey) => {
            const section = resumeData[sectionKey];

            // Conditional rendering: Only display section if it exists and has items
            if (isResumeSectionWithItems(section) && section.items.length > 0) {
               return <TimeLine key={sectionKey} data={section} />; // Render TimeLine component
            }
            return null; // Do not render if no items or not a section with items
          })}
           {/* Add a message if all sections are empty */}
           {sectionsOrder.every(key => {
             const section = resumeData[key];
             return !isResumeSectionWithItems(section) || section.items.length === 0;
           }) && (
             <div className="text-center text-gray-500">
               No resume data available to display. Add items to the sections in the editor.
             </div>
           )}
        </div>
      </article>
    </div>
  );
};

export default ResumePagePreview;