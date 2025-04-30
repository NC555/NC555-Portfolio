import type { About } from "@/types/about";
import type { Resume } from "@/types/resume";
import type { NavigationLink } from "@/types/nav-bar";
import { OpenGraph } from "./open-graph";
import type { GiscusProps } from "@giscus/react";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import type { PrivateDetails } from "@/types/json-ld";
import type { Metadata } from "next";

export type VCardIconType = ReactIconType | OcticonsType;

export type ContactType =
  | "Location"
  | "Email"
  | "GitHub"
  | "LinkedIn"
  | "Medium"
  | "Twitter"
  | "RSS Feed"
  | "CV";

export type Contact = {
  icon: string;
  title: string;
  content?: string;
  link?: string;
  contactType: ContactType;
};

export type SocialLink = {
  url: string;
  icon: string;
  name: string;
};

export type SidebarFooterItem = {
  itemType: string;
  url: string;
  title: string;
};

export type Config = {
  siteTitle?: string;
  siteDescription?: string;
  siteKeywords?: string[object];
  baseURL?: string;
  postsPerPage?: number;
  twitterAccount?: string;
  githubAccount?: string;
  avatar?: string;
  title?: string;
  description?: string;
  author?: string;
  keywords?: string[];
  status?: string;
  siteURL?: string;
  openGraph?: OpenGraph;
  navigationLinks?: any[];
  contacts?: Contact[];
  socialLinks?: SocialLink[];
  homeMetaData?: Metadata;
  jsonLdPerson?: PrivateDetails;
  giscusConfig?: GiscusProps;
  googleAnalyticId?: string;
  googleTagManagerId?: string;
};
