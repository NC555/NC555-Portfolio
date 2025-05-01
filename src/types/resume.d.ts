import type { VCardIconType } from "@/types/config";

export type Resume = {
  header?: string;
  title?: string;
  metaTitle?: string;
  downloadSloganCV?: string;
  educations?: Education;
  awardLeaderships?: AwardLeaderships;
  teachingExperiences?: TeachingExperience;
  professionalExperiences?: ProfessionalExperience;
  volunteering?: Volunteering;
};

export type Volunteering = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type ResumeProps = {
  name: string;
  title: string;
  items: {
    icon: VCardIconType;
    title: string;
    text: string;
  }[];
};

export type Education = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type AwardLeaderships = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type TeachingExperience = {
  icon: VCardIconType;
  title: string;
  items: {
    company: string;
    location: string;
    role: string;
    duration: string;
    tasksMarkdown: string;
  }[];
};

export type ProfessionalExperience = {
  icon: VCardIconType;
  title: string;
  items: resumeItem[];
};

export type resumeItem = {
  company: string;
  location: string;
  role: string;
  duration: string;
  tasksMarkdown: string;
};
